import { FeeeF } from "feeef";

export const ff = new FeeeF({
    apiKey:
      process.env.FEEEF_API_KEY || "c43Yfd3bgolijJU3b3bx095vlfTrvnL94baZrd1",
    baseURL: "https://feeef.app/api/v1",
    cache: 10,
  });