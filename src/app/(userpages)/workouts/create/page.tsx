import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { CreateWorkoutForm } from "@/components/user/CreateWorkoutForm";

export default async function CreateWorkoutPage() {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  return <CreateWorkoutForm userId={user.id} />;
}
