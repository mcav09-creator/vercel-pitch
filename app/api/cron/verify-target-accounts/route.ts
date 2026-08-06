import { put } from "@vercel/blob";
import {
  TARGET_ACCOUNT_STATUS_PATHNAME,
  VERIFIED_ACCOUNT_NAMES,
  type TargetAccountVerification,
} from "@/lib/target-account-status";

export const maxDuration = 30;

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  let customerListText = "";
  try {
    const res = await fetch("https://vercel.com/customers", {
      headers: { "User-Agent": "vercel-pitch-cron/1.0" },
    });
    if (res.ok) {
      customerListText = await res.text();
    }
  } catch {
    // Network failure fetching the customer list — record the check with
    // everything defaulting to "not found" rather than failing the cron
    // run outright, so the site still gets a fresh "last checked" stamp.
  }

  const lowerList = customerListText.toLowerCase();
  const accounts = VERIFIED_ACCOUNT_NAMES.map((name) => ({
    name,
    foundOnCustomerList: lowerList.includes(name.toLowerCase()),
  }));

  const result: TargetAccountVerification = {
    checkedAt: new Date().toISOString(),
    accounts,
    source: "https://vercel.com/customers",
  };

  await put(TARGET_ACCOUNT_STATUS_PATHNAME, JSON.stringify(result), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return Response.json(result);
}
