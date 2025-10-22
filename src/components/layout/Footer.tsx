import Link from "next/link";
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-gray-800 rounded-2xl shadow-lg text-white p-6">

      <div className="text-center ">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="ShareLah Logo" width={150} height={40} className="brightness-0 invert" />
        </div>
        <p className="text-gray-300 mb-4">
          Building a more caring Singapore, one umbrella at a time.
        </p>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm">© 2025 ShareLah SG. All rights reserved.</p>
        </div>
      </div>

      <div className="text-white pt-4">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-300">
              For legal purposes, we collect user data such as email and mobile numbers in the event that a user does not return their umbrella on time.
            </p>
          </div>
          <div className="flex gap-x-4 justify-center">
            <Link target="_blank" className="text-sm text-gray-300 underline hover:no-underline" href="https://sharelah.s3-ap-southeast-1.amazonaws.com/privacypolicy.html">
              Privacy Policy
            </Link>
            <Link target="_blank" className="text-sm text-gray-300 underline hover:no-underline" href="https://sharelah.s3-ap-southeast-1.amazonaws.com/termsandcondition.html">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
