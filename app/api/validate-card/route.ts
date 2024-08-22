import creditCardController from "@/app/controllers/credit-card";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  return creditCardController.validateCreditCardNumber(request);
}
