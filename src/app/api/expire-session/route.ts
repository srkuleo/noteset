import { deleteExpiredSessions } from "@/util/session";

export async function GET() {
  await deleteExpiredSessions();

  return new Response("Expired sessions removed from database");
}
