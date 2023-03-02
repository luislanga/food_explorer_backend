const { Router } = require('express')
const DishesController = require('../controllers/DishesController')

const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.get('/',dishesController.index)
dishesRoutes.patch('/:user_id/:id',dishesController.update)
dishesRoutes.post('/:user_id',dishesController.create)
dishesRoutes.get('/:id',dishesController.show)
dishesRoutes.delete('/:user_id/:id',dishesController.delete)


module.exports = dishesRoutes