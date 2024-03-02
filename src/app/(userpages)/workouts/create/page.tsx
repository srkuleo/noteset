import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CreateForm } from "@/components/user/CreateForm";

export default async function CreateWorkoutPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id as string;

  return (
    <>
      <h2 className="pb-6 pt-2 text-2xl font-extrabold text-slate-600 dark:text-white">
        Create a new workout
      </h2>
      <CreateForm userId={userId} />
    </>
  );
}
