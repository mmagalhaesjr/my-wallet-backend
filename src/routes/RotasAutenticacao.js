import { cadastro, login, logout } from '../controller/Autenticacao.js';
import { Router } from 'express';

const rotasAutenticacao = Router()

rotasAutenticacao.post("/cadastro", cadastro)
rotasAutenticacao.post("/login", login)
rotasAutenticacao.delete("/logout", logout)

export default rotasAutenticacao