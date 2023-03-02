exports.up = knex => knex.schema.createTable('dishes', table =>{

    table.increments('id')
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.float('price').notNullable()
    table.text('image').defaultTo(null)
    table.integer('user_id').references('id').inTable('users')
    
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())


}) 


exports.down = knex => knex.schema.dropTable('dishes') 
