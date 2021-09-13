import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import supertest from "supertest";
import app from "@shared/http/app";

const connection = {
  async create(): Promise<void> {
    await createConnection();
  },

  async close(): Promise<void> {
    await getConnection().close();
  },

  async clear(): Promise<void> {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async entity => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

afterEach(async () => {
  await connection.clear();
});

describe("Create user session service tests", () => {
  it("should create an user session", async () => {
    const newUser = {
      name: "USUARIO TESTE",
      email: "usuario2@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const userLoginData = {
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    Promise.resolve(async () => {
      const createNewUser = await supertest(app).post("/signup").send(newUser);
      expect(createNewUser.statusCode).toBe(201);
      expect(createNewUser.text.includes("Conta criada com sucesso!")).toBeTruthy();
    });

    Promise.resolve(async () => {
      const createUserSession = await supertest(app).post("/login").send(userLoginData);
      expect(createUserSession.statusCode).toBe(302);
      expect(createUserSession.header.location).toBe("/my-account");
    });
  });

  it("should not create an user session: wrong credentials", async () => {
    const userLoginData = {
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const createUserSession = await supertest(app).post("/login").send(userLoginData);
    expect(createUserSession.statusCode).toBe(401);
    expect(
      createUserSession.text.includes("O número de telefone ou senha está incorreto."),
    ).toBeTruthy();
  });

  it("should not create an user session: empty credentials", async () => {
    const userLoginData = {
      phone: "",
      password: "",
    };

    const createUserSession = await supertest(app).post("/login").send(userLoginData);
    expect(createUserSession.statusCode).toBe(401);
    expect(
      createUserSession.text.includes("Um ou mais valores inseridos são inválidos."),
    ).toBeTruthy();
  });

  it("should not create an user session: empty password input", async () => {
    const userLoginData = {
      phone: "(11) 11111-1111",
      password: "",
    };

    const createUserSession = await supertest(app).post("/login").send(userLoginData);
    expect(createUserSession.statusCode).toBe(401);
    expect(createUserSession.text.includes("A senha inserida é inválida.")).toBeTruthy();
  });

  it("should not create an user session: empty phone input", async () => {
    const userLoginData = {
      phone: "",
      password: "teste123",
    };

    const createUserSession = await supertest(app).post("/login").send(userLoginData);
    expect(createUserSession.statusCode).toBe(401);
    expect(
      createUserSession.text.includes("O número de telefone inserido é inválido."),
    ).toBeTruthy();
  });
});
