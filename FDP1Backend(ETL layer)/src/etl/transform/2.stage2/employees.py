import duckdb
connection  = duckdb.connect(':memory:')


outputEmployeesFilePath = 'data/transformed/3.finalStage/Employees_Count.parquet'


connection.execute("""
    CREATE TABLE Employees_Info AS 
                   SELECT * FROM read_parquet('data/transformed/1.stage1/Employee_Info.parquet')
""")

connection.execute(""" 
    CREATE TABLE Employees_Count AS
SELECT 
    COUNT(DISTINCT ei."Employee ID") AS Employee_Count
FROM 
    Employees_Info ei 
    """)

query = f"SELECT * FROM Employees_Count"

connection.execute(f"COPY ({query}) TO  '{outputEmployeesFilePath}' (FORMAT PARQUET)")

print('emplooyees per department loaded to stage 2 successfull ✨!!!')