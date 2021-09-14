import { Response } from "express";

export default async function renderPageWithInfo(
  msgContentWithFaleMais: string,
  msgContentWithoutFaleMais: string,
  res: Response,
  page = "my-account",
  msgType = "info",
  statusCode = 200,
): Promise<string | unknown> {
  return res.status(statusCode).render("main", {
    page,
    msgContentWithFaleMais,
    msgContentWithoutFaleMais,
    msgType,
  });
}
