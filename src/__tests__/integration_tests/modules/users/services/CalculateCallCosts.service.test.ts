import "reflect-metadata";
import supertest from "supertest";
import app from "@shared/http/app";
import connection from "@tests/Test.connection";
import { sign } from "jsonwebtoken";
import jwt from "@config/auth/jwt";

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

describe("Call costs calculator service tests", () => {
  it("should calculate a call cost: call cost with plan > 0", async () => {
    const token = sign({ name: "USUARIO TESTE" }, jwt.secret, {
      expiresIn: jwt.expiresIn,
    });

    const calcData = {
      callRoute: "elevenToSeventeen",
      callDuration: 80,
      selectedFaleMaisPlan: "faleMaisSixty",
      routeDescription: "Origem (11) e Destino (17)",
    };

    const calculateCallCost = await Promise.resolve(
      supertest(app)
        .post("/my-account/calcular")
        .set("Cookie", `UserSessionToken=${token}`)
        .send(calcData),
    );

    expect(calculateCallCost.statusCode).toBe(200);
    expect(calculateCallCost.text.includes("calc-wrapper")).toBeTruthy();
  });

  it("should calculate a call cost: call cost with plan == 0", async () => {
    const token = sign({ name: "USUARIO TESTE" }, jwt.secret, {
      expiresIn: jwt.expiresIn,
    });

    const calcData = {
      callRoute: "elevenToSixteen",
      callDuration: 20,
      selectedFaleMaisPlan: "faleMaisThirty",
      routeDescription: "Origem (11) e Destino (16)",
    };

    const calculateCallCost = await Promise.resolve(
      supertest(app)
        .post("/my-account/calcular")
        .set("Cookie", `UserSessionToken=${token}`)
        .send(calcData),
    );

    expect(calculateCallCost.statusCode).toBe(200);
    expect(calculateCallCost.text.includes("calc-wrapper")).toBeTruthy();
  });

  it("should calculate a call cost: call cost without == 0", async () => {
    const token = sign({ name: "USUARIO TESTE" }, jwt.secret, {
      expiresIn: jwt.expiresIn,
    });

    const calcData = {
      callRoute: "elevenToSixteen",
      callDuration: 0,
      selectedFaleMaisPlan: "faleMaisThirty",
      routeDescription: "Origem (11) e Destino (16)",
    };

    const calculateCallCost = await Promise.resolve(
      supertest(app)
        .post("/my-account/calcular")
        .set("Cookie", `UserSessionToken=${token}`)
        .send(calcData),
    );

    expect(calculateCallCost.statusCode).toBe(200);
    expect(calculateCallCost.text.includes("calc-wrapper")).toBeTruthy();
  });
});