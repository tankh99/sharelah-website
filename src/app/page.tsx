import Image from 'next/image'
import { Section } from '@/components/Section'
import { AppStoreButtons } from '@/components/store-buttons'
import { NewsFeed } from "@/components/news/NewsFeed";

export default function Home() {
  
  return (
    <main className="">
      <section id="home" className='w-full h-[80vh] px-24 flex flex-col items-center justify-center'>
        <Image src="/logo.png" alt="Sharelah Logo" width={300} height={50} className='mb-12' />
        <h1 className='text-3xl mb-6 text-center'>An Umbrella-Sharing Service for Everyone</h1>
        <p className='text-center'>Register once, rent an umbrella anywhere, anytime, completely free </p>
        <AppStoreButtons/>
      </section>

      <section id="about" className='px-36 pb-12'>
        <h2 className='text-2xl font-bold text-center mb-6'>About Us</h2>
        <p>
          ShareLah is an umbrella-sharing service that aims to spread a spirit of sharing within the community. 
          <br/><br/>
          To use it, simply download our mobile app, pay a one-time fee of $2 and rent an umbrella from any of our available kiosks for completely free as long as you return within 48 hours.
        </p>
      </section>

      <section id="how-to-use" className='px-36 pb-12 bg-gray-100 py-12'>
        <h2 className='text-2xl font-bold text-center mb-6'>How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-bold text-xl mb-2">1. Download the App</h3>
            <p>Get the ShareLah app from the App Store or Google Play.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">2. Register</h3>
            <p>Sign up with your mobile number and pay a one-time, refundable deposit of $2.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">3. Scan and Go</h3>
            <p>Scan the QR code at any kiosk to rent an umbrella. Return it within 48 hours to any of our locations.</p>
          </div>
        </div>
      </section>

      <section id="latest-news" className='px-36 pb-12 py-12'>
        <h2 className='text-2xl font-bold text-center mb-6'>Latest News and Updates</h2>
        <NewsFeed />
      </section>
      
      <section id="download" className='px-36 pb-12 bg-gray-100 py-12'>
        <h2 className='text-2xl font-bold text-center mb-6'>Download Our App</h2>
        <div className="flex justify-center">
          <AppStoreButtons />
        </div>
      </section>

      <div className='bg-blue-950 text-white w-full px-24 py-12 text-center'>
        <p className='text-sm mb-4'>
          For legal purposes, we collect user data such as email and mobile numbers in the event of that a user does not return their umbrella on time. 
        </p>
        <p className='flex gap-x-4 justify-center'>
          <a target='_blank' className='text-sm underline hover:no-underline' href="https://sharelah.s3-ap-southeast-1.amazonaws.com/privacypolicy.html">Privacy Policy</a>
          <a target='_blank' className='text-sm underline hover:no-underline' href="https://sharelah.s3-ap-southeast-1.amazonaws.com/termsandcondition.html">Terms of Service</a>
        </p>
      </div>
    </main>
  )
}

export function generateMetadata() {
  return {
    title: 'ShareLah',
    description: 'An umbrella-sharing service for everyone',
  }
}