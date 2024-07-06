import { body } from "express-validator";

export const registrationSchema = [
    body("email").normalizeEmail().trim().isEmail(),
    body("firstName").trim().isLength({min:3}),
    body("lastName").trim().isLength({min:3}),
    body("password").isStrongPassword().trim(),
    body("phone").trim().isMobilePhone("en-NG").optional(),
]