import Joi from "joi";

export const userSignUp = Joi.object({
  name: Joi.string().pattern(new RegExp(`^[a-zA-Z\u00C0-\u00FF ]{2,50}$`)),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp(`^[\w\W]{8,16}$`)),
})
  .options({ presence: "required" })
  .required();
