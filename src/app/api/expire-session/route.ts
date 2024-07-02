import { lucia } from "@/util/lucia";

export async function GET() {
  await lucia.deleteExpiredSessions();

  return new Response("Expired sessions removed from database");
}
