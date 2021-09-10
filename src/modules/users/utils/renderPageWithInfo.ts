import { Response } from "express";

export default async function renderPageWithMessage(
  msgContentWithFaleMais: string,
  msgContentWithoutFaleMais: string,
  res: Response,
  page = "my-account",
  msgType = "info",
): Promise<string | unknown> {
  return res.render("main", {
    page,
    msgContentWithFaleMais,
    msgContentWithoutFaleMais,
    msgType,
  });
}
