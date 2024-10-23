import pkg from "duckdb"
const { Database } = pkg;
const db = new Database(":memory:");

export async function getEmployeesPerDepartment(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection = db.connect();
            
            // Create table from parquet
            connection.run(
                "CREATE TABLE IF NOT EXISTS Employees_Per_Department AS SELECT * FROM read_parquet('ParquetFiles/Employees_Per_Department.parquet')",
                (err) => {
                    if (err) {
                        console.error('Error in reading Employees_Per_Department parquet', err);
                        return reject(err);
                    }

                    // Query the table
                    connection.all("SELECT * FROM Employees_Per_Department", (err, rows) => {
                        if (err) {
                            console.error('Error in querying Employees_Per_Department', err);
                            return reject(err);
                        }
                        
                        // Convert BigInt to String
                        const formattedRows = rows.map(row => {
                            return Object.fromEntries(
                                Object.entries(row).map(([key, value]) => 
                                    typeof value === 'bigint' ? [key, value.toString()] : [key, value]
                                )
                            );
                        });

                        resolve(formattedRows);
                    });
                }
            );
        });
        
        res.json(rows);
    } catch (error) {
        console.error('Error in querying employees per department', error);
        res.status(500).json({ error: "Failed to fetch employees per department" });
    }
}
