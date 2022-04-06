const Joi = require('joi');

const name = Joi.string().min(2).max(30);
const lastName = Joi.string().min(2).max(30);
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email({ tlds: { allow: false } });
const password = Joi.string().min(5);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required().error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'string.empty':
            err.message = `"email" is not allowed to be empty`;
            break;
          case 'string.email':
            err.message = `"email" must be a valid email`;
          default:
            break;
        }
      });
      return errors;
    }),
    password: password.required().error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'string.empty':
            err.message = `"password" is not allowed to be empty`;
            break;
          case 'string.min':
            err.message = `"password" length must be at least ${err.local.limit} characters long`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  }),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});
module.exports = { createCustomerSchema, updateCustomerSchema };
