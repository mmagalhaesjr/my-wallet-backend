import { cadastro, login } from '../controller/Autenticacao.js';
import { Router } from 'express';

const rotasAutenticacao = Router()

rotasAutenticacao.post("/cadastro", cadastro)
rotasAutenticacao.post("/login", login)

export default rotasAutenticacao