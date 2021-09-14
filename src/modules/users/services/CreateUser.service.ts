import { getCustomRepository } from "typeorm";
import UsersRepository from "@modules/users/typeorm/repositories/Users.repository";
import createUserSessionService from "@modules/users/services/CreateUserSession.service";
import { hash } from "bcryptjs";
import { Response } from "express";
import renderPageWithMessage from "@shared/http/providers/renderPageWithMessage";

class CreateUserService {
  public async execute(res: Response): Promise<void | boolean> {
    const { name, phone, email, password } = res.locals.formData;
    const usersRepository = getCustomRepository(UsersRepository);
    const phoneExists = await usersRepository.findByPhone(phone);
    const emailExists = await usersRepository.findByEmail(email);
    const origin = "signup";

    if (res.locals.message.msgContent) {
      const { msgContent, inputError } = res.locals.message;
      renderPageWithMessage(msgContent, inputError, res);
      return false;
    }

    if (emailExists) {
      renderPageWithMessage("Este endereço de e-mail já está cadastrado.", "email", res);
      return false;
    }

    if (phoneExists) {
      renderPageWithMessage("Este número de telefone já está cadastrado.", "phone", res);
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
      await createUserSessionService.execute({ phone, password, origin, res });
    }
  }
}

export default new CreateUserService();
