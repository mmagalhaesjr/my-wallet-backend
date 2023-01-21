import { listarTransacoes, salvarTransacao } from '../controller/Transacoes.js';
import { application, Router } from 'express';

const rotasTransacoes = Router()

rotasTransacoes.post('/nova-transacao',salvarTransacao)
rotasTransacoes.get("/home", listarTransacoes)


export default rotasTransacoes