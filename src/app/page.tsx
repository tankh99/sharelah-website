'use client';

import Image from 'next/image'
import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { AppStoreButton, GooglePlayButton } from 'react-mobile-app-button'
import Link from 'next/link';
import { FaApple } from "react-icons/fa";

export default function Home() {
  const APP_STORE_URL = "https://apps.apple.com/sg/app/sharelah/id1504054992"
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.ShareLah"
  return (
    <main className="pb-12">
      <div className='w-full h-[80vh] px-24 flex flex-col items-center justify-center'>
        <Image src="/logo.png" alt="Sharelah Logo" width={300} height={50} className='mb-12' />
        <h1 className='text-3xl mb-6 text-center'>An Umbrella-Sharing Service for Everyone</h1>
        <p className='text-center'>Register once, rent an umbrella anywhere, anytime, completely free </p>
        <div className='flex flex-row items-center gap-x-2 mt-4'>
          <Link target='_blank' href={APP_STORE_URL}>
            <Image src="/app-store-badge.svg" alt="App Store Badge" width={120} height={50} className='' />
          </Link>
          <Link target='_blank' href={PLAY_STORE_URL}>
            <Image src="/google-play-badge.png" alt="Google Play Badge" width={150} height={50} className='' />
          </Link>
        </div>
      </div>
      <div className='px-36'>
        {/* About sectio */}
        <Section>
          <Header>About Us</Header>
          <p>
            ShareLah is an umbrella-sharing service that aims to spread a spirit of sharing within the community. 
            <br/><br/>
            To use it, simply download our mobile app, pay a one-time fee of $2 and rent an umbrella from any of our available kiosks for completely free as long as you return within 48 hours.
          </p>
        </Section>
        <Section>
          <Header>Data Collection</Header>
          <p>
            For legal purposes, we collect user data such as email and mobile numbers in the event of that a user does not return their umbrella on time. 
          </p>
        </Section>
      </div>
    </main>
  )
}
