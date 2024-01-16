import Image from 'next/image'
import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { AppStoreButton, GooglePlayButton } from 'react-mobile-app-button'
import Link from 'next/link';
import { FaApple } from "react-icons/fa";
import { AppStoreButtons } from '@/components/store-buttons'
import Head from 'next/head'

export default function Home() {
  
  return (
    <main className="">
      <div className='w-full h-[80vh] px-24 flex flex-col items-center justify-center'>
        <Image src="/logo.png" alt="Sharelah Logo" width={300} height={50} className='mb-12' />
        <h1 className='text-3xl mb-6 text-center'>An Umbrella-Sharing Service for Everyone</h1>
        <p className='text-center'>Register once, rent an umbrella anywhere, anytime, completely free </p>
        <AppStoreButtons/>
      </div>
      <div className='px-36 pb-12'>
        {/* About sectio */}
        <Section>
          <Header>About Us</Header>
          <p>
            ShareLah is an umbrella-sharing service that aims to spread a spirit of sharing within the community. 
            <br/><br/>
            To use it, simply download our mobile app, pay a one-time fee of $2 and rent an umbrella from any of our available kiosks for completely free as long as you return within 48 hours.
          </p>
        </Section>
        {/* Contact Section */}
        <Section>
          <Header>Contact Us</Header>
          <p>
            For general enquiries, please email us at <a className='text-primary hover:underline' href="mailto:info@sharelah-sg.com">info@sharelah-sg.com </a> 
            or contact us directly at +65 8838 7524
          </p>
        </Section>

        </div>
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
    link: 
  }
}