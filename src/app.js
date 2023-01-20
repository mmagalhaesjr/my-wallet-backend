import express from 'express';
import cors from 'cors';
import rotasAutenticacao from './routes/RotasAutenticacao.js';
import rotasTransacoes from './routes/RotasTransacoes.js';

const PORTA = 5000;
const server = express();
server.use(express.json());
server.use(cors());

server.use([rotasAutenticacao, rotasTransacoes])

server.listen(PORTA, () => {
    console.log(`*** RODANDO NA PORTA ${PORTA} ***`);
});