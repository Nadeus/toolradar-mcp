# Toolradar MCP Server

> Give your AI agent access to 8,400+ software tools — search, compare, get pricing, find alternatives, and discover the best tool for any use case.

**An MCP server that helps AI assistants recommend software tools with real, verified data instead of hallucinated answers.**

LLMs confidently quote outdated pricing, miss new tools, and generate comparison tables with no real data. This MCP server connects your agent to Toolradar's live database: pricing verified weekly, G2/Capterra ratings, editorial scores, and new tools added daily.

Works with **Claude Desktop** · **Claude Code** · **Cursor** · **Windsurf** · **Cline** · any MCP client

## What can your AI do with this?

Ask your AI assistant things like:

- "Find the best free project management tools"
- "Compare Notion, Clickup, and Asana"
- "What are the alternatives to Jira?"
- "How much does Figma cost?"
- "Recommend a CRM for a 5-person startup under $50/month"
- "Show me AI writing tools with a free tier"

Your agent calls Toolradar's tools behind the scenes and returns structured, accurate answers.

## Quick Setup

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "toolradar": {
      "command": "npx",
      "args": ["-y", "toolradar-mcp"],
      "env": {
        "TOOLRADAR_API_KEY": "your_key_here"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add toolradar -- npx -y toolradar-mcp
```

### Cursor

In Cursor Settings > MCP, add a new server:
```
Name: toolradar
Command: npx -y toolradar-mcp
Environment: TOOLRADAR_API_KEY=your_key_here
```

### Windsurf / Cline / Other MCP Clients

```bash
TOOLRADAR_API_KEY=your_key npx -y toolradar-mcp
```

## Get an API Key

Sign in and generate a free key (100 calls/day) at **[toolradar.com/dashboard/api-keys](https://toolradar.com/dashboard/api-keys)**.

## 6 MCP Tools

| Tool | What it does | Example prompt |
|------|-------------|----------------|
| `search_tools` | Search by keyword, category, pricing model | "Find free project management tools" |
| `get_tool` | Full details: pricing, pros/cons, features, score | "Tell me about Linear" |
| `compare_tools` | Side-by-side comparison of 2-4 tools | "Compare Notion, Clickup, and Asana" |
| `get_alternatives` | Find real competitors to any tool | "What are the alternatives to Jira?" |
| `get_pricing` | Detailed pricing with all tiers and features | "How much does Figma cost?" |
| `list_categories` | Browse all software categories | "What categories are available?" |

## What data do you get?

Every tool in the database includes:

- **Editorial scores** (0-100) — manually rated by the Toolradar team
- **Verified pricing** — tiers, plans, and prices checked every week
- **G2 & Capterra ratings** — aggregated from major review platforms
- **Pros & cons** — based on real user data
- **TL;DR** — 3-bullet summary of what the tool does
- **Features list** — structured, not freeform text
- **AI-identified alternatives** — real competitors, not just "same category"
- **Funding data** — latest fundraising rounds and acquisitions via Signalbase

## Why not just ask the LLM?

| Problem | Without Toolradar | With Toolradar |
|---------|-------------------|----------------|
| Pricing | Hallucinated from 2023 training data | Verified this week |
| New tools | Misses anything launched in the last year | Updated daily (Product Hunt, HN, Techpresso) |
| Comparisons | Generic tables with no real data | Structured with scores, pricing, pros/cons |
| Alternatives | "Same category" guesses | AI-identified direct competitors |
| Ratings | None or fabricated | Real G2/Capterra/Trustpilot aggregation |

## Bonus: `/recommend-tool` Skill for Claude Code

A ready-made skill that turns Toolradar into a structured recommendation engine:

```bash
# Install the skill
claude skill add --url https://raw.githubusercontent.com/Nadeus/toolradar-mcp/main/skill-recommend-tool.md

# Use it
/recommend-tool "best free CRM for a 5-person startup"
```

It searches, compares the top 3, and gives a formatted recommendation with top pick + runner-up + budget pick.

## REST API

The MCP server is a thin client over our REST API. Call it directly from any language:

```bash
curl -H "Authorization: Bearer tr_live_your_key" \
  "https://toolradar.com/api/v1/search?q=project+management&limit=5"
```

Full docs: **[toolradar.com/docs](https://toolradar.com/docs)**

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TOOLRADAR_API_KEY` | Yes | — | Your API key ([get one free](https://toolradar.com/dashboard/api-keys)) |
| `TOOLRADAR_API_URL` | No | `https://toolradar.com/api/v1` | Custom API endpoint |

## Rate Limits

Free tier: **100 API calls/day**. Resets at midnight UTC. Need more? [Contact us](https://toolradar.com/contact).

## Links

- [toolradar.com/for-agents](https://toolradar.com/for-agents) — Landing page
- [toolradar.com/docs](https://toolradar.com/docs) — API documentation
- [toolradar.com/dashboard/api-keys](https://toolradar.com/dashboard/api-keys) — Get your API key
- [npmjs.com/package/toolradar-mcp](https://www.npmjs.com/package/toolradar-mcp) — npm package

## Keywords

MCP server, software tools, SaaS comparison, tool recommendation, AI agent, Claude MCP, Cursor MCP, software discovery, find best tool, compare tools, pricing lookup, G2 ratings, Capterra ratings, software alternatives, developer tools, product comparison, tool finder, software recommendation engine

## License

MIT
