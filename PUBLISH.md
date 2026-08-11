# Publication Checklist

> The GitHub repo is `https://github.com/Nadeus/toolradar-mcp` (personal
> account, NOT a `toolradar` org — none exists). The MCP registry namespace is
> `io.github.Nadeus/toolradar` and the registry's permission check is
> CASE-SENSITIVE on the GitHub login, so `Nadeus` must keep its capital N in
> `server.json` and in `package.json`'s `mcpName`.

## Release order (matters)

1. Bump `version` in `package.json` AND in both `version` fields of
   `server.json` (top-level + `packages[0]`). The server code and User-Agent
   read the version from `package.json` at runtime — nothing else to edit.
2. Commit + push to `Nadeus/toolradar-mcp`.
3. `npm publish` — MUST run before the registry publish, because the MCP
   registry validates that the exact npm version exists AND that its published
   `package.json` carries a matching `mcpName`. (`prepublishOnly` rebuilds
   `dist/` automatically; never publish a hand-edited `dist/`.)
4. MCP registry publish (step below).
5. Update the version pin in the live blog post
   `mcp-server-security-best-practices` (it recommends pinning
   `toolradar-mcp@<version>` as a security practice, so it must move with each
   release). DB content update: `.sql` file → scp → psql, per CLAUDE.md rules.

## 1. npm publish

```bash
cd packages/toolradar-mcp
npm login          # login with your npm account
npm publish
```

Verify: `npx -y toolradar-mcp@latest` should start (and warn about the missing
API key — that's expected).

## 2. Official MCP registry (registry.modelcontextprotocol.io)

```bash
cd packages/toolradar-mcp
# Install the publisher CLI if needed:
brew install mcp-publisher   # or: go install github.com/modelcontextprotocol/registry/cmd/publisher@latest
mcp-publisher login github   # authenticates as Nadeus
mcp-publisher publish        # reads server.json
```

Verify: `curl -s "https://registry.modelcontextprotocol.io/v0/servers?search=toolradar"`.

## 3. Smithery.ai

1. Go to https://smithery.ai
2. Click "Add a server"
3. Enter GitHub repo URL: `https://github.com/Nadeus/toolradar-mcp`
4. The `smithery.yaml` config is already in the repo — Smithery picks it up automatically
5. Description: "Search, compare, and get pricing for 8,600+ software tools. Verified data updated daily."

## 4. mcp.run

1. Go to https://mcp.run
2. Click "Submit MCP Server"
3. Fill in:
   - Name: Toolradar
   - npm package: toolradar-mcp
   - GitHub: https://github.com/Nadeus/toolradar-mcp
   - Description: Search, compare, and get pricing for 8,600+ software tools. Verified pricing, G2/Capterra ratings, AI-identified alternatives. Free API — 100 calls/day.
   - Category: Data / Information

## 5. Glama.ai

1. Go to https://glama.ai/mcp/servers
2. Click "Submit Server"
3. GitHub URL: https://github.com/Nadeus/toolradar-mcp
4. They auto-extract info from README

## 6. mcp.so

1. Go to https://mcp.so
2. Click "Submit"
3. npm package name: toolradar-mcp
4. Short description: MCP server for software tool discovery. 8,600+ tools with verified pricing, G2 ratings, and real alternatives.

## 7. PulseMCP

1. Go to https://pulsemcp.com
2. Submit form with GitHub URL

## 8. awesome-mcp-servers (GitHub PR)

1. Fork https://github.com/punkpeye/awesome-mcp-servers
2. Add to the appropriate section (Data & Information or Development Tools):
```markdown
- [Toolradar](https://github.com/Nadeus/toolradar-mcp) - Search, compare, and get pricing for 8,600+ software tools with verified data.
```
3. Open PR

## Copy-paste descriptions

### Short (1 line)
Search, compare, and get pricing for 8,600+ software tools via MCP.

### Medium (2 lines)
MCP server for Toolradar — search, compare, and get pricing for 8,600+ software tools. Verified pricing, G2/Capterra ratings, AI-identified alternatives. Free API with 100 calls/day.

### Long (paragraph)
Toolradar MCP gives AI agents instant access to 8,600+ software tools with structured, up-to-date data. LLMs hallucinate pricing and miss new tools — Toolradar fixes this with pricing verified weekly, G2/Capterra ratings, high-quality logos, and AI-identified alternatives. Six tools: search, get details, compare side-by-side, find alternatives, get pricing breakdowns, and list categories. Works with Claude Desktop, Claude Code, Cursor, and any MCP client. Free API key with 100 calls/day.

### Tags/Keywords
mcp, software-discovery, ai-agents, tool-comparison, pricing, saas, claude, cursor, developer-tools
