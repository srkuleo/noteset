import { ModeButton } from "@/components/client-buttons";
import { GitHubButton } from "@/components/server-buttons";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex gap-4'>
        <GitHubButton />
        <ModeButton />
      </div>
    </main>
  );
}
