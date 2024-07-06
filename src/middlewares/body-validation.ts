import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  return res.status(422).json(errors);
};
