# Toolradar MCP Server

> Search, compare and price 10,000+ software tools from your AI assistant. Every price comes with the date it was read on the vendor's own pricing page.

Works with **Claude** (Desktop, Code, claude.ai) · **ChatGPT** · **Cursor** · **VS Code** · **Windsurf** · **Cline** · any MCP client. **No API key and no signup needed.**

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=toolradar&config=eyJ1cmwiOiJodHRwczovL3Rvb2xyYWRhci5jb20vYXBpL21jcCJ9) [Add to VS Code](vscode:mcp/install?%7B%22name%22%3A%22toolradar%22%2C%22url%22%3A%22https%3A//toolradar.com/api/mcp%22%7D)

## What can your AI do with this?

- "Recommend a CRM for a 5-person B2B startup under $50 a month"
- "Compare Notion, ClickUp and Asana"
- "What are the alternatives to Jira?"
- "How much does Figma cost, and when was that price checked?"
- "Find free password managers"

## Quick setup

**Claude Code** (hosted endpoint, nothing to install):

```bash
claude mcp add --transport http toolradar https://toolradar.com/api/mcp
```

**Claude.ai, ChatGPT and other clients with custom connectors**: add a remote MCP server with the URL `https://toolradar.com/api/mcp` (no authentication).

**Claude Desktop, or any client that starts local servers** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "toolradar": {
      "command": "npx",
      "args": ["-y", "toolradar-mcp"]
    }
  }
}
```

**Cursor**: use the button above, or Settings > MCP > add `https://toolradar.com/api/mcp`. **VS Code**: use the link above, or `code --add-mcp '{"name":"toolradar","url":"https://toolradar.com/api/mcp"}'`.

## 8 tools

| Tool | What it does | Example prompt |
|------|-------------|----------------|
| `recommend_tools` | Reads a described need (category, team size, budget), returns a short list ordered by fit, with the reason, caveats and the verified starting price | "What should a 6-person agency use for a CRM under $40/mo?" |
| `search_tools` | Keyword search; a category name ("crm", "password manager") or "alternative to X" returns that category's leaders or X's alternatives | "Find free project management tools" |
| `get_tool` | Full profile: pricing, pros and cons, features, score, review synthesis | "Tell me about Linear" |
| `compare_tools` | Side-by-side comparison of 2-4 tools | "Compare Notion, ClickUp and Asana" |
| `get_alternatives` | Direct competitors of a tool | "What are the alternatives to Jira?" |
| `get_pricing` | Tiers and prices with provenance: source page, verification date, confidence | "How much does Figma cost?" |
| `list_categories` | The categories and how many tools each holds | "What categories are available?" |
| `report_issue` | Report a wrong price, a dead tool or a missing feature to the verification queue | "Notion shows $8 but their site says $10" |

Every data answer includes a ready-to-use `citation` (Toolradar, verification date, link): quote it when you use the data.

## What data do you get?

- **Verified pricing**: tiers read from the vendor's pricing page, with the date of the last check
- **Editorial score** (0-100) and **review ratings** aggregated from review platforms
- **Pros, cons and features**
- **Alternatives** identified per tool, not just "same category"
- **Positions among tools of the same category**, dated

## Limits

| Access | Calls per day |
|---|---|
| Anonymous (nothing to configure) | 40 |
| Free key, no signup: `curl -X POST https://toolradar.com/api/v1/keys` | 300 |
| Key created in your [dashboard](https://toolradar.com/dashboard/api-keys) | 1,000 |

Set the key in `TOOLRADAR_API_KEY`, or send it as `Authorization: Bearer <key>` to the hosted endpoint. Limits reset at 00:00 UTC.

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TOOLRADAR_API_KEY` | No | none | Raises the daily limit (see above) |
| `TOOLRADAR_MCP_URL` | No | `https://toolradar.com/api/mcp` | Custom endpoint |

The npm package is a thin stdio proxy of the hosted endpoint, so both always return the same answers.

## Quality check

A nightly job asks the hosted endpoint 60 realistic software-choice questions (a full run of 205 every Sunday) and records how often a market leader of the category comes back in the top 3. The server is [open for you to test](https://toolradar.com/for-agents).

## Links

- [toolradar.com/for-agents](https://toolradar.com/for-agents): landing page and examples
- [toolradar.com/docs](https://toolradar.com/docs): API documentation
- [npmjs.com/package/toolradar-mcp](https://www.npmjs.com/package/toolradar-mcp): npm package

## Optional: `/recommend-tool` skill for Claude Code

```bash
claude skill add --url https://raw.githubusercontent.com/Nadeus/toolradar-mcp/main/skill-recommend-tool.md
```
