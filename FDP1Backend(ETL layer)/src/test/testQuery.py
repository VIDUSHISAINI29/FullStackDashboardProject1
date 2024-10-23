import duckdb
connection = duckdb.connect(':memory:')

outputParquetLocation = 'data/transformed/2.stage2/Students_Data.parquet'

connection.execute("""
    CREATE TABLE Students_Performance_Wide_Version_Info AS 
    SELECT * FROM read_parquet('data/transformed/1.stage1/Students_Performance_Wide_Version_Info.parquet')
        """)
connection.execute("""
    CREATE TABLE Students_Councelling_Info AS 
    SELECT * FROM read_parquet('data/transformed/1.stage1/Students_Councelling_Info.parquet')
        """)
connection.execute("""
    CREATE TABLE Departments_Info AS 
    SELECT * FROM read_parquet('data/transformed/1.stage1/Departments_Info.parquet')
        """)

connection.execute(""" 
        CREATE TABLE Students_Data as
select sd.*, di.Department_Name from  (select spwvi.* , sci.Department_Choices as Department_ID, sci.DOA from  Students_Performance_Wide_Version_Info spwvi 
left join Students_Councelling_Info sci 
on sci.Student_ID = spwvi.Student_ID ) sd
left join Departments_Info di 
on sd.Department_ID  = di.Department_ID 
            """)

query = f"select * From Students_Data"

connection.execute(f"COPY ({query}) TO '{outputParquetLocation}' (FORMAT PARQUET)")

print("Tables stage 2 exported to Parquet successfully!")
