const oracledb = require('oracledb'); // constante para llamar la dependencia de oracle

//Constante para la string connection
const config = {
    user: 'restaurant',
    password: 'restaurant',
    connectString: 'localhost:1521/XE'
};

//
oracledb.getConnection(config, (err, connection) => {
    if (err) {
        console.error(err.message);
        return;
    }

    // Aquí puedes ejecutar tus consultas o procedimientos almacenados utilizando la conexión

    connection.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });
});

const connection = oracledb.getConnection(config);

module.exports = connection;