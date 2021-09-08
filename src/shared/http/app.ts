import "dotenv/config";
import "reflect-metadata";
import "@shared/typeorm";
import "express-async-errors";
import cors from "cors";
import routes from "@MainRoutes";
import path from "path";
import AppError, { isOperationalError } from "@shared/errors/AppError";
import express, { Express, NextFunction, Request, Response } from "express";
import { isCelebrateError } from "celebrate";
import cookieParser from "cookie-parser";

process.on("unhandledRejection", error => {
  throw error;
});

process.on("uncaughtException", error => {
  console.error(error);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

class AppController {
  express: Express;

  constructor() {
    this.express = express();
    this.express.set("view engine", "ejs");
    this.express.use(express.static("public"));
    this.express.set("views", path.join(__dirname, "views"));
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(routes);
  }

  errorHandler() {
    this.express.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({
            status: "error",
            message: error.message,
          });
        }
        if (isCelebrateError(error)) {
          const errorBody = error.details.get("body");
          const celebrateErrorMessage =
            errorBody != undefined ? errorBody.message : undefined;
          return res.status(401).json({
            status: "error",
            message: celebrateErrorMessage,
          });
        }
        console.log(error);
        return res.status(500).json({
          status: "error",
          message: "Internal server error",
        });
      },
    );
  }
}

export default new AppController().express;