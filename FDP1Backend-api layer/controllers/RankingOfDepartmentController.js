import pkg from "duckdb";
const { Database } = pkg;
const db = new Database(":memory:");

// Function to fetch ranked departments
export async function getRankedDepartments(req, res) {
    try {
        const rows = await new Promise((resolve, reject) => {
            const connection = db.connect();

            connection.run(
                `CREATE TABLE IF NOT EXISTS Marks_Analysis_Table AS 
                 SELECT * FROM read_parquet('ParquetFiles/Marks_Analysis_Table.parquet')`,
                (err) => {
                    if (err) {
                        console.log("Error in reading parquet:", err);
                        return reject(err);
                    }

                    connection.all("SELECT * FROM Marks_Analysis_Table Where Year_Of_Result = '2017'", (err, rows) => {
                        if (err) {
                            console.log("Error in querying parquet file", err);
                            return reject(err);
                        }
                        resolve(rows);
                    });
                }
            );
        });

        res.json(rows); // Send the fetched rows as JSON response
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch departments" });
    }
}

