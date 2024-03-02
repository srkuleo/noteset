import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CreateForm } from "@/components/user/CreateForm";

export default async function CreateWorkoutPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id as string;


  return (
    <>
      <p className="text-2xl font-bold font-manrope leading-none pt-2 pb-6">
        Create a new workout
      </p>
      <CreateForm userId={userId} />
    </>
  );
}
