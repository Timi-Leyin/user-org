import jwt from "jsonwebtoken";
import { ENV } from "../constants/env";
import { db } from "../config/database";
import { user as User } from "@prisma/client";

export interface TokenData {
  id: string;
  exp: number | string;
  iat: number | string;
}

export interface Payload {
  id: string;
}
export const generateToken = (payload: Payload, options?: jwt.SignOptions) => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: "1d",
    ...options,
  });
};

export const verifyToken = async (
  accessToken: string
): Promise<User | null> => {
  try {
    const decoded = jwt.verify(accessToken, ENV.JWT_SECRET) as TokenData;
    const user = await db.user.findFirst({
      where: {
        userId: decoded.id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
