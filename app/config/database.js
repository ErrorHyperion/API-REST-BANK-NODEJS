const knex = require('knex');

module.exports = knex({
    client: 'pg', //Indica que se usara postgres como motor de BD
    connection : 'postgres://postgres:root@localhost:5432/bank', //cadena de conexion
    pool: { min: 1, max: 2 }, // ????
    acquireConnectionTimeout: 5000
});