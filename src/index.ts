import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ToolradarClient } from "./client.js";

const client = new ToolradarClient();

const server = new McpServer({
  name: "toolradar",
  version: "1.0.0",
});

// --- Tool 1: search_tools ---
server.tool(
  "search_tools",
  "Search and filter software tools from Toolradar's database of 8,600+ tools. Returns tools with names, descriptions, pricing, scores, and categories.",
  {
    query: z.string().optional().describe("Search query (e.g. 'project management', 'AI writing tool')"),
    category: z.string().optional().describe("Filter by category slug (e.g. 'project-management', 'ai-writing')"),
    pricing: z.enum(["free", "freemium", "paid"]).optional().describe("Filter by pricing model"),
    sort: z.enum(["score", "recent", "trending"]).optional().describe("Sort order: score (editorial rating), recent (newest), trending (most upvotes this week)"),
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

// --- Start server ---
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Failed to start Toolradar MCP server:", error);
  process.exit(1);
});
