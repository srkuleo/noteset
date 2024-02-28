import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type Breadcrumb } from "@/util/types";
import { Breadcrumbs } from "@/components/user/Breadcrumbs";
import { CreateForm } from "@/components/user/CreateForm";

export default async function CreateWorkoutPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id as string;

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "workouts",
      href: "/workouts",
    },
    {
      label: "create",
      href: "/workouts/create",
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <CreateForm userId={userId} />
    </>
  );
}
