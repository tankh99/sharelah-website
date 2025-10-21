import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-[var(--color-primary)] shadow-sm fixed top-0 left-0 right-0 z-50">
      <Link className="flex items-center justify-center" href="#">
        <Image src="/logo.png" alt="Sharelah Logo" width={120} height={30} />
        <span className="sr-only">ShareLah</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="#home"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="#how-it-works"
        >
          How It Works
        </Link>
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="#pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="#stalls"
        >
          Stalls
        </Link>
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="#articles"
        >
          Articles
        </Link>
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="#contact"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
