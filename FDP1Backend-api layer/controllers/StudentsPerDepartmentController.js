import pkg from "duckdb";
const { Database } = pkg;
const db = new Database(":memory:");

export async function getStudentsPerDepartment(req, res) {
    // const yearOfResult = req.body.year
    let connection; // Declare connection at the top of the function
    try {
        connection = db.connect(); // Connect to the database
        const rows = await new Promise((resolve, reject) => {
            // Create table from parquet
            connection.run(
                "CREATE TABLE IF NOT EXISTS Students_Per_Department AS SELECT * FROM read_parquet('ParquetFiles/Marks_Analysis_Table.parquet')",
                (err) => {
                    if (err) {
                        console.error('Error in reading Students_Per_Department parquet', err);
                        return reject(err);
                    }

                    // Query the table
                    connection.all(
                        `SELECT sma.Department_ID, sma.Department_Name, COUNT(sma.Student_ID) AS Students_Count , sma.Year_Of_Result
                        FROM Students_Per_Department sma 
                        where Year_Of_Result = '2021'
                        GROUP BY sma.Department_ID, sma.Department_Name, sma.Year_Of_Result`, 
                        (err, rows) => {
                            if (err) {
                                console.error('Error in querying Students_Per_Department', err);
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
                        }
                    );
                }
            );
        });
        
        res.json(rows); // Respond with the formatted rows
    } catch (error) {
        console.error('Error in querying Students_Per_Department', error);
        res.status(500).json({ error: "Failed to fetch Students_Per_Department" });
    } finally {
        if (connection) {
            connection.close(); // Close the connection to free resources
        }
    }
}
