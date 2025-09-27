import { Button } from '@workspace/nextjs-shadcn-ui/ui/button';
import Link from 'next/link';
import SwitchThemeButton from '@/components/switch-theme-button';

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-1 py-10">
      <h1 className="font-bold text-2xl">Hi! 👋 </h1>
      <p>Welcome to Nextjs App.</p>

      <div className="flex items-center gap-2">
        <Button asChild>
          <Link
            href={'https://stepasidelil.vercel.app/projects/little-proj'}
            target="_blank"
          >
            Read Docs and Start Coding
          </Link>
        </Button>
        <SwitchThemeButton />
      </div>
    </main>
  );
}
