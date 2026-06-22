import { json } from "@sveltejs/kit";

export function GET() {
  return json({
    ok: true,
    service: "readykit",
    timestamp: new Date().toISOString()
  });
}

