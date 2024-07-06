import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const responseError = errors.array().map((err) => {
    return {
      //   @ts-ignore
      field: err.path,
      message: err.msg,
    };
  });
  return res.status(422).json({ errors: responseError });
};
