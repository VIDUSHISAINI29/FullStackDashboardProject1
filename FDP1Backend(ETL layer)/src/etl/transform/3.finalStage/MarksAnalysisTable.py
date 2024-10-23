import duckdb
connection = duckdb.connect(':memory:')

outputParquetLocationMarksAnalysisTable = 'data/transformed/3.finalStage/Marks_Analysis_Table.parquet'

connection.execute("""CREATE TABLE Students_Marks_Analysis AS SELECT * FROM  read_parquet('data/transformed/2.stage2/Students_Marks_Analysis.parquet')""")

query = f"""SELECT * FROM Students_Marks_Analysis"""

connection.execute(f"COPY ({query}) TO '{outputParquetLocationMarksAnalysisTable}' (FORMAT PARQUET)")

print('Students Marks Analysis reached final stage 🤩🎉')