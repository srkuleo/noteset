import { deleteExpiredSessions } from "@/util/session"

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  const res = await deleteExpiredSessions()

  return new Response(res, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
