import duckdb
connection  = duckdb.connect(':memory:')


outputEmployeesPerDepartmentFilePath = 'data/transformed/2.stage2/Departments_AND_Employees.parquet'


connection.execute("""
    CREATE TABLE Departments_Info AS 
                   SELECT * FROM read_parquet('data/transformed/1.stage1/Departments_Info.parquet')
""")

connection.execute("""
    CREATE TABLE Employees_Info AS 
                   SELECT * FROM read_parquet('data/transformed/1.stage1/Employee_Info.parquet')
""")

connection.execute(""" 
    CREATE TABLE Employees_Per_Department_Count AS
SELECT 
    di.Department_ID, 
    di.Department_Name, 
    COUNT(ei."Employee ID") AS Employee_Count
FROM 
    Departments_Info di
LEFT JOIN 
    Employees_Info ei 
ON 
    di.Department_ID = ei.Department_ID
GROUP BY 
    di.Department_ID, 
    di.Department_Name
    """)

query = f"SELECT * FROM Employees_Per_Department_Count"

connection.execute(f"COPY ({query}) TO  '{outputEmployeesPerDepartmentFilePath}' (FORMAT PARQUET)")

print('emplooyees per department loaded to stage 2 successfull !!! 💖')