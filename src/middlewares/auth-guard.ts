import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../constants/env";
import { db } from "../config/database";
export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = (req.headers.authorization ?? "").split(" ");
    const [bearer, accessToken] = authHeader ?? [];
    if (accessToken) {
      try {
        const decoded: any = jwt.verify(accessToken, ENV.JWT_SECRET);
        const user = db.user.findFirst({
          where: {
            userId: decoded.id,
          },
        });
        if (!user) {
          return res.status(401).json({
            status: "Bad request",
            message: "Authentication failed",
            statusCode: 401,
          });
        }
        // @ts-ignore
        req.user = user;
        return next();
      } catch (error) {
        return res.status(401).json({
          status: "Bad request",
          message: "Authentication failed",
          statusCode: 401,
        });
      }
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
