const connection = require('../database/knex')

const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

class DishesController {
    async create(req, res) {
        const {user_id} = req.params
        const currentUser = await connection('users').where({id: user_id}).first()

        if(currentUser.is_admin ===1 ){
            const {name, description, price, ingredients, categories} = req.body

            const data = await connection('dishes').insert({
                name, 
                description, 
                price, 
                user_id
            })

            const [dish_id] = data
            

            const categoriesInsert = categories.map(category => {
                return {
                    dish_id,
                    name: category
                }
            })
            await connection('categories').insert(categoriesInsert)

            const ingredientsInsert = ingredients.map(ingredient => {
                return {
                    dish_id,
                    name: ingredient
                }
            })
            await connection('ingredients').insert(ingredientsInsert)

            return res.json()
        }else{
            res.json("denied")
        }
    }

    async update(req, res) {
        const {id, user_id} = req.params
        const currentUser = await connection('users').where({id: user_id}).first()
        if(currentUser.is_admin === 1){ 
            const {name, description, price, ingredients, categories} = req.body
            const dish_id = id
            const date = knex.fn.now();

            await connection('dishes').where({id}).update({
                name, 
                description, 
                price, 
                user_id,
                updated_at: date
            })

            await connection('ingredients').where({dish_id}).delete()
            await connection('categories').where({dish_id}).delete()

            for (let i = 0; i < ingredients.length; i++) {
                const updatedIngredientName = ingredients[i]
                await connection('ingredients').insert({dish_id, name: updatedIngredientName})
            }

            for (let i = 0; i < categories.length; i++) {
                const updatedCategoryName = categories[i]
                await connection('categories').insert({dish_id, name: updatedCategoryName})
            }

            return res.json()
        }else {
            res.json("denied")
        }
    }
    
    async index(req, res){
        const {nameOrIngredient} = req.query
        const ingredients = await connection('ingredients')
        const categories = await connection('categories')
        const dishesSearch = await connection('dishes').whereLike('name', `%${nameOrIngredient}%`)
        const ingredientSearch = await connection('ingredients')
            .select([
                "dishes.id",
                "dishes.name",
                "dishes.description",
                "dishes.price",
                "dishes.image",
                "dishes.user_id",
                "dishes.created_at",
                "dishes.updated_at",
            ])
            .whereLike('ingredients.name', `%${nameOrIngredient}%`)
            .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        
        const search = dishesSearch.concat(ingredientSearch)
       
        let uniqueArr = []
        const uniqueSearch = search.filter(result => {
            if(uniqueArr.indexOf(result.id) === -1){
                uniqueArr.push(result.id)
                return {...result}
            }
        })  
        
        const results = uniqueSearch.map(dish => {
            const dishIngredients = ingredients.filter(ingredient => ingredient.dish_id === dish.id)
            const dishCategories = categories.filter(category => category.dish_id === dish.id)
            return {
                    ...dish,
                    dishIngredients,
                    dishCategories
                    }
                })
            return res.json(results) 
    }

    async show(req, res) {
        const {id} = req.params

        const dish = await connection('dishes').where({id}).first()
        const ingredients = await connection('ingredients').where({ dish_id: id })
        const categories = await connection('categories').where({ dish_id: id })

        return res.json({
            ...dish,
            categories,
            ingredients
        })
    }
    
    async delete(req, res) {
        const {id, user_id} = req.params

        const currentUser = await connection('users').where({id: user_id}).first()

        if(currentUser.is_admin === 1){
            await connection('dishes').where({id}).delete()
            return res.json()
        }else {
            return res.json("denied")
        }
    }
}
module.exports = DishesController 