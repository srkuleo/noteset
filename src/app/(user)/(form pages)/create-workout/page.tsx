import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { CreateWorkoutForm } from "@/components/user/CreateWorkoutForm";

export default async function CreateWorkoutPage() {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  return <CreateWorkoutForm />;
}
