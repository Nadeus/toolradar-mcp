/**
 * HTTP client for the Toolradar API v1.
 * All tool handlers delegate to this client.
 */

const DEFAULT_API_URL = "https://toolradar.com/api/v1";

export class ToolradarClient {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.TOOLRADAR_API_KEY || "";
    this.apiUrl = process.env.TOOLRADAR_API_URL || DEFAULT_API_URL;

    if (!this.apiKey) {
      console.error(
        "TOOLRADAR_API_KEY is not set. Get your free key at https://toolradar.com/for-agents"
      );
    }
  }

  async get(path: string, params?: Record<string, string>): Promise<unknown> {
    const url = new URL(`${this.apiUrl}${path}`);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== "") {
          url.searchParams.set(key, value);
        }
      }
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "User-Agent": "toolradar-mcp/1.0",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const error = (body as Record<string, string>).error || `HTTP ${response.status}`;
      throw new Error(error);
    }

    return response.json();
  }

  async searchTools(args: {
    query?: string;
    category?: string;
    pricing?: string;
    sort?: string;
    limit?: number;
  }) {
    const params: Record<string, string> = {};
    if (args.query) params.q = args.query;
    if (args.category) params.category = args.category;
    if (args.pricing) params.pricing = args.pricing;
    if (args.sort) params.sort = args.sort;
    if (args.limit) params.limit = String(args.limit);
    return this.get("/search", params);
  }

  async getTool(slug: string) {
    return this.get(`/tools/${encodeURIComponent(slug)}`);
  }

  async compareTools(slugs: string[]) {
    return this.get("/compare", { slugs: slugs.join(",") });
  }

  async getAlternatives(slug: string, limit?: number) {
    const params: Record<string, string> = {};
    if (limit) params.limit = String(limit);
    return this.get(`/alternatives/${encodeURIComponent(slug)}`, params);
  }

  async getPricing(slug: string) {
    return this.get(`/pricing/${encodeURIComponent(slug)}`);
  }

  async listCategories() {
    return this.get("/categories");
  }
}
