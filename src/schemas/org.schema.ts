import { body } from "express-validator";

export const newOrgSchema = [
  body("name").trim().isLength({ min: 3 }),
  body("description").trim().isLength({ min: 3 }).optional(),
];

export const addUserOrgSchema = [
  body("userId").trim().isLength({ min: 6 }),
];
