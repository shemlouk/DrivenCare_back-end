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
  specialty: Joi.number().positive().integer(),
})
  .options({ presence: "required" })
  .required();
