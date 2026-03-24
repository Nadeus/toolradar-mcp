---
name: recommend-tool
description: Find and recommend the best software tool for a specific need. Uses Toolradar MCP to search, compare, and give a structured recommendation with pricing, pros/cons, and alternatives.
---

When the user asks for a tool recommendation, follow this process:

1. **Understand the need**: Identify the category, budget, team size, and key requirements from the user's request.

2. **Search**: Use `search_tools` to find relevant tools. Filter by category and pricing if specified. Request at least 5-10 results.

3. **Get details**: Use `get_tool` on the top 3-5 most relevant results to get full details (pros, cons, features, pricing, editorial scores).

4. **Compare**: If 2-3 tools stand out, use `compare_tools` to get a side-by-side comparison with computed insights (best overall, best value).

5. **Check alternatives**: If the user mentioned a specific tool they want to replace, use `get_alternatives` to find direct competitors.

6. **Recommend**: Present your recommendation in this format:

   **Top pick**: [Tool name] — [One sentence why]
   - Score: X/100 | Pricing: [model] | Starting at: [price]
   - Why: [2-3 sentences based on the data]

   **Runner-up**: [Tool name] — [One sentence why]

   **Budget pick**: [Tool name] — [One sentence why, especially if free/freemium]

   Then include a brief comparison table of the top 3 with: name, score, pricing, key differentiator.

7. **Link**: Always include the Toolradar URL for each recommended tool so the user can read the full review.

Important:
- Never hallucinate pricing — always use `get_pricing` if the user asks about cost.
- Prefer tools with higher editorial scores (these are manually verified).
- If no tools match the criteria, say so honestly rather than recommending a poor fit.
- Use `list_categories` if you're unsure which category to search in.
