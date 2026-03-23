# Publication Checklist

## 1. npm publish

```bash
cd packages/toolradar-mcp
npm login          # login with your npm account
npm publish        # publishes toolradar-mcp@1.0.0
```

Verify: `npx -y toolradar-mcp` should start (and fail with missing API key — that's expected).

## 2. GitHub repo

```bash
# Create repo on GitHub (do this on github.com/new or with gh CLI)
# Repo name: toolradar-mcp
# Visibility: Public
# No README (we have our own)

cd packages/toolradar-mcp
git init
git add .
git commit -m "Initial release — Toolradar MCP server v1.0.0"
git branch -M main
git remote add origin git@github.com:toolradar/toolradar-mcp.git
git push -u origin main
```

## 3. Smithery.ai

1. Go to https://smithery.ai
2. Click "Add a server"
3. Enter GitHub repo URL: `https://github.com/toolradar/toolradar-mcp`
4. The `smithery.yaml` config is already in the repo — Smithery picks it up automatically
5. Description: "Search, compare, and get pricing for 8,400+ software tools. Verified data updated daily."

## 4. mcp.run

1. Go to https://mcp.run
2. Click "Submit MCP Server"
3. Fill in:
   - Name: Toolradar
   - npm package: toolradar-mcp
   - GitHub: https://github.com/toolradar/toolradar-mcp
   - Description: Search, compare, and get pricing for 8,400+ software tools. Verified pricing, G2/Capterra ratings, AI-identified alternatives. Free API — 100 calls/day.
   - Category: Data / Information

## 5. Glama.ai

1. Go to https://glama.ai/mcp/servers
2. Click "Submit Server"
3. GitHub URL: https://github.com/toolradar/toolradar-mcp
4. They auto-extract info from README

## 6. mcp.so

1. Go to https://mcp.so
2. Click "Submit"
3. npm package name: toolradar-mcp
4. Short description: MCP server for software tool discovery. 8,400+ tools with verified pricing, G2 ratings, and real alternatives.

## 7. PulseMCP

1. Go to https://pulsemcp.com
2. Submit form with GitHub URL

## 8. awesome-mcp-servers (GitHub PR)

1. Fork https://github.com/punkpeye/awesome-mcp-servers
2. Add to the appropriate section (Data & Information or Development Tools):
```markdown
- [Toolradar](https://github.com/toolradar/toolradar-mcp) - Search, compare, and get pricing for 8,400+ software tools with verified data.
```
3. Open PR

## Copy-paste descriptions

### Short (1 line)
Search, compare, and get pricing for 8,400+ software tools via MCP.

### Medium (2 lines)
MCP server for Toolradar — search, compare, and get pricing for 8,400+ software tools. Verified pricing, G2/Capterra ratings, AI-identified alternatives. Free API with 100 calls/day.

### Long (paragraph)
Toolradar MCP gives AI agents instant access to 8,400+ software tools with structured, up-to-date data. LLMs hallucinate pricing and miss new tools — Toolradar fixes this with pricing verified weekly, G2/Capterra ratings, high-quality logos, and AI-identified alternatives. Six tools: search, get details, compare side-by-side, find alternatives, get pricing breakdowns, and list categories. Works with Claude Desktop, Claude Code, Cursor, and any MCP client. Free API key with 100 calls/day.

### Tags/Keywords
mcp, software-discovery, ai-agents, tool-comparison, pricing, saas, claude, cursor, developer-tools
