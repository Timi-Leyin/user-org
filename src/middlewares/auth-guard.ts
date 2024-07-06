import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../constants/env";
import { db } from "../config/database";
import { verifyToken } from "../helpers/token";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = (req.headers.authorization ?? "").split(" ");
    const [bearer, accessToken] = authHeader ?? [];
    if (accessToken) {
      const decoded = await verifyToken(accessToken);
      if (decoded) {
        // @ts-ignore
        req.user = decoded;
        return next();
      }

      return res.status(401).json({
        status: "Bad request",
        message: "Authentication failed",
        statusCode: 401,
      });
    }
    return res.status(401).json({
      status: "Bad request",
      message: "Authentication failed",
      statusCode: 401,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
