import pkg from "duckdb";
const { Database } = pkg;
const db = new Database(":memory:");

export async function getTotalStudents(req, res) {
    const {year} = req.body;
    let connection; // Declare connection at the top of the function
    try {
        connection = db.connect(); // Connect to the database
        // Create a promise to handle the database operations
        const rows = await new Promise((resolve, reject) => {
            connection.run(`
                CREATE TABLE IF NOT EXISTS Total_Students AS 
                SELECT * FROM read_parquet('ParquetFiles/Marks_Analysis_Table.parquet')
            `, (err) => {
                if (err) {
                    console.log('Error in reading parquet File of Students:', err);
                    return reject(err);
                }
                
                // Query to get the count of students
                connection.all("SELECT CAST(COUNT(Student_ID) AS INTEGER) AS total FROM Total_Students WHERE Year_Of_Result = ?", [year], (err, rows) => {
                    if (err) {
                        console.error("Error executing query:", err);
                        return reject(err);
                    }
                    
                    // Convert BigInt to Number if necessary
                    const totalCount = rows[0].total instanceof BigInt ? Number(rows[0].total) : rows[0].total;
                    resolve(totalCount);
                });
            });
        });
        
        // Respond with the result
        res.status(200).json( rows ); // Send as an object
    } catch (error) {
        console.error("Error fetching total students:", error);
        res.status(500).json({ error: "Failed to fetch total students" });
    } finally {
        if (connection) {
            connection.close(); // Close the connection to free resources
        }
    }
}
