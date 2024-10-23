import duckdb
connection = duckdb.connect(':memory:')

outputParquetLocationStudentsPerDepartment = 'data/transformed/3.finalStage/Students_Per_Department.parquet'

connection.execute("""
    CREATE TABLE Students_Marks_Analysis AS 
                   SELECT * FROM read_parquet('data/transformed/2.stage2/Students_Marks_Analysis.parquet')
""")

connection.execute(
                
    """
                   CREATE TABLE Students_Per_Department AS
                SELECT 
                    sma.Department_ID, 
                    sma.Department_Name, 
                    COUNT(sma."Student_ID") AS Students_Count
                FROM 
                    Students_Marks_Analysis sma
                GROUP BY 
                    sma.Department_ID, 
                    sma.Department_Name
                   """)

query = f"""SELECT * FROM Students_Per_Department"""

connection.execute(f"COPY ({query}) TO '{outputParquetLocationStudentsPerDepartment}' (FORMAT PARQUET)")

print('Students Marks Analysis reached final stage 😁')