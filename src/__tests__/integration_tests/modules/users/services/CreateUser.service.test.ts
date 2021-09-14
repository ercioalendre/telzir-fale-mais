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

    await supertest(app).post("/signup").send(newUser).expect(201);
  });

  it("should not create a new user: email address already exists", async () => {
    const userOne = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    await supertest(app).post("/signup").send(userOne).expect(201);

    const userTwo = {
      name: "TESTE USUARIO",
      email: "usuario@teste.com.br",
      phone: "(22) 22222-2222",
      password: "123teste",
    };

    await supertest(app).post("/signup").send(userTwo).expect(422);
  });

  it("should not create a new user: phone number already exists", async () => {
    const userOne = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    await supertest(app).post("/signup").send(userOne).expect(201);

    const userTwo = {
      name: "TESTE USUARIO",
      email: "teste@usuario.com.br",
      phone: "(11) 11111-1111",
      password: "123teste",
    };

    await supertest(app).post("/signup").send(userTwo).expect(422);
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

    await supertest(app).post("/signup").send(user).expect(422);
  });

  it("should not create a new user: full name field is invalid", async () => {
    const user = {
      name: "TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    await supertest(app).post("/signup").send(user).expect(422);
  });

  it("should not create a new user: email field is required", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    await supertest(app).post("/signup").send(user).expect(422);
  });

  it("should not create a new user: email field is invalid", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.c",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    await supertest(app).post("/signup").send(user).expect(422);
  });

  it("should not create a new user: phone number field is required", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "",
      password: "teste123",
    };

    await supertest(app).post("/signup").send(user).expect(422);
  });

  it("should not create a new user: phone number field is invalid", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "+55 (11) 11111-1111",
      password: "teste123",
    };

    await supertest(app).post("/signup").send(user).expect(422);
  });

  it("should not create a new user: password field is required", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "",
    };

    await supertest(app).post("/signup").send(user).expect(422);
  });

  it("should not create a new user: password field is invalid", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste",
    };

    await supertest(app).post("/signup").send(user).expect(422);
  });
});
