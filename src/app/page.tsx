import Image from 'next/image'
import { AppStoreButtons } from '@/components/store-buttons'
import { MapPin, Smartphone, Umbrella, Wallet, Cloudy, Repeat, Bluetooth, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: <MapPin size={32} className="mb-4 text-primary" />,
    title: "500+ Stations Islandwide",
    description: "Available at all major MRT stations across Singapore.",
  },
  {
    icon: <Wallet size={32} className="mb-4 text-primary" />,
    title: "Easy Payment",
    description: "Pay with credits, top up anytime through the app.",
  },
  {
    icon: <Repeat size={32} className="mb-4 text-primary" />,
    title: "Flexible Returns",
    description: "Return at any station, any time within 24 hours.",
  },
  {
    icon: <Cloudy size={32} className="mb-4 text-primary" />,
    title: "Weather Smart",
    description: "Real-time weather updates to help you plan ahead.",
  },
]

const howToUseSteps = [
  {
    icon: <Download size={48} className="mb-4 text-primary" />,
    title: "Download App",
    description: "Get the Sharelah app from App Store or Google Play Store.",
  },
  {
    icon: <Bluetooth size={48} className="mb-4 text-primary" />,
    title: "Enable Bluetooth",
    description: "Enable Bluetooth to search for nearby stalls.",
  },
  {
    icon: <Umbrella size={48} className="mb-4 text-primary" />,
    title: "Take Umbrella",
    description: "Umbrella unlocks automatically after successful scan.",
  },
  {
    icon: <Repeat size={48} className="mb-4 text-primary" />,
    title: "Return Anywhere",
    description: "Return to any Sharelah station within 2 business days.",
  },
]

export default function Home() {
  return (
    <main className="flex-1">
      <section id="home" className="w-full py-20 md:py-32 lg:py-40 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Image src="/logo.png" alt="Sharelah Logo" width={350} height={60} className="mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Singapore&apos;s First Automated Umbrella Sharing Service
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-8">
            Making rainy days hassle-free for everyone. Register once, rent an umbrella anywhere, anytime.
          </p>
          <AppStoreButtons />
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Sharelah</h2>
            <p className="mx-auto max-w-3xl text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Sharelah is an umbrella-sharing service that aims to spread a spirit of sharing within the community. We are Singapore&apos;s first automated umbrella sharing service, making rainy days hassle-free for everyone.
            </p>
          </div>
        </div>
      </section>

      <section id="how-to-use" className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-10 md:text-4xl">How to Use</h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {howToUseSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold text-gray-300 dark:text-gray-700 mr-4">0{index + 1}</span>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="w-full py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">$0</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Per Hour Rental</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">$2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">One-Time Registration Fee</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Service Availability</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}

export function generateMetadata() {
  return {
    title: 'ShareLah - Automated Umbrella Sharing Service',
    description: 'Singapore\'s first automated umbrella sharing service, making rainy days hassle-free for everyone.',
  }
}