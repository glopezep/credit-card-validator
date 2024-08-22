import { luhnCheck } from "../utils/luhn-check";

class CreditCardService {
  validateCreditCardNumber(creditCardNumber: string): boolean {
    if (!creditCardNumber || typeof creditCardNumber !== "string") {
      throw new Error("Invalid credit card number");
    }
    return luhnCheck(creditCardNumber);
  }
}

const creditCardService = new CreditCardService();

export default creditCardService;
