import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ToolradarClient } from "./client.js";
import { createRequire } from "node:module";

// Single source of truth for the version: package.json. It was hand-copied
// into the handshake, the User-Agent, and the manifests, and the copies had
// already diverged (1.0.0 / 1.0 / 1.0.1 depending on where you looked).
const { version } = createRequire(import.meta.url)("../package.json") as { version: string };

const client = new ToolradarClient(version);

const server = new McpServer({
  name: "toolradar",
  version,
});

// --- Tool 1: search_tools ---
server.tool(
  "search_tools",
  "Search and filter software tools from Toolradar's database of 8,600+ tools. Returns tools with names, descriptions, pricing, scores, and categories.",
  {
    query: z.string().optional().describe("Search query (e.g. 'project management', 'AI writing tool')"),
    category: z.string().optional().describe("Filter by category slug (e.g. 'project-management', 'ai-writing')"),
    pricing: z.enum(["free", "freemium", "paid"]).optional().describe("Filter by pricing model"),
    sort: z.enum(["score", "recent", "rating"]).optional().describe("Sort order: score (editorial rating), recent (newest first), rating (user review rating)"),
    limit: z.number().min(1).max(50).optional().describe("Number of results (default 10, max 50)"),
  },
  async (args) => {
    try {
      const result = await client.searchTools(args);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${(e as Error).message}` }], isError: true };
    }
  }
);

// --- Tool 2: get_tool ---
server.tool(
  "get_tool",
  "Get detailed information about a specific software tool including description, pricing, pros/cons, features, editorial score, review synthesis, and alternatives.",
  {
    slug: z.string().describe("Tool slug (e.g. 'notion', 'linear', 'figma'). Use search_tools first if you don't know the slug."),
  },
  async ({ slug }) => {
    try {
      const result = await client.getTool(slug);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${(e as Error).message}` }], isError: true };
    }
  }
);

// --- Tool 3: compare_tools ---
server.tool(
  "compare_tools",
  "Compare 2 to 4 software tools side by side. Returns structured comparison with pricing, scores, pros/cons, and computed insights (best overall, best value, most reviewed).",
  {
    slugs: z.array(z.string()).min(2).max(4).describe("Array of 2-4 tool slugs to compare (e.g. ['notion', 'clickup', 'asana'])"),
  },
  async ({ slugs }) => {
    try {
      const result = await client.compareTools(slugs);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${(e as Error).message}` }], isError: true };
    }
  }
);

// --- Tool 4: get_alternatives ---
server.tool(
  "get_alternatives",
  "Get alternatives and competitors for a specific software tool. Returns up to 10 alternatives sorted by editorial score.",
  {
    slug: z.string().describe("Tool slug to find alternatives for (e.g. 'jira', 'slack')"),
    limit: z.number().min(1).max(20).optional().describe("Number of alternatives to return (default 10)"),
  },
  async ({ slug, limit }) => {
    try {
      const result = await client.getAlternatives(slug, limit);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${(e as Error).message}` }], isError: true };
    }
  }
);

// --- Tool 5: get_pricing ---
server.tool(
  "get_pricing",
  "Get detailed pricing information for a software tool including tiers, pricing model (free/freemium/paid), free trial availability, and expert pricing verdict.",
  {
    slug: z.string().describe("Tool slug (e.g. 'figma', 'github')"),
  },
  async ({ slug }) => {
    try {
      const result = await client.getPricing(slug);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${(e as Error).message}` }], isError: true };
    }
  }
);

// --- Tool 6: list_categories ---
server.tool(
  "list_categories",
  "List all software categories available on Toolradar with tool counts. Use this to discover valid category slugs for the search_tools filter.",
  {},
  async () => {
    try {
      const result = await client.listCategories();
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${(e as Error).message}` }], isError: true };
    }
  }
);

// --- Prompts: slash commands that chain the tools (v2.0.0) ---
server.prompt(
  "choose-a-tool",
  "Recommend a tool for a described need",
  { need: z.string().describe("What you need, with any constraints (budget, team, integrations)") },
  ({ need }) => ({
    messages: [{ role: "user", content: { type: "text", text: `Using the Toolradar tools, find the best software for this need and justify each pick with its verified pricing and score: ${need}. Search first, then get_pricing on the top candidates.` } }],
  })
);
server.prompt(
  "compare-my-shortlist",
  "Compare 2 to 4 tools you are deciding between",
  { tools: z.string().describe("Comma-separated tool names or slugs") },
  ({ tools }) => ({
    messages: [{ role: "user", content: { type: "text", text: `Compare these tools with compare_tools and tell me which to pick and why: ${tools}.` } }],
  })
);
server.prompt(
  "audit-stack-cost",
  "Estimate what a stack of tools costs",
  { tools: z.string().describe("The tools you use, comma-separated") },
  ({ tools }) => ({
    messages: [{ role: "user", content: { type: "text", text: `For each of these tools, call get_pricing and sum the monthly cost, noting the verification date of each price: ${tools}.` } }],
  })
);
server.prompt(
  "cheaper-alternative",
  "Find a cheaper alternative to a tool",
  { tool: z.string().describe("The tool to replace") },
  ({ tool }) => ({
    messages: [{ role: "user", content: { type: "text", text: `Find cheaper alternatives to ${tool} using get_alternatives, then compare their pricing with get_pricing.` } }],
  })
);

// --- Resources: attach a tool/category/comparison to context (v2.0.0) ---
server.resource(
  "tool-profile",
  new ResourceTemplate("toolradar://tool/{slug}", { list: undefined }),
  async (uri, { slug }) => {
    const result = await client.getTool(String(slug));
    return { contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(result, null, 2) }] };
  }
);
server.resource(
  "category-tools",
  new ResourceTemplate("toolradar://category/{slug}", { list: undefined }),
  async (uri, { slug }) => {
    const result = await client.searchTools({ category: String(slug), limit: 25 });
    return { contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(result, null, 2) }] };
  }
);
server.resource(
  "comparison",
  new ResourceTemplate("toolradar://compare/{slugs}", { list: undefined }),
  async (uri, { slugs }) => {
    const result = await client.compareTools(String(slugs).split("+"));
    return { contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Start server ---
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Failed to start Toolradar MCP server:", error);
  process.exit(1);
});
