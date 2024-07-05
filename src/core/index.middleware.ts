import { Request, Response } from "express";

export const defaultMiddleware = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "API Service is Live",
  });
};

export const errorMiddleware = (req: Request, res: Response) => {
  return res.status(404).json({
    message: "Opps, Looks like you hit a wrong endpoint.",
  });
};
