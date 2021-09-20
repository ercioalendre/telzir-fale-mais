import "reflect-metadata";
import supertest from "supertest";
import app from "@shared/http/app";
import connection from "@tests/providers/Connection.test";
import createNewUser from "@tests/providers/NewUser.test";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

describe("Create user session service tests", () => {
  it("should create an user session", async () => {
    await connection.clear();
    try {
      await createNewUser({}).then(createUser => {
        expect(createUser.statusCode).toBe(201);
        expect(createUser.text.includes("Conta criada com sucesso!")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }

    const newUser = {
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const userLoginData = {
      phone: newUser.phone,
      password: newUser.password,
    };

    try {
      const createNewUserSession = await supertest(app).post("/login").send(userLoginData);
      expect(createNewUserSession.statusCode).toBe(302);
      expect(createNewUserSession.header.location).toBe("/my-account");
    } catch (error) {
      return false;
    }
  });

  it("should not create an user session: wrong credentials", async () => {
    await connection.clear();
    const userLoginData = {
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    try {
      const createUserSession = await supertest(app).post("/login").send(userLoginData);
      expect(createUserSession.statusCode).toBe(401);
      expect(
        createUserSession.text.includes("O número de telefone ou senha está incorreto."),
      ).toBeTruthy();
    } catch (error) {
      return false;
    }
  });

  it("should not create an user session: empty credentials", async () => {
    const userLoginData = {
      phone: "",
      password: "",
    };

    try {
      const createUserSession = await supertest(app).post("/login").send(userLoginData);
      expect(createUserSession.statusCode).toBe(401);
      expect(
        createUserSession.text.includes("Um ou mais valores inseridos são inválidos."),
      ).toBeTruthy();
    } catch (error) {
      return false;
    }
  });

  it("should not create an user session: empty password input", async () => {
    const userLoginData = {
      phone: "(11) 11111-1111",
      password: "",
    };

    try {
      const createUserSession = await supertest(app).post("/login").send(userLoginData);
      expect(createUserSession.statusCode).toBe(401);
      expect(createUserSession.text.includes("A senha inserida é inválida.")).toBeTruthy();
    } catch (error) {
      return false;
    }
  });

  it("should not create an user session: empty phone input", async () => {
    const userLoginData = {
      phone: "",
      password: "teste123",
    };

    try {
      const createUserSession = await supertest(app).post("/login").send(userLoginData);
      expect(createUserSession.statusCode).toBe(401);
      expect(
        createUserSession.text.includes("O número de telefone inserido é inválido."),
      ).toBeTruthy();
    } catch (error) {
      return false;
    }
  });
});
