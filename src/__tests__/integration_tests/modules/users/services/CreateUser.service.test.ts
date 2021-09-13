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

describe("Create user service tests", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    Promise.resolve(async () => {
      const createNewUser = await supertest(app).post("/signup").send(newUser);
      expect(createNewUser.statusCode).toBe(201);
      expect(createNewUser.text.includes("Conta criada com sucesso!")).toBeTruthy();
    });
  });

  it("should not create a new user: email address already exists", async () => {
    const userOne = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const userTwo = {
      name: "TESTE USUARIO",
      email: "usuario@teste.com.br",
      phone: "(22) 22222-2222",
      password: "123teste",
    };

    Promise.resolve(async () => {
      const createUserOne = await supertest(app).post("/signup").send(userOne);
      expect(createUserOne.statusCode).toBe(201);
      expect(createUserOne.text.includes("Conta criada com sucesso!")).toBeTruthy();
    });

    Promise.resolve(async () => {
      const createUserTwo = await supertest(app).post("/signup").send(userTwo);
      expect(createUserTwo.statusCode).toBe(422);
      expect(
        createUserTwo.text.includes("Este endereço de e-mail já está cadastrado."),
      ).toBeTruthy();
    });

    return true;
  });

  it("should not create a new user: phone number already exists", async () => {
    const userOne = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const userTwo = {
      name: "TESTE USUARIO",
      email: "teste@usuario.com.br",
      phone: "(11) 11111-1111",
      password: "123teste",
    };

    Promise.resolve(async () => {
      const createUserOne = await supertest(app).post("/signup").send(userOne);
      expect(createUserOne.statusCode).toBe(201);
      expect(createUserOne.text.includes("Conta criada com sucesso!")).toBeTruthy();
    });

    Promise.resolve(async () => {
      const createUserTwo = await supertest(app).post("/signup").send(userTwo);
      expect(createUserTwo.statusCode).toBe(422);
      expect(
        createUserTwo.text.includes("Este número de telefone já está cadastrado."),
      ).toBeTruthy();
    });

    // const createUserOne = await supertest(app).post("/signup").send(userOne);
    // expect(createUserOne.statusCode).toBe(201);
    // expect(createUserOne.text.includes("Conta criada com sucesso!")).toBeTruthy();

    // const createUserTwo = await supertest(app).post("/signup").send(userTwo);
    // expect(createUserTwo.statusCode).toBe(422);
    // expect(createUserTwo.text.includes("Este número de telefone já está cadastrado.")).toBeTruthy();
  });
});

describe("Create user service tests: new user registration form", () => {
  it("should not create a new user: full name field is required", async () => {
    const user = {
      name: "",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const response = await supertest(app).post("/signup").send(user);

    expect(response.statusCode).toEqual(422);
    expect(response.text.includes("O campo nome completo é obrigatório.")).toBeTruthy();
  });

  it("should not create a new user: full name field is invalid", async () => {
    const user = {
      name: "TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const response = await supertest(app).post("/signup").send(user);

    expect(response.statusCode).toEqual(422);
    expect(response.text.includes("O nome completo inserido é inválido.")).toBeTruthy();
  });

  it("should not create a new user: email field is required", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const response = await supertest(app).post("/signup").send(user);

    expect(response.statusCode).toEqual(422);
    expect(response.text.includes("O campo e-mail é obrigatório.")).toBeTruthy();
  });

  it("should not create a new user: email field is invalid", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.c",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    const response = await supertest(app).post("/signup").send(user);

    expect(response.statusCode).toEqual(422);
    expect(response.text.includes("O endereço de e-mail inserido é inválido.")).toBeTruthy();
  });

  it("should not create a new user: phone number field is required", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "",
      password: "teste123",
    };

    const response = await supertest(app).post("/signup").send(user);

    expect(response.statusCode).toEqual(422);
    expect(response.text.includes("O campo telefone é obrigatório.")).toBeTruthy();
  });

  it("should not create a new user: phone number field is invalid", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "+55 (11) 11111-1111",
      password: "teste123",
    };

    const response = await supertest(app).post("/signup").send(user);

    expect(response.statusCode).toEqual(422);
    expect(response.text.includes("O número de telefone inserido é inválido.")).toBeTruthy();
  });

  it("should not create a new user: password field is required", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "",
    };

    const response = await supertest(app).post("/signup").send(user);

    expect(response.statusCode).toEqual(422);
    expect(response.text.includes("O campo senha é obrigatório.")).toBeTruthy();
  });

  it("should not create a new user: password field is invalid", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste",
    };

    const response = await supertest(app).post("/signup").send(user);

    expect(response.statusCode).toEqual(422);
    expect(response.text.includes("A senha deve conter seis ou mais caracteres.")).toBeTruthy();
  });
});
