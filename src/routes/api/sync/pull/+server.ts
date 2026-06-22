import { json } from "@sveltejs/kit";

export async function GET() {
  return json(
    {
      message: "Sync pull endpoint not implemented yet. Use this as the server contract stub."
    },
    { status: 501 }
  );
}

