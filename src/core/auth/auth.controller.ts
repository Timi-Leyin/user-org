import { Request, Response } from "express";
import { db } from "../../config/database";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";
import { ENV } from "../../constants/env";
import { user as User } from "@prisma/client";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password: $password, phone } = req.body;
    const checkUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (checkUser) {
      return res.status(400).json({
        status: "Bad request",
        message: "Registration unsuccessful",
        statusCode: 400,
      });
    }

    const password = await bcryptjs.hash($password, 10);
    const user = await db.user.create({
      data: {
        firstName,
        email,
        lastName,
        password,
        phone,
      },
    });
    const token = jwt.sign(
      {
        id: user.userId,
      },
      ENV.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const userWithoutPassword: Partial<User> = { ...user };
    delete userWithoutPassword.password;

    return res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: {
        accessToken: token,
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password: $password } = req.body;
    const checkUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkUser) {
      return res.status(401).json({
        status: "Bad request",
        message: "Authentication failed",
        statusCode: 401,
      });
    }

    const password = await bcryptjs.compare($password, checkUser.password);
    if (!password) {
      return res.status(401).json({
        status: "Bad request",
        message: "Authentication failed",
        statusCode: 401,
      });
    }

    const token = jwt.sign(
      {
        id: checkUser.userId,
      },
      ENV.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const userWithoutPassword: Partial<User> = { ...checkUser };
    delete userWithoutPassword.password;
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken: token,
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
