import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <p>Hey, login now!</p>
      <Link href='/' className='bg-slate-600 dark:bg-slate-500'>
        Return to Home page
      </Link>
    </div>
  );
}
