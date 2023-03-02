const connection = require('../database/knex')

class FavoritesController {
    async create(req, res) {
        const {user_id} = req.params
        const {dish_id} = req.body
        
        await connection('favorites').insert({dish_id, user_id})
        return res.status(201).json() 
    }

    async index(req, res){
        const {user_id} = req.params

        const results = await connection('favorites').where({user_id})
        
        return res.json(results)
    }

    async delete(req, res){
        const {user_id} = req.params
        const {dish_id} = req.body

        await connection('favorites').where({user_id, dish_id}).delete()
        return res.status(201).json()
    }
}

module.exports = FavoritesController