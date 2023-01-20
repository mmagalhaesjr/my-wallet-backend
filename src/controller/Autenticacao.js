import bcrypt from 'bcrypt';
import db from '../config/DataBase.js';
import { usuarioSchema } from '../model/usuarioSchema.js';
export async function cadastro(req, res){
    const { name, email, password } = req.body

    const senhaCriptografada = bcrypt.hashSync(password, 10);

    const validacao = usuarioSchema.validate({ name, email, password })
    if (validacao.error) {
        console.log(validacao.error.details)
        return res.sendStatus(422)
    }   

    try {
        const cadastroDuplicado = await db.collection("usuarios").findOne({ email })
        if (cadastroDuplicado) return res.status(409).send('Usuário já cadastrado!')
        
        await db.collection("usuarios").insertOne({ name, email, password: senhaCriptografada })
        res.status(201).send("Usuário cadastrado com sucesso!")

    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function login(req,res){
    const { email, password } = req.body

    // const usuarioSchema = Joi.object({
    //         email: Joi.string().email({ tlds: { allow: false } }),
    //         password: Joi.string().min(3).required(),
    //     })

    // const validacao = usuarioSchema.validate(email,password)
    // if (validacao.error) {
    //     return res.sendStatus(422)
    // }

    try {
        const validacao = await db.collection("usuarios").findOne({ email })

        if (!validacao) return res.status(400).send("Email ou senha invalidos")

        if (password != validacao.password) return res.status(400).send("Email ou senha invalidos")

        return res.status(200).send(`Online`)

    } catch (error) {
        res.status(500).send(error.message)
    }
}