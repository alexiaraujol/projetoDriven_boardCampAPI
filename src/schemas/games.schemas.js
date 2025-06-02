import joi from 'joi';

export const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.string().required(),
    pricePerDay: joi.string().required()
})