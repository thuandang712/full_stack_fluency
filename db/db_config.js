const {Pool} = require('pg')

const pool = new Pool ({
    user: 'thuandang', 
    database: 'travel', 
    host: 'localhost',
    password: '',
})


module.exports = pool