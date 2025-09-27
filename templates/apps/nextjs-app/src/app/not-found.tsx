import { Button } from "@workspace/nextjs-shadcn-ui/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="w-full max-w-2xl">
        <Image
          alt="404"
          className="h-full w-full object-cover"
          height={1000}
          src="/images/404.webp"
          width={1000}
        />
      </div>

      <div>
        <Button
          asChild
          className="w-80 cursor-pointer uppercase"
          variant={"outline"}
        >
          <Link href={"/"}>Go Back To Home</Link>
        </Button>
      </div>
    </main>
  );
}
