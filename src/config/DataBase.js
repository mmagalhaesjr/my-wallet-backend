import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

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

export default db