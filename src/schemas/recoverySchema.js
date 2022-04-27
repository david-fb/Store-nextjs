import Joi from "joi";

const email = Joi.string().email({ tlds: { allow: false } });
const recoveryUri = Joi.string().uri();
const newPassword = Joi.string().min(8);
const token = Joi.string();

const recoveryPasswordSchema = Joi.object({
    email: email.required(),
    recoveryUri: recoveryUri.required(),
});

const changePasswordSchema = Joi.object({
    newPassword: newPassword.required(),
    token: token.required()
});

module.exports = { recoveryPasswordSchema, changePasswordSchema };