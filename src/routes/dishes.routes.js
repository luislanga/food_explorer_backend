const { Router } = require('express')
const multer = require("multer")
const uploadConfig = require("../config/upload")

const DishesController = require('../controllers/DishesController')
const DishesImageController = require('../controllers/DishesImageController')

const dishesController = new DishesController()
const dishesImageController = new DishesImageController()

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER);

dishesRoutes.get('/',dishesController.index)
dishesRoutes.patch('/:dish_id/image', upload.single("image"), dishesImageController.update)
dishesRoutes.patch('/:user_id/:id',dishesController.update)
dishesRoutes.post('/:user_id',dishesController.create)
dishesRoutes.get('/:id',dishesController.show)
dishesRoutes.delete('/:user_id/:id',dishesController.delete)


module.exports = dishesRoutes