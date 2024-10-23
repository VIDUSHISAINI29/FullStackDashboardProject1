import pkg from "duckdb";
const { Database } = pkg;
const db = new Database(":memory:");

export async function getEmployeesCount(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection = db.connect();
            
            // Create table from parquet
            connection.run(
                "CREATE TABLE IF NOT EXISTS Employees_Count AS SELECT * FROM read_parquet('ParquetFiles/Employees_Count.parquet')",
                (err) => {
                    if (err) {
                        console.error('Error in reading Employees_Count parquet', err);
                        return reject(err);
                    }

                    // Query the table
                    connection.all("SELECT * FROM Employees_Count", (err, rows) => {
                        if (err) {
                            console.error('Error in querying Employees_Count', err);
                            return reject(err);
                        }
                        
                        // Convert BigInt to String
                        const formattedSingleValues = rows.map(row => {
                            if (!row) return ''; // Return an empty string or a default value if row is null or undefined
                            const value = Object.values(row)[0];
                            return typeof value === 'bigint' ? value.toString() : value[0];
                        });
                        
                        resolve(formattedSingleValues);
                    });
                }
            );
        });
        
        // Send the formatted rows (with BigInt values converted to strings)
        res.json(rows);
    } catch (error) {
        console.error('Error in querying Employees_Count', error);
        res.status(500).json({ error: "Failed to fetch Employees_Count" });
    }
}
