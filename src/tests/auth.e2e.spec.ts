import { getRandomUserInfo } from "../helpers/random-data";
import request from "supertest";
import app from "../app";
import { db } from "../config/database";
import { user as User } from "@prisma/client";

// E2E TESTS
let user:Partial<User> ;
const user2 = getRandomUserInfo();
describe("User Registration", () => {
  user = getRandomUserInfo();
  const res = request(app).post("/auth/register").send(user);
  it("It Should Register User Successfully with Default Organisation", async () => {
    const response = await res;

    expect(response.status).toEqual(201);
    expect(await response.body).toHaveProperty("status", "success");
  });

  it("Verify the default organisation name is correctly generated ", async () => {
    const orgName = `${user.firstName}'s Organisation`;
    const org = await db.organisation.findFirst({
      where: {
        name: orgName,
      },
    });
    expect(org).not.toBeUndefined();
  });

  it("It Should Check that the response contains the expected user details and access token.", async () => {
    const response = await res;
    expect(response.body.data.accessToken).not.toBeUndefined();
    expect(response.body.data.user).toHaveProperty("firstName", user.firstName);
    expect(response.body.data.user).toHaveProperty("lastName", user.lastName);
    expect(response.body.data.user).toHaveProperty("email", user.email);
  });

  it("It Should Fail If firstName Field is Missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: user2.email,
        lastName: user2.lastName,
        // firstname
        password: user2.password,
      })
      .expect(422);
    expect(res.body.errors[0].message).toBe("Invalid value");
  });

  it("It Should Fail If lastName Field is Missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: user2.email,
        firstName: user2.firstName,
        // lastName
        password: user2.password,
      })
      .expect(422);
    expect(res.body.errors[0].message).toBe("Invalid value");
  });

  it("It Should Fail If email Field is Missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        // emaik
        firstName: user2.firstName,
        lastName: user2.lastName,
        password: user2.password,
      })
      .expect(422);
    expect(res.body.errors[0].message).toBe("Invalid value");
  });

  it("It Should Fail If password Field is Missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: user2.email,
        firstName: user2.firstName,
        lastName: user2.lastName,
        // password: user2.password,
      })
      .expect(422);
    expect(res.body.errors[0].message).toBe("Invalid value");
  });
  it("It Should Fail If Email Already Exist", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      })
      .expect(400);
  });
});

describe("User Login", () => {
  it("It Should Log the user in successfully", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200);
  });

  it("It Should Not Log the user in with incorect password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: "incorrect password",
      })
      .expect(401);
  });

  it("It Should Contain the correct user details and access token", async () => {
    const res = await request(app).post("/auth/login").send({
      email: user.email,
      password: user.password,
    });
    expect(res.body.data.accessToken).not.toBeUndefined();
    expect(res.body.data.user).toHaveProperty("firstName", user.firstName);
    expect(res.body.data.user).toHaveProperty("lastName", user.lastName);
    expect(res.body.data.user).toHaveProperty("email", user.email);
  });
});
