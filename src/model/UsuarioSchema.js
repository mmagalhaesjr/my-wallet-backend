import Joi from 'joi';

export const usuarioSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(3).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(3).required(),
})
