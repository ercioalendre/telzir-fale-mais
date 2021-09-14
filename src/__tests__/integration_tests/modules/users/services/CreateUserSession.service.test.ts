import "reflect-metadata";
import supertest from "supertest";
import app from "@shared/http/app";
import connection from "@tests/Test.connection";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

afterEach(async () => {
  await connection.clear();
});

describe("Create user session service tests", () => {
  it("should create an user session", async () => {
    const newUser = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const createNewUser = await supertest(app).post("/signup").send(newUser).expect(201);

    if (createNewUser.statusCode === 201) {
      const userLoginData = {
        phone: newUser.phone,
        password: newUser.password,
      };

      await supertest(app).post("/login").send(userLoginData).expect(302);
    }
  });

  it("should not create an user session: wrong credentials", async () => {
    const userLoginData = {
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    await supertest(app).post("/login").send(userLoginData).expect(401);
  });

  it("should not create an user session: empty credentials", async () => {
    const userLoginData = {
      phone: "",
      password: "",
    };

    await supertest(app).post("/login").send(userLoginData).expect(401);
  });

  it("should not create an user session: empty password input", async () => {
    const userLoginData = {
      phone: "(11) 11111-1111",
      password: "",
    };

    await supertest(app).post("/login").send(userLoginData).expect(401);
  });

  it("should not create an user session: empty phone input", async () => {
    const userLoginData = {
      phone: "",
      password: "teste123",
    };

    await supertest(app).post("/login").send(userLoginData).expect(401);
  });
});
