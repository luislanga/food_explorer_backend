exports.up = knex => knex.schema.createTable('orders', table =>{

    table.increments('id')
    table.integer('user_id').references('id').inTable('users')
    table.text('order_status')
    table.integer('item_quantity')
    table.float('order_value')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

}) 


exports.down = knex => knex.schema.dropTable('orders') 