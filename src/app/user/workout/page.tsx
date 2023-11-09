import Link from "next/link";

export default function WorkoutPage() {
  return (
    <div className="grow text-center">
      <p className="py-10 text-xl font-semibold">
        This is user`s Workout page!
      </p>
      <Link href="/user" className="text-slate-300">Go back to profile</Link>
    </div>
  );
}
