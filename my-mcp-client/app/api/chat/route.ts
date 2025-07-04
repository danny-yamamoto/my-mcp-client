import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { experimental_createMCPClient as createMCPClient } from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export async function POST(req: Request) {
  const url = new URL("http://localhost:3001/mcp");
  const mcpClient = await createMCPClient({
    transport: new StreamableHTTPClientTransport(url, {
      sessionId: "my-session-id",
    }),
  });
  const { messages } = await req.json();

  const tools = await mcpClient.tools();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages,
    tools,
    onFinish: () => {
      mcpClient.close();
    },
  });

  return result.toDataStreamResponse();
}
