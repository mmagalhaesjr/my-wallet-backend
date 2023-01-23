import bcrypt from 'bcrypt';
import db from '../config/DataBase.js';
import {v4 as uuid} from 'uuid';
import { usuarioSchema, loginSchema } from '../model/usuarioSchema.js';

export async function cadastro(req, res){
    const { name, email, password, confirmPassword } = req.body

    const senhaCriptografada = bcrypt.hashSync(password, 10);

    const validacao = usuarioSchema.validate({ name, email, password, confirmPassword })
    
    if (validacao.error) {
        console.log(validacao.error.details)
        return res.status(422).send("Preencha os dados corretamente!")
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

    const validacao = loginSchema.validate({email,password})
    if (validacao.error) {
        return res.status(422).send("Preencha os dados corretamente!")
    }

    try {
        const usuario = await db.collection("usuarios").findOne({ email })
        if (!usuario) return res.status(400).send("Email ou senha inválidos")

        const senhaCorreta = bcrypt.compareSync(password, usuario.password)
        if (!senhaCorreta) return res.status(400).send("Email ou senha inválidos")



        const token = uuid()
        await db.collection("sessoes").insertOne({
            id: usuario._id, 
            token:token
        })
        
        return res.status(200).send({token})


    } catch (error) {
        res.status(500).send(error.message)
        
}
}