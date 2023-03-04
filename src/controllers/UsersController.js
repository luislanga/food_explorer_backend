const connection = require('../database/knex')
const { hash } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UsersController {
    async create(req, res) {
            const {name, email, password, is_admin} = req.body
            const hashedPassword = await hash(password, 8)

            const checkUniqueEmail = await connection('users').where({email}).first()
            if(checkUniqueEmail){
                throw new AppError('Este e-mail já está em uso')
            }
            if(!name || !email || !password){
                throw new AppError('Preencha todos os campos')
            }               
            await connection('users').insert({name, email, password: hashedPassword, is_admin})
            return res.status(201).json() 
    }

    async index(req, res){
        const userList = await connection('users').orderBy('created_at', 'desc')
        return res.json(userList)
    }
}

module.exports = UsersController