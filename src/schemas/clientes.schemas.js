import joi from 'joi';

export const clientesSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    cpf: joi.string().required()
})