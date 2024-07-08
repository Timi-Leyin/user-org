import { body } from "express-validator";

export const registrationSchema = [
  body("email").trim().isEmail(),
  body("firstName").trim().isLength({ min: 1 }),
  body("lastName").trim().isLength({ min: 1 }),
  body("password").trim().isLength({min:1}),
  body("phone").trim().optional(),
];

export const loginSchema = [
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 1 }),
];
