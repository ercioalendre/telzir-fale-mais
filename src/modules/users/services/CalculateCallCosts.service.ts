import { Request, Response } from "express";

class CalculateCallCosts {
  public async execute(req: Request, res: Response): Promise<void | boolean> {
    const { callOrigin, callDestination, callDuration, faleMaisPlan } = req.body;
    console.log(req.body);
    console.log(callOrigin, callDestination, callDuration, faleMaisPlan);
  }
}

export default new CalculateCallCosts();
