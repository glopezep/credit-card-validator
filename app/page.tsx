"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDebounce } from "./hooks/use-debounce";

export default function Home() {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const debouncedCreditCardNumber = useDebounce(creditCardNumber, 1000);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCreditCardNumber(e?.target.value);
    setMessage("Validating credit card");
    setIsLoading(true);
  }, []);

  const handleCreditCardNumberValidation = useCallback(async () => {
    try {
      if (debouncedCreditCardNumber) {
        const res: { success: boolean; message: string } = await fetch(
          "/api/validate-card",
          {
            method: "POST",
            body: JSON.stringify({
              creditCardNumber: debouncedCreditCardNumber,
            }),
          }
        ).then((r) => r.json());

        if (!res.success) {
          setMessage(res.message);
          setSuccess(false);

          return;
        }

        setMessage(res.message);
        setSuccess(true);
      }
    } catch (error: any) {
      setMessage(error.message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedCreditCardNumber]);

  useEffect(() => {
    handleCreditCardNumberValidation();
  }, [handleCreditCardNumberValidation]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p className="text-xl font-medium mb-4">Credit card Validator</p>
        <input
          className={`rounded-md peer p-4 py-2 border-2 border-gray-200 placeholder-gray-300`}
          type="text"
          name="creditCard"
          placeholder="0000 0000 0000 0000"
          value={creditCardNumber}
          onChange={handleChange}
        />
        <p
          className={`${
            isLoading ? "" : success ? "text-green-500" : "text-red-500"
          }`}
        >
          {!debouncedCreditCardNumber ? "" : message}
        </p>
      </div>
    </main>
  );
}
