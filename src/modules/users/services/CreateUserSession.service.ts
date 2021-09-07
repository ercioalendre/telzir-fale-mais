import jwt from "@config/auth/jwt";
import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "@modules/users/typeorm/repositories/Users.repository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Response } from "express";

interface IRequest {
  phone: string;
  password: string;
  res: Response;
}

class CreateUserSessionService {
  public async execute({ phone, password, res }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByPhone(phone);
    const userPassword = user?.password || "";
    const passwordComparison = await compare(password, userPassword);

    if (!user || !passwordComparison) {
      throw new AppError(
        "The phone number or password you entered is incorrect.",
        401,
      );
    }

    const token = sign({ id: user.id }, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    res.cookie("UserSessionToken", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    res.redirect("/my-account");
  }
}

export default new CreateUserSessionService();
