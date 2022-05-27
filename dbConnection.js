
const sql = require('mssql/msnodesqlv8')

function getConnection() {
        try {
            return new sql.ConnectionPool({
                database: 'Tarea',
                server: 'LENOVO\\SQLEXPRESS',
                driver: 'msnodesqlv8',
                options: {
                    trustedConnection: true
                }
            })

        } catch (error) {
            console.log("Error get connectinString")
        }
    }


module.exports.getConnection = getConnection;