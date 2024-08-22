// tests/creditCardService.test.ts

import { luhnCheck } from "@/app/utils/luhn-check";

describe("luhnCheck", () => {
  it("should return true for a valid credit card number", () => {
    expect(luhnCheck("4532015112830366")).toBe(true); // Valid Visa card number
  });

  it("should return false for an invalid credit card number", () => {
    expect(luhnCheck("1234567890123456")).toBe(false); // Invalid card number
  });

  it("should return false for an empty string", () => {
    expect(luhnCheck("")).toBe(false); // Edge case: Empty input
  });

  it("should return false for non-numeric characters", () => {
    expect(luhnCheck("abcd567890123456")).toBe(false); // Non-numeric input
  });

  it("should return true for another valid credit card number", () => {
    expect(luhnCheck("6011111111111117")).toBe(true); // Valid Discover card number
  });

  it("should return false for a number with invalid checksum", () => {
    expect(luhnCheck("4532015112830360")).toBe(false); // Invalid checksum
  });
});
