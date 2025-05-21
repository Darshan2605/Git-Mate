import dotenv from "dotenv";
dotenv.config();

/**
 * Convert a natural-language prompt in any language into a Git, Linux, or Windows command.
 * Returns:
 *   • a string with a valid command
 *   • or "❌ Please provide a more specific <Git/Linux/Windows> request."
 */
export async function getCommand(prompt, category = "Git") {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  let systemPrompt = "";

  if (category === "Git") {
    systemPrompt = `
You are a STRICT Git assistant.

• The user's request might be in any language (e.g., Hindi, Marathi, English).
• Determine if it can be mapped to a single Git command.
• If YES, respond with ONLY that Git command (no explanations, no formatting, no markdown, no backticks).
• If the request is unclear, not Git-related, or requires multiple steps, respond with exactly this line:
❌ Please provide a more specific Git request.

User input: "${prompt}"
`;
  } else if (category === "Linux") {
    systemPrompt = `
You are a STRICT Linux terminal assistant.

• The user's request might be in any language (e.g., Hindi, Marathi, English).
• Determine if it can be converted to a valid single Linux terminal command (bash/shell).
• If YES, respond with ONLY that Linux command (no explanations, no formatting, no markdown, no backticks).
• If the request is unclear, not Linux-related, or requires multiple steps, respond with exactly this line:
❌ Please provide a more specific Linux request.

User input: "${prompt}"
`;
  } else if (category === "Windows") {
    systemPrompt = `
You are a STRICT Windows command line assistant.

• The user's request might be in any language (e.g., Hindi, Marathi, English).
• Determine if it can be converted to a valid single Windows command (cmd or PowerShell).
• If YES, respond with ONLY that Windows command (no explanations, no formatting, no markdown, no backticks).
• If the request is unclear, not Windows-related, or requires multiple steps, respond with exactly this line:
❌ Please provide a more specific Windows request.

User input: "${prompt}"
`;
  } else {
    return "❌ Unsupported category.";
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: systemPrompt
        }]
      }]
    })
  });

  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!raw) return `❌ Please provide a more specific ${category} request.`;

  return raw.split("\n")[0].trim();
}
