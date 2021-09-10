import { Request, Response } from "express";
import renderPageWithInfo from "@modules/users/utils/renderPageWithInfo";

type originToDestinationPrices = {
  [key: string]: number;
};

class CalculateCallCosts {
  public async execute(req: Request, res: Response): Promise<void | boolean> {
    const { callDuration, selectedFaleMaisPlan } = req.body;
    const callRoute: keyof originToDestinationPrices = req.body.callRoute;

    const faleMaisPlans = {
      faleMaisThirty: 30,
      faleMaisSixty: 60,
      faleMaisOneHundredTwenty: 120,
    };

    const originToDestinationPrices: originToDestinationPrices = {
      elevenToSixteen: 1.9,
      sixteenToEleven: 2.9,
      elevenToSeventeen: 1.7,
      seventeenToEleven: 2.7,
      elevenToEighteen: 0.9,
      eighteenToEleven: 1.9,
    };

    const callRouteMinutePrice = originToDestinationPrices[callRoute];

    const callCostWithoutPlan = Number(callDuration * callRouteMinutePrice);

    let callCostWithPlan = 0;

    Object.entries(faleMaisPlans).forEach(([key, val]) => {
      if (selectedFaleMaisPlan === key) {
        if (callDuration <= val) {
          callCostWithPlan = 0;
        } else {
          const callCostWithoutDiscount = (callDuration - val) * callRouteMinutePrice;
          callCostWithPlan = callCostWithoutDiscount + callCostWithoutDiscount * 0.1;
        }
      }
    });

    console.log(callCostWithPlan);

    const formattedCallCostWithPlan = callCostWithPlan
      ? callCostWithPlan.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
      : "R$ 0,00";

    renderPageWithInfo(
      `Com o plano ${selectedFaleMaisPlan}, o custo de uma chamada de ${callDuration} minutos de ${callRoute} será de ${formattedCallCostWithPlan}`,
      "",
      res,
    );
    return true;
  }
}

export default new CalculateCallCosts();
