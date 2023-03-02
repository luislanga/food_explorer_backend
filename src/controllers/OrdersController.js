const connection = require('../database/knex')

const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

class OrdersController {
    async create(req, res) {
        const {user_id} = req.params
        const {orderDishes} = req.body
        
        await connection('orders').insert({user_id})
        
        const getOrdersByUser = await connection('orders').where({user_id})
        const currentOrder = getOrdersByUser[getOrdersByUser.length - 1]
        
        let orderValue = 0
        for (let i = 0; i < orderDishes.dishes.length; i++) {
            await connection('order_items').insert({order_id: currentOrder.id, dish_id: orderDishes.dishes[i], quantity: orderDishes.quantities[i]})
            let price = await connection('dishes').where({id: orderDishes.dishes[i]})
            orderValue = orderValue + (price[0].price * orderDishes.quantities[i])
        }
        
        const orders = await connection('order_items').where({dish_id: currentOrder})
        
        await connection('orders').update({order_status:'Pendente', item_quantity: orderDishes.dishes.length, order_value: orderValue}).where({id: currentOrder.id})
        
        return res.status(201).json()
    }
    
    async update(req, res) {
        const {user_id} = req.params
        const {order_id, status} = req.body
        const date = knex.fn.now();
        const currentUser = await connection('users').where({id: user_id}).first()
        
        if(currentUser.is_admin === 1) {
            await connection('orders').update({order_status: status, updated_at: date}).where({id: order_id})
            return res.status(200).json()
        }else{
            res.json("denied")
        }
    }

    async index(req, res) {
        const {user_id} = req.params    
        const currentUser = await connection('users').where({id: user_id}).first()

        if(currentUser.is_admin === 1){
            const orderList = await connection('orders').orderBy('created_at', 'desc')
            return res.json(orderList)
        }else {
            const customerOrders = await connection('orders').where({user_id}).orderBy('created_at', 'desc')
            console.log(customerOrders)
            return res.json(customerOrders)
        }    
    }
}

module.exports = OrdersController
