import { faker } from "@faker-js/faker";
import bcryptjs from "bcryptjs";
import { db } from "../config/database";
// FOR TEST PURPOSES ON;Y

export const PASSWORD = "Tester@admin.1";
export const CreateRandomUser = async () => {
  return await db.user.create({
    data: {
      email: faker.internet.email(),
      firstName: faker.internet.displayName(),
      lastName: faker.internet.displayName(),
      password: await bcryptjs.hash(PASSWORD, 10),
    },
  });
};

export const getRandomUserInfo = () => {
  return {
    email: faker.internet.email(),
    firstName: faker.internet.displayName(),
    lastName: faker.internet.displayName(),
    password: PASSWORD,
  };
};
