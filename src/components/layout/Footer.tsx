import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            For legal purposes, we collect user data such as email and mobile numbers in the event that a user does not return their umbrella on time.
          </p>
        </div>
        <div className="flex gap-x-4 justify-center">
          <Link target="_blank" className="text-sm underline hover:no-underline" href="https://sharelah.s3-ap-southeast-1.amazonaws.com/privacypolicy.html">
            Privacy Policy
          </Link>
          <Link target="_blank" className="text-sm underline hover:no-underline" href="https://sharelah.s3-ap-southeast-1.amazonaws.com/termsandcondition.html">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
