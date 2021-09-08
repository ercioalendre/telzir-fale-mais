import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "@modules/users/typeorm/repositories/Users.repository";
import createUserSessionService from "@modules/users/services/CreateUserSession.service";
import { hash } from "bcryptjs";
import { Response } from "express";

class CreateUserService {
  public async execute(res: Response): Promise<void | boolean> {
    const { name, phone, email } = res.locals.formData;
    const { password, ...formDataWithoutPassword } = res.locals.formData;
    const usersRepository = getCustomRepository(UsersRepository);
    const phoneExists = await usersRepository.findByPhone(phone);
    const emailExists = await usersRepository.findByEmail(email);

    async function renderSignUpPage(
      msgContent: string,
      inputError: string | string[],
      msgType = "error",
    ): Promise<string | unknown> {
      return res.render("main", {
        page: "new-user",
        msgContent,
        inputError,
        msgType,
        formDataWithoutPassword,
      });
    }

    if (res.locals.message) {
      const { msgContent, inputError } = res.locals.message;
      renderSignUpPage(msgContent, inputError);
      return false;
    }

    if (emailExists) {
      renderSignUpPage("Este endereço de e-mail já está cadastrado.", "email");
      return false;
    }

    if (phoneExists) {
      renderSignUpPage("Este número de telefone já está cadastrado.", "phone");
      return false;
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const createUser = await usersRepository.save(user);

    if (createUser) {
      await createUserSessionService.execute({
        phone,
        password,
        res,
      });
    } else {
      throw new AppError(
        "Something went wrong during the creation of your account.",
      );
    }
  }
}

export default new CreateUserService();
