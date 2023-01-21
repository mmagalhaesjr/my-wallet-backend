import Joi from 'joi';

export const transacaoSchema = Joi.object({
    valor: Joi.number().required(),
    descricao: Joi.string().required(),
    tipo: Joi.string().valid("entrada","saida").required(),
    
})

