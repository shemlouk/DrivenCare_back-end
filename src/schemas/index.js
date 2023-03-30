import Joi from "joi";

const onlyLettersRegex = (min, max) =>
  new RegExp(`^[a-zA-Z\u00C0-\u00FF ]{${min},${max}}$`);

const timeFormatRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

export const userSignUp = Joi.object({
  name: Joi.string().pattern(onlyLettersRegex(2, 50)),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(16),
})
  .options({ presence: "required" })
  .required();

export const doctorSignUp = Joi.object({
  name: Joi.string().pattern(onlyLettersRegex(2, 50)),
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
  city: Joi.string().pattern(onlyLettersRegex(3, 30)),
  state: Joi.string().pattern(/^[A-Z]{2}$/),
  street: Joi.string().min(5),
  zip_code: Joi.string().pattern(/^[0-9]{8}$/),
  neighborhood: Joi.string().min(3),
  address_number: Joi.string().max(6).alphanum(),
})
  .options({ presence: "required" })
  .required();

export const doctorSchedule = Joi.object({
  date: Joi.date(),
  startTime: Joi.string().pattern(timeFormatRegex),
  endTime: Joi.string().pattern(timeFormatRegex).invalid(Joi.ref("startTime")),
})
  .options({ presence: "required" })
  .required();
