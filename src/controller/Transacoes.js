import db from "../config/DataBase.js"
import { transacaoSchema } from "../model/TransacaoSchema.js"


export async function salvarTransacao(req, res) {
    const { valor, descricao, tipo } = req.body
    const { authorization } = req.headers
    const token = authorization.replace("Bearer ", "")

    const validacao = transacaoSchema.validate({ valor, descricao, tipo })

    if (validacao.error) {
        console.log(validacao.error.details)
        return res.sendStatus(422)
    }

    try {
        const usuario = await db.collection('sessoes').findOne({ token })

        if (!usuario) return res.sendStatus(400)

        await db.collection('transacoes').insertOne({ valor, descricao, tipo, idUsuario: usuario.id })
        res.status(201).send('Transação salva com sucesso!')

    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function listarTransacoes(req, res) {
    const { authorization } = req.headers
    const token = authorization.replace('Bearer ', '')

    try {

        const usuario = await db.collection('sessoes').findOne({ token })

        if (!usuario) return res.sendStatus(400)
        const minhasTransacoes = await db.collection('transacoes').find({ idUsuario: usuario.id }).toArray()
        res.send(minhasTransacoes)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

