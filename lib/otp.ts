import { createHash, randomInt, timingSafeEqual } from "node:crypto";

export function generateOtp(): string {
  return randomInt(100000, 1000000).toString();
}

export function hashOtp(otp: string): string {
  return createHash("sha256").update(otp).digest("hex");
}

export function verifyOtp(otp: string, expectedHash: string): boolean {
  const actual = Buffer.from(hashOtp(otp), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function getOtpExpiry(): Date {
  const minutes = Number(process.env.OTP_EXPIRATION_MINUTES ?? "5");
  return new Date(Date.now() + minutes * 60_000);
}
