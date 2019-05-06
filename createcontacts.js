let knex = require('knex')({
   // client: 'sqlite3',
    // connection: { filename: 'storage.sqlite' },
    // useNullAsDefault:true
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'express_contact'
      },
      pool: { min: 0, max: 7 }

  })



knex.schema.createTable('contacts', (table) => {
    table.increments('id')
    table.string('firstname')
    table.string('lastname')
    table.string('email')
    table.string('number')
}).then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });