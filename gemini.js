import dotenv from "dotenv";
dotenv.config();

/**
 * Convert a natural-language prompt in *any* language into a single Git command.
 * Returns either:
 *   • a string that starts with "git …"
 *   • "❌ Please provide a more specific Git request."
 */
export async function getGitCommand(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `
You are a STRICT Git assistant.

• The user's request might be in any language (e.g., Hindi, Marathi, English).
• Then, determine if it can be mapped to a single Git command.
• If YES, respond with ONLY that Git command (no explanations, no formatting, no markdown, no backticks).
• If the request is unclear, not Git-related, or requires multiple steps, respond with exactly this line:
❌ Please provide a more specific Git request.

User input: "${prompt}"
`
        }]
      }]
    })
  });

  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!raw) return "❌ Please provide a more specific Git request.";

  // Return the first line only, in case Gemini adds extra lines
  return raw.split("\n")[0].trim();
}
