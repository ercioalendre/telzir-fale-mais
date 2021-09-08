import { NextFunction, Request, Response } from "express";

export default function checkNewUserForm(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { name, email, phone, password } = req.body;
  const formData = { name, email, phone, password };
  const inputError: string[] = [];
  Object.entries(formData).forEach(([key, val]) => {
    if (!val || val == "" || val == undefined) {
      let message;

      if (key === "password") {
        message = "A senha inserida é inválida";
      }
      if (key === "phone") {
        message = "O número de telefone inserido é inválido";
      }
      if (key === "email") {
        message = "O endereço de e-mail inserido é inválido";
      }
      if (key === "name") {
        message = "O nome completo inserido é inválido";
      }

      inputError.push(key);

      message =
        inputError.length == 1
          ? message
          : "Um ou mais valores inseridos são inválidos.";

      res.locals.message = {
        msgType: "error",
        msgContent: message,
        inputError,
      };
    }
  });
  res.locals.formData = {
    name,
    email,
    phone,
    password,
  };
  next();
}
