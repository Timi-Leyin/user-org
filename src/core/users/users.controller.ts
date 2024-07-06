import { Request, Response } from "express";
import { db } from "../../config/database";

export const userByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await db.user.findFirst({
      where: {
        userId: id,
        organisations: {
          some: {
            users: {
              some: {
                // @ts-ignore
                userId: req.user.userId,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        message: "User with Id Not Found Within Joined Organizations",
        statusCode: 404,
      });
    }

    const userWithoutPassword: any = { ...user };
    delete userWithoutPassword.password;

    return res.status(200).json({
      status: "success",
      message: "User Info Retrieved Successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
