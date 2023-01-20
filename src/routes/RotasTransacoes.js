import { transacoes } from '../controller/Transacoes.js';
import { Router } from 'express';

const rotasTransacoes = Router()

rotasTransacoes.get("/home", transacoes)

// router.post("/novatransacao")

export default rotasTransacoes