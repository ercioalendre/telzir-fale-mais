import jwt from "@config/auth/jwt";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayLoad {
  iat: number;
  ext: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = req.cookies["UserSessionToken"];

  if (token) {
    try {
      const decodedToken = verify(token, jwt.secret);
      const { sub } = decodedToken as ITokenPayLoad;

      req.user = {
        id: sub,
      };

      res.redirect("/my-account");
    } catch {
      throw new AppError("Invalid token.", 401);
    }
  } else {
    return next();
  }
}
