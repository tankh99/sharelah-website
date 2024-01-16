'use client';

import Image from "next/image";
import PlayStoreBadge from '../../public/google-play-badge.png'
import AppStoreBadge from '../../public/app-store-badge.svg'
import Link from "next/link";

export const AppStoreButtons = () => {
  const APP_STORE_URL = "https://apps.apple.com/sg/app/sharelah/id1504054992"
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.ShareLah"
  return (
    <div className='flex flex-row items-center gap-x-2 mt-4'>
      <Link target='_blank' href={APP_STORE_URL}>
        <Image src={AppStoreBadge} alt="App Store Badge" width={120} height={50} className='' />
      </Link>
      <Link target='_blank' href={PLAY_STORE_URL}>
        <Image src={PlayStoreBadge} alt="Google Play Badge" width={150} height={50} className='' />
      </Link>
    </div>
  )
}