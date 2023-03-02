const {Router} = require ('express')
const OrdersController = require ('../controllers/OrdersController')

const ordersController = new OrdersController()

const ordersRoutes = Router()

ordersRoutes.get("/:user_id", ordersController.index)
ordersRoutes.post("/:user_id", ordersController.create)
ordersRoutes.patch("/:user_id", ordersController.update)

module.exports = ordersRoutes