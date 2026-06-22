import { json } from "@sveltejs/kit";

export async function POST() {
  return json(
    {
      message: "Sync push endpoint not implemented yet. Use this as the server contract stub."
    },
    { status: 501 }
  );
}

