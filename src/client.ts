/**
 * Thin client for the Toolradar remote MCP endpoint (https://toolradar.com/api/mcp).
 * Every tool of this stdio server forwards to the same endpoint the hosted connector uses, so both
 * always return the same answers and every server-side improvement reaches npm users without a release.
 * No API key is needed: anonymous calls get 40/day. A free key (POST https://toolradar.com/api/v1/keys,
 * no signup) raises it to 300/day: set TOOLRADAR_API_KEY.
 */

const DEFAULT_MCP_URL = "https://toolradar.com/api/mcp";

export interface ToolResult {
  text: string;
  isError: boolean;
}

export class ToolradarClient {
  private url: string;
  private apiKey: string;
  private userAgent: string;
  private nextId = 1;

  constructor(version = "0.0.0") {
    this.apiKey = process.env.TOOLRADAR_API_KEY || "";
    this.url = process.env.TOOLRADAR_MCP_URL || DEFAULT_MCP_URL;
    // Real version in the UA so server-side usage can segment by client release.
    this.userAgent = `toolradar-mcp/${version}`;
  }

  async callTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        "User-Agent": this.userAgent,
        ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
      },
      body: JSON.stringify({ jsonrpc: "2.0", id: this.nextId++, method: "tools/call", params: { name, arguments: args } }),
      // recommend_tools reads the need and judges the candidates with an LLM server-side: allow headroom.
      signal: AbortSignal.timeout(45000),
    });

    const body = (await response.json().catch(() => null)) as {
      result?: { content?: Array<{ text?: string }>; isError?: boolean };
      error?: { message?: string };
    } | null;
    if (!body) throw new Error(`HTTP ${response.status}`);
    if (body.error) throw new Error(body.error.message || `HTTP ${response.status}`);
    const result = body.result ?? {};
    return { text: result.content?.[0]?.text ?? JSON.stringify(result), isError: !!result.isError };
  }
}
