import jwt from "@config/auth/jwt";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import renderPageWithMessage from "@shared/http/providers/renderPageWithMessage";

export default function isUserLoggedIn(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies["UserSessionToken"];

  if (token) {
    try {
      const decodedToken = verify(token, jwt.secret);
      if (decodedToken) {
        res.redirect("/my-account");
      } else {
        renderPageWithMessage(
          "Sessão inválida. Por favor, faça login novamente.",
          "",
          res,
          "login-block",
        );
      }
    } catch {
      throw new AppError("Invalid token.", 401);
    }
  } else {
    return next();
  }
}
