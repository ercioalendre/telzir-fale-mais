import { Response } from "express";

export default async function renderPageWithError(
  msgContent: string,
  inputError: string | string[],
  res: Response,
  page = "new-user",
  msgType = "error",
): Promise<string | unknown> {
  return res.render("main", {
    page,
    msgContent,
    inputError,
    msgType,
  });
}
