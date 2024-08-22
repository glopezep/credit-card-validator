import { NextRequest, NextResponse } from "next/server";
import creditCardController from "../app/controllers/credit-card"; // Adjust the path as necessary
import creditCardService from "../app/services/credit-card";

// Mock the creditCardService
jest.mock("../app/services/credit-card", () => ({
  validateCreditCardNumber: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body, options) => {
      return {
        ...options,
        body,
      } as any;
    }),
  },
}));

describe("CreditCardController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and success true for a valid credit card number", async () => {
    // Arrange
    const request = {
      json: jest
        .fn()
        .mockResolvedValue({ creditCardNumber: "4532015112830366" }),
    } as unknown as NextRequest;

    (creditCardService.validateCreditCardNumber as jest.Mock).mockReturnValue(
      true
    );

    // Act
    const response = await creditCardController.validateCreditCardNumber(
      request
    );

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(creditCardService.validateCreditCardNumber).toHaveBeenCalledWith(
      "4532015112830366"
    );
  });

  it("should return 400 and success false for an invalid credit card number", async () => {
    // Arrange
    const request = {
      json: jest
        .fn()
        .mockResolvedValue({ creditCardNumber: "1234567890123456" }),
    } as unknown as NextRequest;

    (creditCardService.validateCreditCardNumber as jest.Mock).mockReturnValue(
      false
    );

    // Act
    const response = await creditCardController.validateCreditCardNumber(
      request
    );

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ success: false });
    expect(creditCardService.validateCreditCardNumber).toHaveBeenCalledWith(
      "1234567890123456"
    );
  });

  it("should return 400 and an error message for Invalid credit card type", async () => {
    // Arrange
    const request = {
      json: jest.fn().mockResolvedValue({ creditCardNumber: 1234567890123456 }), // Not a string
    } as unknown as NextRequest;

    // Act
    const response = await creditCardController.validateCreditCardNumber(
      request
    );

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Invalid credit card",
    });
    expect(creditCardService.validateCreditCardNumber).not.toHaveBeenCalled();
  });

  it("should return 500 and success false if an exception is thrown", async () => {
    // Arrange
    const request = {
      json: jest.fn().mockRejectedValue(new Error("Something went wrong")),
    } as unknown as NextRequest;

    // Act
    const response = await creditCardController.validateCreditCardNumber(
      request
    );

    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false });
    expect(creditCardService.validateCreditCardNumber).not.toHaveBeenCalled();
  });
});
