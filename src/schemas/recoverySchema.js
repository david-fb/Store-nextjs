import Joi from "joi";

const email = Joi.string().email({ tlds: { allow: false } });

const recoveryPasswordSchema = Joi.object({
    email: email.required(),
});

module.exports = { recoveryPasswordSchema };