import { ModeButton } from "@/components/client-buttons";
import { GitHubButton } from "@/components/server-buttons";
import Link from "next/link";

export default function Home() {
  return (
    <main className='min-h-screen p-4'>
      <div className='flex gap-4 justify-end mb-56 border-b pb-4 dark:border-slate-700'>
        <ModeButton />
        <GitHubButton />
      </div>
      <div className='space-y-8 rounded-lg shadow-sm'>
        <h1 className='text-5xl pl-8 text-green-600 font-bold'>
          Note<span className='text-slate-500 font-semibold'>Set</span>
        </h1>
        <h2 className='pl-4 font-semibold text-slate-400 dark:text-slate-500/90'>
          Application aimed to replace conventional use of a notebook in a gym.
        </h2>
        <div className='flex justify-evenly'>
          <Link href='/login'>Login</Link>
          <Link href='/sign-up'>Sign Up</Link>
        </div>
      </div>
    </main>
  );
}
