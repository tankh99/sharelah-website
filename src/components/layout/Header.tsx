import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <Image src="/logo.png" alt="Sharelah Logo" width={120} height={30} />
        <span className="sr-only">ShareLah</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#home"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#how-to-use"
        >
          How to Use
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#latest-news"
        >
          Latest News
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#download"
        >
          Download
        </Link>
      </nav>
    </header>
  );
}
