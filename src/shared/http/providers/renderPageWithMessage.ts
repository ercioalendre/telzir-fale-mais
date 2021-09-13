import { Response } from "express";

export default async function renderPageWithMessage(
  msgContent: string,
  inputError: string | string[],
  res: Response,
  page = "new-user",
  msgType = "error",
  statusCode = 422,
): Promise<string | unknown> {
  return res.status(statusCode).render("main", {
    page,
    msgContent,
    inputError,
    msgType,
  });
}
