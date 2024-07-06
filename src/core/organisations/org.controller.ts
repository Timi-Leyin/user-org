import { Request, Response } from "express";
import { db } from "../../config/database";
import { body } from "express-validator";

export const getAllOrg = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { userId } = req.user;
    const allOrgs = await db.organisation.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "All Organisations Retrived Successfully",
      data: {
        organisations: allOrgs,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};

export const getOrgById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const { userId } = req.user;
    const org = await db.organisation.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Organisation Info Retrived Successfully",
      data: org,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};

export const newOrg = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    // @ts-ignore
    const { userId } = req.user;
    const org = await db.organisation.create({
      data: {
        name,
        description,
        users: {
          connect: {
            userId,
          },
        },
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Organisation created successfully",
      data: org,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};

export const addUserToOrg = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { orgId } = req.params;

    const org = await db.organisation.update({
      where: {
        orgId,
      },
      data: {
        users: {
          connect: {
            userId,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Client error",
      statusCode: 400,
    });
  }
};
