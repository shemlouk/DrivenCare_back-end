import Joi from "joi";

export const userSignUp = Joi.object({
  name: Joi.string().pattern(new RegExp(`^[a-zA-Z\u00C0-\u00FF ]{2,50}$`)),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(16),
})
  .options({ presence: "required" })
  .required();

export const doctorSignUp = Joi.object({
  name: Joi.string().pattern(new RegExp(`^[a-zA-Z\u00C0-\u00FF ]{2,50}$`)),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(16),
  specialtyId: Joi.number().positive().integer(),
})
  .options({ presence: "required" })
  .required();

export const signIn = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8).max(16),
})
  .options({ presence: "required" })
  .required();

export const doctorOffice = Joi.object({
  city: Joi.string().pattern(new RegExp(`^[a-zA-Z\u00c0-\u00FF ]{3,30}$`)),
  state: Joi.string().pattern(new RegExp(`^[A-Z]{2}$`)),
  street: Joi.string().min(5),
  zip_code: Joi.string().pattern(new RegExp(`^[0-9]{8}$`)),
  neighborhood: Joi.string().min(3),
  address_number: Joi.string().max(6).alphanum(),
})
  .options({ presence: "required" })
  .required();
