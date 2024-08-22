// tests/creditCardService.test.ts

import creditCardService from "@/app/services/credit-card";

describe("CreditCardService", () => {
  it("should validate a correct credit card number", () => {
    expect(creditCardService.validateCreditCardNumber("4532015112830366")).toBe(
      true
    );
  });

  it("should invalidate an incorrect credit card number", () => {
    expect(creditCardService.validateCreditCardNumber("1234567890123456")).toBe(
      false
    );
  });

  it("should throw an error for an Invalid credit card", () => {
    expect(() => creditCardService.validateCreditCardNumber("")).toThrow(
      "Invalid credit card number"
    );
  });
});
