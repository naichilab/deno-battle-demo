import { Server } from "https://deno.land/std@0.156.0/http/server.ts";
import * as flags from "https://deno.land/std@0.156.0/flags/mod.ts";

const DEFAULT_PORT = 8080;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

console.log(Deno.args);

if (isNaN(port)) {
  console.error('Port is not a number.');
  Deno.exit(1);
}

console.log(`port number is ${port}`);

const handler = (request: Request) => {
  const body = `Your user-agent is:\n\n${request.headers.get(
   "user-agent",
  ) ?? "Unknown"}`;

  return new Response(body, {status: 200});
}

const server = new Server({port, handler});

console.log(`server listening on http://localhost:${port}`);
await server.listenAndServe();