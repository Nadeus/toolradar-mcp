# toolradar-mcp

MCP server for [Toolradar](https://toolradar.com) — search, compare, and get pricing for 8,400+ software tools directly from your AI assistant.

LLMs have stale training data. They hallucinate pricing and miss new tools. Toolradar MCP gives your agents access to verified, up-to-date tool intelligence — pricing verified weekly, G2/Capterra ratings, and new tools added daily.

Works with **Claude Desktop**, **Claude Code**, **Cursor**, **Windsurf**, and any MCP-compatible client.

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

## Get an API Key

Sign in and generate a free key (100 calls/day) at **[toolradar.com/dashboard/api-keys](https://toolradar.com/dashboard/api-keys)**.

## Available Tools

| Tool | Description | Example prompt |
|------|-------------|----------------|
| `search_tools` | Search by keyword, category, pricing | "Find free project management tools" |
| `get_tool` | Full details on any tool | "Tell me about Linear" |
| `compare_tools` | Side-by-side comparison of 2-4 tools | "Compare Notion, Clickup, and Asana" |
| `get_alternatives` | Find alternatives to a tool | "What are the alternatives to Jira?" |
| `get_pricing` | Detailed pricing breakdown with tiers | "How much does Figma cost?" |
| `list_categories` | Browse all software categories | "What categories are available?" |

## What You Get

Every response includes structured JSON with:

- **Editorial scores** (0-100) from the Toolradar team
- **Verified pricing** with tier breakdowns (checked weekly)
- **G2 & Capterra ratings** aggregated from review platforms
- **Pros & cons** backed by real user data
- **AI-identified alternatives** (not just category matches)
- **Affiliate tracking URLs** for monetization

## Why Not Just Ask the LLM?

LLMs have a knowledge cutoff — typically 1-2 years behind. They confidently:
- Quote prices that changed 6 months ago
- Recommend tools that no longer exist
- Miss hundreds of new launches
- Generate comparison tables with no real data

Toolradar MCP fixes this with **live, structured data** from 8,400+ tools updated daily.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TOOLRADAR_API_KEY` | Yes | — | Your API key ([get one free](https://toolradar.com/dashboard/api-keys)) |
| `TOOLRADAR_API_URL` | No | `https://toolradar.com/api/v1` | Custom API endpoint |

## REST API

The MCP server is a thin client over our REST API. You can also call it directly:

```bash
curl -H "Authorization: Bearer tr_live_your_key" \
  "https://toolradar.com/api/v1/search?q=project+management&limit=5"
```

Full documentation: **[toolradar.com/docs](https://toolradar.com/docs)**

## Rate Limits

Free tier: **100 API calls/day** across all tools. Resets at midnight UTC. Need more? [Contact us](https://toolradar.com/contact).

## Links

- [Landing page](https://toolradar.com/for-agents) — overview and setup guide
- [API Documentation](https://toolradar.com/docs) — full endpoint reference
- [Dashboard](https://toolradar.com/dashboard/api-keys) — manage your API keys
- [Toolradar](https://toolradar.com) — browse 8,400+ software tools

## License

MIT
