import dotenv from "dotenv";
dotenv.config();
import { generateToken, verifyToken } from "../helpers/token";
import { user } from "@prisma/client";
import { CreateRandomUser } from "../helpers/random-data";
import { db } from "../config/database";

let randomUser: user;

beforeAll(async () => {
  randomUser = await CreateRandomUser();
});

afterAll(async () => {
  if (randomUser) {
    await db.user.delete({
      where: {
        userId: randomUser.userId,
      },
    });
  }
});

describe("Token Generation", () => {
  it("should generate a token that expires correctly", async () => {
    const payload = { id: randomUser.userId };
    const expiresIn = "2s";
    const delay = 2000;
    const token = generateToken(payload, {
      expiresIn,
    });

    const result = await new Promise((resolve) => {
      setTimeout(() => {
        const decodedToken = verifyToken(token);
        resolve(decodedToken);
      }, delay);
    });

    expect(result).toBeNull();
  });

  it("should encode and decode user details correctly in the token", async () => {
    const token = generateToken({
      id: randomUser.userId,
    });

    const decodedToken = await verifyToken(token);
    expect(decodedToken).not.toBeNull();
    expect(decodedToken?.userId).toBe(randomUser.userId);
    expect(decodedToken?.email).toBe(randomUser.email);
  });
});
