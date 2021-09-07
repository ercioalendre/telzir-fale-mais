import { Request, Response } from "express";
import createUserService from "@modules/users/services/CreateUser.service";
import createUserSessionService from "@modules/users/services/CreateUserSession.service";
import AppError from "@shared/errors/AppError";

class UsersController {
  public async index(req: Request, res: Response): Promise<void> {
    res.render("my-account", {
      roomId: 123456,
      isThereAnyQuestion: 0,
      questions: 0,
      questionsRead: 0,
      msgType: "success",
      msgContent: "Conta criada com sucesso!",
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
}

export default new UsersController();
