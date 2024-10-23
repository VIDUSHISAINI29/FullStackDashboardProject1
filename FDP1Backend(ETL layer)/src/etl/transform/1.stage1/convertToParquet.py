import duckdb
connection = duckdb.connect(':memory:');

# CSV files path
employeeCsvPath = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/raw/Employee_Information.csv"
departmentsCsvPath = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/raw/Department_Information.csv"
studentsCouncellingCsvPath = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/raw/Student_Counceling_Information.csv"
studentsPerformanceCsvPath = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/raw/Student_Performance_Data.csv"
studentsPerformanceWideVersioncsv_path = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/raw/Student_Performance_Data_Wide_Version.csv"

csvFilesArray = [
    employeeCsvPath,
    departmentsCsvPath,
    studentsCouncellingCsvPath,
    studentsPerformanceCsvPath,
    studentsPerformanceWideVersioncsv_path
]


# Parquet files path 

outputEmployeeParquetPath = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/transformed/1.stage1/Employee_Info.parquet"
outputDepartmentsParquetPath = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/transformed/1.stage1/Departments_Info.parquet"
outputStudentsCouncellingParquetPath = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/transformed/1.stage1/Students_Councelling_Info.parquet"
outputStudentsPerformanceParquetPath = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/transformed/1.stage1/Students_Performance_Info.parquet"
outputStudentsPerformanceWideVersionParquetPath = "D:/VS Code/FullStackDashboardsProject/FullStackDashboardProject1/FDP1Backend(ETL layer)/data/transformed/1.stage1/Students_Performance_Wide_Version_Info.parquet"



parquetFilesArray = [
    outputEmployeeParquetPath,
    outputDepartmentsParquetPath,
    outputStudentsCouncellingParquetPath,
    outputStudentsPerformanceParquetPath,
    outputStudentsPerformanceWideVersionParquetPath
]


tableNamesArray = [
    'Employee_Info',
    'Department_Info',
    'Students_Councelling_Info',
    'Students_Performance_Info',
    'Students_Performance_Wide_Version_Info'
]



for csvFiles, parquetFiles, tableName in zip(csvFilesArray, parquetFilesArray, tableNamesArray):

    connection.execute(f"CREATE TABLE {tableName} AS SELECT * FROM read_csv_auto('{csvFiles}')")

    query = f"""SELECT * FROM {tableName}"""

    connection.execute(f"COPY ({query}) TO '{parquetFiles}' (FORMAT PARQUET)")

print("Tables created and exported to Parquet successfully! 😊")