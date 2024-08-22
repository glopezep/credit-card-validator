export function luhnCheck(number: string): boolean {
  let sum = 0;
  let shouldDouble = false;

  if (!number.length) {
    return false;
  }

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);

    if (isNaN(digit)) {
      return false; // Invalid character found
    }

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
