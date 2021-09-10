import jwt from "@config/auth/jwt";
import { getCustomRepository } from "typeorm";
import UsersRepository from "@modules/users/typeorm/repositories/Users.repository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Response } from "express";
import renderPageWithMessage from "@modules/users/utils/renderPageWithMessage";

interface IRequest {
  phone: string;
  password: string;
  origin?: string;
  res: Response;
}

class CreateUserSessionService {
  public async execute({ phone, password, origin, res }: IRequest): Promise<void | boolean> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByPhone(phone);
    const userPassword = user?.password || "";
    const passwordComparison = await compare(password, userPassword);
    const message = res.locals.message;

    if (message) {
      if (message.msgContent) {
        const { msgContent, inputError } = res.locals.message;
        renderPageWithMessage(msgContent, inputError, res, "login-block");
        return false;
      }
    }

    if (!user || !passwordComparison) {
      renderPageWithMessage(
        "O número de telefone ou senha está incorreto.",
        "",
        res,
        "login-block",
      );
      return false;
    }

    res.locals.user = {
      name: user.name,
    };

    const token = sign({ name: user.name }, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    res.cookie("UserSessionToken", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    if (origin === "signup") {
      renderPageWithMessage("Conta criada com sucesso!", "", res, "signup-success", "success");
    } else {
      res.redirect("/my-account");
    }
  }
}

export default new CreateUserSessionService();
