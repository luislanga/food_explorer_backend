const connection = require('../database/knex')
const DiskStorage = require("../providers/DiskStorage")

class DishesImageController {
    async update(req, res){
        const {dish_id} = req.params
        const imageFilename = req.file.filename

        const diskStorage = new DiskStorage()

        const dish = await connection("dishes").first()
            .where({id: dish_id})

        if(!dish) {
            throw new Error("Prato inexistente")
        }

        if(dish.image){
            await diskStorage.deleteFile(dish.image)
        }

        const filename = await diskStorage.saveFile(imageFilename)
        const image = filename

        await connection("dishes").update({image}).where({id: dish_id})

        return res.json()
    }

}

module.exports = DishesImageController