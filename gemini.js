import dotenv from "dotenv";
dotenv.config();

export async function getGitCommand(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Convert the following into a valid Git command. Just return the command only (no explanation, no markdown): "${prompt}"`
        }]
      }]
    })
  });

  const data = await res.json();
  let raw = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!raw) return "❌ Could not generate command.";

  // Cleanup: Remove markdown formatting, explanation, and backticks
  const cleaned = raw
    .replace(/```(bash|sh)?/g, "")  // Remove markdown bash tags
    .replace(/```/g, "")            // Remove generic markdown
    .replace(/^#+\s*/, "")          // Remove markdown headers
    .replace(/^\s*\$?\s*/gm, "")    // Remove shell prompts like "$"
    .split("\n")                    // Get first non-empty line
    .find(line => line.trim().length > 0)
    .trim();

  return cleaned || "❌ Could not clean the response.";
}

