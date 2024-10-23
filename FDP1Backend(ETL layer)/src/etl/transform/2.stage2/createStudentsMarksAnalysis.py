import duckdb
connection = duckdb.connect(':memory:')

outputParquetLocationStudentsMarksAnalysis = 'data/transformed/2.stage2/Students_Marks_Analysis.parquet'



connection.execute("""
    CREATE TABLE Students_Data AS 
    SELECT * FROM read_parquet('data/transformed/2.stage2/Students_Data.parquet')
        """)

connection.execute("""
        CREATE TABLE Students_Marks_Analysis as
SELECT sde.Student_ID,
		sde.Department_ID,
		sde.Department_Name,
		 CAST(EXTRACT(YEAR FROM sde.DOA) AS VARCHAR) AS Year_Of_Admission,
		 CAST(EXTRACT(YEAR FROM sde.DOA) + 4 AS VARCHAR) AS Year_Of_Result,
    SUM(
        CAST(sde."Paper 1" AS HUGEINT) + 
        CAST(sde."Paper 2" AS HUGEINT) + 
        CAST(sde."Paper 3" AS HUGEINT) + 
        CAST(sde."Paper 4" AS HUGEINT) + 
        CAST(sde."Paper 5" AS HUGEINT) + 
        CAST(sde."Paper 6" AS HUGEINT) + 
        CAST(sde."Paper 7" AS HUGEINT) 
    ) AS sumOfMarks ,
     ROUND (
     (SUM(
        CAST(sde."Paper 1" AS HUGEINT) + 
        CAST(sde."Paper 2" AS HUGEINT) + 
        CAST(sde."Paper 3" AS HUGEINT) + 
        CAST(sde."Paper 4" AS HUGEINT) + 
        CAST(sde."Paper 5" AS HUGEINT) + 
        CAST(sde."Paper 6" AS HUGEINT) + 
        CAST(sde."Paper 7" AS HUGEINT) 
    ) /5600.0 ) * 100, 2) AS Percentage 
FROM Students_Data sde
	GROUP BY sde.Student_ID, sde.Department_ID, sde.Department_Name, sde.DOA
	ORDER BY sde.Student_ID           
        """)

query = f"""SELECT sr.Student_ID, sr.Department_ID, sr.Year_Of_Result, sr.Department_Name, sr.Percentage  FROM Students_Marks_Analysis sr
where sr.Percentage <= 100 
Order By sr.Percentage DESC"""

connection.execute(f"COPY ({query}) TO '{outputParquetLocationStudentsMarksAnalysis}' (FORMAT PARQUET)")

print('Marks Analysis done successfully!!!🤩')