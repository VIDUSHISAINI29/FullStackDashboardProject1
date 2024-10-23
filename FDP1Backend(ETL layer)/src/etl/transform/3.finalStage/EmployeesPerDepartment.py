import duckdb
connection = duckdb.connect(':memory:')

outputParquetLocationMarksAnalysisTable = 'data/transformed/3.finalStage/Employees_Per_Department.parquet'

connection.execute("""CREATE TABLE Employees_Per_Department AS SELECT * FROM  read_parquet('data/transformed/2.stage2/Departments_AND_Employees.parquet')""")

query = f"""SELECT * FROM Employees_Per_Department"""

connection.execute(f"COPY ({query}) TO '{outputParquetLocationMarksAnalysisTable}' (FORMAT PARQUET)")

print('Students Marks Analysis reached final stage 🥰')