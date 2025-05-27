import { incrementViews } from "@/db/locations";
import { getAuth0Client } from "@/lib/auth0";
import { NextRequest } from "next/server";

interface IncrementViewsPayload {
  markerId: number;
}

export async function POST(request: NextRequest) {
  const session = await getAuth0Client().getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body: IncrementViewsPayload = await request.json();

  if (!body.markerId || typeof body.markerId !== 'number') {
    return new Response("Invalid markerId", { status: 400 });
  }

  try {
    await incrementViews(body.markerId);
    return new Response("Views incremented", { status: 200 });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return new Response("Failed to increment views", { status: 500 });
  }
}
