import { Request, Response } from "express";
import renderPageWithInfo from "@shared/http/providers/renderPageWithInfo";

type originToDestinationPrices = {
  [key: string]: number;
};

class CalculateCallCosts {
  public async execute(req: Request, res: Response): Promise<void | boolean> {
    const { callDuration, selectedFaleMaisPlan, routeDescription } = req.body;
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
    let planName = "";

    Object.entries(faleMaisPlans).forEach(([key, val]) => {
      if (selectedFaleMaisPlan === key) {
        planName = `FaleMais${val}`;
        if (callDuration <= val) {
          callCostWithPlan = 0;
        } else {
          const callCostWithoutDiscount = (callDuration - val) * callRouteMinutePrice;
          callCostWithPlan = callCostWithoutDiscount + callCostWithoutDiscount * 0.1;
        }
      }
    });

    const formattedCallCostWithPlan = callCostWithPlan
      ? callCostWithPlan.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
      : "R$ 0,00";
    const formattedCallCostWithoutPlan = callCostWithoutPlan
      ? callCostWithoutPlan.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
      : "R$ 0,00";

    renderPageWithInfo(
      `Com o plano ${planName}, o custo de uma chamada de ${callDuration} minutos de duração com ${routeDescription} será de ${formattedCallCostWithPlan}.`,
      `Sem nenhum plano contratado, o custo desta mesma chamada será de ${formattedCallCostWithoutPlan}.`,
      res,
    );
    return true;
  }
}

export default new CalculateCallCosts();
