import { type Breadcrumb, Breadcrumbs } from "@/components/user/Breadcrumb";

export default async function EditWorkoutPage({
  params,
}: {
  params: { username: string };
}) {
  const breadcrumbsArr: Breadcrumb[] = [
    {
      label: params.username,
      href: `/${params.username}`,
    },
    {
      label: "a new workout",
      href: `/${params.username}/create`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbsArr} />
      <p>On this page, you can add a new workout</p>
    </>
  );
}
