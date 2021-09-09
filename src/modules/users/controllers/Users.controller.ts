import { Request, Response } from "express";
import createUserService from "@modules/users/services/CreateUser.service";
import createUserSessionService from "@modules/users/services/CreateUserSession.service";
import calculateCallCosts from "@modules/users/services/CalculateCallCosts.service";
import AppError from "@shared/errors/AppError";

class UsersController {
  public async index(req: Request, res: Response): Promise<void> {
    res.render("main", {
      page: "my-account",
      msgType: "",
      msgContent: "",
      inputError: "",
      formData: {},
    });
  }

  public async login(req: Request, res: Response): Promise<void> {
    res.render("main", {
      page: "login-block",
      msgType: "",
      msgContent: "",
      inputError: "",
      formData: {},
    });
  }

  public async signup(req: Request, res: Response): Promise<void> {
    res.render("main", {
      page: "new-user",
      msgType: "",
      msgContent: "",
      inputError: "",
      formData: {},
    });
  }

  public async create(req: Request, res: Response): Promise<void> {
    await createUserService.execute(res);
  }

  public async createUserSession(req: Request, res: Response): Promise<void> {
    const authHeader = req.body;
    if (authHeader) {
      const { phone, password } = authHeader;
      await createUserSessionService.execute({
        phone,
        password,
        res,
      });
    } else {
      throw new AppError("authHeader was not found.");
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie("UserSessionToken").redirect("/login");
  }

  public async calculate(req: Request, res: Response): Promise<void> {
    console.log("PASSEI AQUI [CONTROLLER]");
    await calculateCallCosts.execute(req, res);
  }
}

export default new UsersController();
