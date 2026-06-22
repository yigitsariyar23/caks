export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

export function getGeminiErrorMessage(error: any): string {
  if (error?.status === 401) {
    return "Gemini API authentication failed. Please verify your API key.";
  }

  if (error?.status === 429) {
    return [
      "Gemini quota exceeded.",
      "Your API key is being accepted, but this project currently has no usable quota for the selected model.",
      "If you want to stay on the free tier, verify the key was created in Google AI Studio, check the project's active rate limits, and wait for the reset window if you already consumed today's or this minute's quota.",
      "If the project's limits show 0, you'll need a different eligible project or billing enabled on the linked Google Cloud project."
    ].join(" ");
  }

  return `Gemini API error: ${error?.message || "Unknown error"}`;
}
