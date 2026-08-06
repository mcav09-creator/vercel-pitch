import { get } from "@vercel/blob";

export const TARGET_ACCOUNT_STATUS_PATHNAME = "status/target-accounts-verification.json";

export const VERIFIED_ACCOUNT_NAMES = [
  "Airwallex",
  "REA Group",
  "Judo Bank",
  "Woolworths",
  "Cotton On",
] as const;

export type TargetAccountVerification = {
  checkedAt: string;
  accounts: { name: string; foundOnCustomerList: boolean }[];
  source: string;
};

/**
 * Reads the last cron-verified result from Blob storage. Returns null if
 * the cron hasn't run yet, or if the read fails for any reason — callers
 * should treat null as "no verification data available" and degrade
 * gracefully rather than error.
 */
export async function getTargetAccountVerification(): Promise<TargetAccountVerification | null> {
  try {
    const result = await get(TARGET_ACCOUNT_STATUS_PATHNAME, { access: "private" });
    if (!result) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as TargetAccountVerification;
  } catch {
    return null;
  }
}
