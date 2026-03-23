# Social Media Launch Content

## LinkedIn Post

We just made 8,400+ software tools callable by AI agents.

Toolradar MCP is a free MCP server that gives Claude, Cursor, and any AI agent access to verified tool intelligence — pricing, reviews, alternatives, comparisons.

Why? LLMs have a knowledge cutoff. They confidently quote prices from 2023, recommend tools that no longer exist, and miss hundreds of new launches.

We fix this with:
→ Pricing verified weekly (not hallucinated)
→ G2 & Capterra ratings (real user sentiment)
→ AI-identified alternatives (not just category matches)
→ New tools added daily from Product Hunt, HN, and community

Set up in 2 minutes:
1. Get a free API key at toolradar.com/dashboard/api-keys
2. Add one line to your Claude Desktop config
3. Ask your agent to find, compare, or price any software tool

6 tools: search, details, compare, alternatives, pricing, categories.
100 calls/day. Free forever.

Docs: toolradar.com/docs
npm: npx toolradar-mcp

What if the next distribution channel isn't SEO or ads — but being the default primitive in an agent's call stack?

#MCP #AI #SaaS #DeveloperTools #Claude #AIAgents

---

## Twitter/X Thread

🧵 We just shipped something that feels like the future of software discovery.

Toolradar MCP: 8,400+ software tools, callable by your AI agents.

Here's the problem and how we're solving it ↓

1/ LLMs have stale training data. They hallucinate pricing, miss new tools, and generate comparison tables with no real data.

Ask Claude "how much does Figma cost?" and you might get a price from 2023.

2/ Toolradar MCP fixes this. It's a free MCP server that gives AI agents instant access to:

→ Verified pricing (checked weekly)
→ G2/Capterra ratings
→ AI-identified alternatives
→ Structured pros, cons, features
→ 8,400+ tools updated daily

3/ Setup takes 2 minutes:

```json
{
  "mcpServers": {
    "toolradar": {
      "command": "npx",
      "args": ["-y", "toolradar-mcp"],
      "env": {
        "TOOLRADAR_API_KEY": "your_key"
      }
    }
  }
}
```

4/ 6 tools your agent can call:

• search_tools — find by keyword, category, pricing
• get_tool — full details on any tool
• compare_tools — side-by-side comparison
• get_alternatives — real competitors
• get_pricing — tier breakdown
• list_categories — browse categories

5/ Free. 100 API calls/day. All 6 tools.

Get your key: toolradar.com/dashboard/api-keys
Docs: toolradar.com/docs
npm: toolradar-mcp

The future of software discovery isn't a website. It's being in the call stack.

---

## Hacker News (Show HN)

Title: Show HN: Toolradar MCP – 8,400 software tools callable by AI agents

Body:
Hey HN,

We built an MCP server that gives AI agents (Claude, Cursor, etc.) access to 8,400+ software tools with structured, verified data.

The problem: LLMs hallucinate pricing, miss new tools, and can't compare options accurately. Their training data is 1-2 years behind.

Our solution: a free MCP server with 6 tools — search, get details, compare, find alternatives, get pricing breakdowns, and list categories. All data is structured JSON, verified weekly, with G2/Capterra ratings.

Setup: add 6 lines to your Claude Desktop config. Free tier: 100 calls/day.

Tech stack: Next.js API routes + standalone MCP server (TypeScript, @modelcontextprotocol/sdk). The MCP server is a thin HTTP client over our REST API.

npm: toolradar-mcp
Docs: https://toolradar.com/docs
Landing: https://toolradar.com/for-agents

Would love feedback on the API design and tool selection.

---

## Reddit r/ClaudeAI

Title: I built an MCP server that gives Claude access to 8,400+ software tools

Body:
Just shipped this — Toolradar MCP lets Claude Desktop (and Claude Code, Cursor, etc.) search, compare, and get pricing for 8,400+ software tools.

Why? Claude's training data is ~1 year behind. It confidently recommends tools that pivoted, quotes outdated prices, and misses new launches. This MCP server gives it access to live, structured data.

**What you can do:**
- "Find the best free project management tools" → ranked results with editorial scores
- "Compare Notion, Clickup, and Asana" → side-by-side with pricing, pros/cons
- "How much does Figma cost?" → actual tier breakdown, verified this week
- "What are the alternatives to Jira?" → AI-identified competitors, not just same-category

**Setup (2 min):**
1. Get a free key at toolradar.com/dashboard/api-keys
2. Add to claude_desktop_config.json:
```json
{
  "mcpServers": {
    "toolradar": {
      "command": "npx",
      "args": ["-y", "toolradar-mcp"],
      "env": { "TOOLRADAR_API_KEY": "your_key" }
    }
  }
}
```

Free: 100 calls/day, all 6 tools. Docs at toolradar.com/docs.

---

## Reddit r/cursor

Title: MCP server for software tool discovery — search 8,400+ tools from Cursor

Body:
Built an MCP server that lets Cursor search, compare, and get pricing for 8,400+ software tools.

Useful when you're building something and need to pick the right tool/API/service — instead of Claude guessing from stale training data, it pulls live data from Toolradar.

Setup in Cursor: Settings > MCP > Add server
- Command: `npx -y toolradar-mcp`
- Env: `TOOLRADAR_API_KEY=your_key`

Get a free key (100 calls/day): toolradar.com/dashboard/api-keys

6 tools: search, details, compare, alternatives, pricing, categories.
