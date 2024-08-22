import { NextRequest, NextResponse } from "next/server";
import creditCardService from "../services/credit-card";

class CreditCardController {
  async validateCreditCardNumber(request: NextRequest) {
    try {
      const body = await request.json();
      const { creditCardNumber } = body;

      if (typeof creditCardNumber !== "string") {
        return NextResponse.json(
          { success: false, message: "Invalid credit card" },
          { status: 400 }
        );
      }

      const isValid =
        creditCardService.validateCreditCardNumber(creditCardNumber);

      if (!isValid) {
        return NextResponse.json(
          { success: false, message: "Invalid credit card" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: true, message: "Credit card is valid" },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error?.message },
        { status: 500 }
      );
    }
  }
}

const creditCardController = new CreditCardController();

export default creditCardController;
