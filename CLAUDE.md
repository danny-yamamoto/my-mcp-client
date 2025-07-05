# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a dual Next.js application setup demonstrating Model Context Protocol (MCP) integration:

- **my-mcp-client/**: Next.js frontend application that consumes MCP tools
- **my-mcp-server/**: Next.js backend application that provides MCP server functionality

## Development Commands

### Client Application (my-mcp-client/)
```bash
cd my-mcp-client
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Server Application (my-mcp-server/)
```bash
cd my-mcp-server
npm run dev          # Start development server on port 3001 with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture Overview

### MCP Client (my-mcp-client/)
- **Technology Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **AI Integration**: Uses Google Gemini 2.0 Flash model via @ai-sdk/google
- **MCP Integration**: Connects to MCP server via StreamableHTTPClientTransport
- **Key File**: `app/api/chat/route.ts` - API route that handles chat requests and integrates with MCP tools

### MCP Server (my-mcp-server/)
- **Technology Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **MCP Framework**: Uses @vercel/mcp-adapter for MCP server implementation
- **Key File**: `app/[transport]/route.ts` - Dynamic route handler that provides MCP tools
- **Current Tools**: Basic dice roll tool (commented out HR system tools available)

### Data Flow
1. User interacts with chat interface in client app
2. Client sends request to `/api/chat` endpoint
3. Chat API creates MCP client connection to server at `http://localhost:3001/mcp`
4. Server provides available tools via MCP protocol
5. AI model can execute tools and return results to user

## Key Integration Points

### Client-Server Communication
- Client connects to server via MCP over HTTP on port 3001
- Session management with configurable session IDs
- Tool discovery and execution through MCP protocol

### Environment Variables
- `GOOGLE_GENERATIVE_AI_API_KEY`: Required for Google Gemini API access
- `HR_API_BASE_URL`: Base URL for HR system API (server-side)
- `HR_API_KEY`: API key for HR system authentication (server-side)

## HR System Integration (Available but Commented)

The MCP server includes a comprehensive HR system integration with three main tools:
- `get_employee`: Retrieve employee details by ID
- `search_employees`: Search employees by name or department
- `get_team_members`: Get team members by department ID

The HR integration includes fallback mock data when API is unavailable.

## Development Notes

### Running Both Applications
1. Start MCP server: `cd my-mcp-server && npm run dev`
2. Start client: `cd my-mcp-client && npm run dev`
3. Access client at http://localhost:3000
4. Client automatically connects to server at http://localhost:3001/mcp

### Tool Development
- Add new MCP tools in `my-mcp-server/app/[transport]/route.ts`
- Tools are automatically discovered by the client
- Use Zod schemas for input validation
- Return content in MCP format with `type: "text"` and `text` property

### Frontend Development
- Chat interface uses @ai-sdk/react's `useChat` hook
- Messages support multi-part content structure
- UI built with Tailwind CSS and responsive design