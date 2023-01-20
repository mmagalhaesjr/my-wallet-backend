import db from "../config/DataBase.js"

export async function transacoes(req,res){
    // tem que receber um token pelo headers e ai buscar esse usuario pelo token no banco de dados
    const todosUsuarios = await db.collection("usuarios").find().toArray()
    res.send(todosUsuarios)
}