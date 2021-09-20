import "reflect-metadata";
import connection from "@tests/providers/Connection.test";
import createNewUser from "@tests/providers/NewUser.test";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

describe("Create user service tests", () => {
  it("should create a new user", async () => {
    await connection.clear();
    try {
      await createNewUser({}).then(createUser => {
        expect(createUser.statusCode).toBe(201);
        expect(createUser.text.includes("Conta criada com sucesso!")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });

  it("should not create a new user: email address already exists", async () => {
    await connection.clear();
    const userOne = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    try {
      await createNewUser(userOne).then(createUser => {
        expect(createUser.statusCode).toBe(201);
        expect(createUser.text.includes("Conta criada com sucesso!")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }

    const userTwo = {
      name: "TESTE USUARIO",
      email: "usuario@teste.com.br",
      phone: "(22) 22222-2222",
      password: "123teste",
    };

    try {
      await createNewUser(userTwo).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(
          createUser.text.includes("Este endereço de e-mail já está cadastrado."),
        ).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });

  it("should not create a new user: phone number already exists", async () => {
    await connection.clear();
    const userOne = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    try {
      await createNewUser(userOne).then(createUser => {
        expect(createUser.statusCode).toBe(201);
        expect(createUser.text.includes("Conta criada com sucesso!")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }

    const userTwo = {
      name: "TESTE USUARIO",
      email: "teste@usuario.com.br",
      phone: "(11) 11111-1111",
      password: "123teste",
    };

    try {
      await createNewUser(userTwo).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(
          createUser.text.includes("Este número de telefone já está cadastrado."),
        ).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
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

    try {
      await createNewUser(user).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(createUser.text.includes("O campo nome completo é obrigatório.")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });

  it("should not create a new user: full name field is invalid", async () => {
    const user = {
      name: "TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    try {
      await createNewUser(user).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(createUser.text.includes("O nome completo inserido é inválido.")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });

  it("should not create a new user: email field is required", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    try {
      await createNewUser(user).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(createUser.text.includes("O campo e-mail é obrigatório.")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });

  it("should not create a new user: email field is invalid", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.c",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    try {
      await createNewUser(user).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(createUser.text.includes("O endereço de e-mail inserido é inválido.")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });

  it("should not create a new user: phone number field is required", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "",
      password: "teste123",
    };

    try {
      await createNewUser(user).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(createUser.text.includes("O campo telefone é obrigatório.")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });

  it("should not create a new user: phone number field is invalid", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "+55 (11) 11111-1111",
      password: "teste123",
    };

    try {
      await createNewUser(user).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(createUser.text.includes("O número de telefone inserido é inválido.")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });

  it("should not create a new user: password field is required", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "",
    };

    try {
      await createNewUser(user).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(createUser.text.includes("O campo senha é obrigatório.")).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });

  it("should not create a new user: password field is invalid", async () => {
    const user = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste",
    };

    try {
      await createNewUser(user).then(createUser => {
        expect(createUser.statusCode).toBe(422);
        expect(
          createUser.text.includes("A senha deve conter seis ou mais caracteres."),
        ).toBeTruthy();
      });
    } catch (error) {
      return false;
    }
  });
});
