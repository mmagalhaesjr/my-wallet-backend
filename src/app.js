import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import Joi from 'joi';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORTA = 5000;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db

try {
    await mongoClient.connect();
    db = mongoClient.db();
    console.log('**CONECTADO**');

} catch (error) {
    console.log(error);
    console.log('Não foi possivel fazer a conexão com o banco de dados');
}

let nome




app.post("/cadastro", async (req, res) => {
    const { name, email, password } = req.body

    const senhaCriptografada = bcrypt.hashSync(password, 10);

    const cadastroSchema = Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(3).required(),
    })

    const validacao = cadastroSchema.validate({ name, email, password })
    if (validacao.error) {
        console.log(validacao.error.details)
        return res.sendStatus(422)
    }


    // VERIFICAR SE HA EXISTE UM USUARIO COM ESSE EMAIL
    

    try {
        const cadastroDuplicado = await db.collection("usuarios").findOne({ email })
        if (cadastroDuplicado) return res.status(409).send('Usuario já cadastrado! Informe um novo email')
        
        
        await db.collection("usuarios").insertOne({ name, email, password: senhaCriptografada })
        res.status(201).send("Usuário cadastrado com sucesso.")

    } catch (error) {
        res.status(500).send(error.message)
    }

})



app.post("/login", async (req, res) => {
    const { email, password } = req.body

    // const cadastroSchema = Joi.object({
    //         email: Joi.string().email({ tlds: { allow: false } }),
    //         password: Joi.string().min(3).required(),
    //     })

    // const validacao = cadastroSchema.validate(email,password)
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
})

app.get("/home", async (req, res) => {
    // tem que receber um token pelo headers e ai buscar esse usuario pelo token no banco de dados
    const todosUsuarios = await db.collection("usuarios").find().toArray()
    res.send(todosUsuarios)

})













app.listen(PORTA, () => {
    console.log(`*** RODANDO NA PORTA ${PORTA} ***`);
});