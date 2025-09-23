import Image from 'next/image'
import { AppStoreButtons } from '@/components/store-buttons'
import { MapPin, Smartphone, Umbrella, Wallet, Cloudy, Repeat, Bluetooth, Download, CheckCircle, CreditCard, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: <MapPin size={32} className="text-white" />,
    title: "500+ Stations Islandwide",
    description: "Available at all major MRT stations across Singapore.",
  },
  {
    icon: <Wallet size={32} className="text-white" />,
    title: "Easy Payment",
    description: "Pay with credits, top up anytime through the app.",
  },
  {
    icon: <Repeat size={32} className="text-white" />,
    title: "Flexible Returns",
    description: "Return at any station, any time within 24 hours.",
  },
  {
    icon: <Cloudy size={32} className="text-white" />,
    title: "Weather Smart",
    description: "Real-time weather updates to help you plan ahead.",
  },
]

const howToUseSteps = [
  {
    icon: <Download size={48} className="text-white p-2" />,
    title: "Download App",
    description: "Get the Sharelah app from App Store or Google Play Store.",
  },
  {
    icon: <Bluetooth size={48} className="text-white p-2" />,
    title: "Enable Bluetooth",
    description: "Enable Bluetooth to search for nearby stalls.",
  },
  {
    icon: <Umbrella size={48} className="text-white p-2" />,
    title: "Take Umbrella",
    description: "Umbrella unlocks automatically after successful scan.",
  },
  {
    icon: <Repeat size={48} className="text-white p-2" />,
    title: "Return Anywhere",
    description: "Return to any Sharelah station within 2 business days.",
  },
]

export default function Home() {
  return (
    <main className="">
      <section id="home" className="w-full py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center flex flex-col items-center justify-center">
          <Image src="/logo.png" alt="Sharelah Logo" width={350} height={60} className="mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Together, We Stay Dry
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
            Making rainy days hassle-free for everyone. Register once and rent an umbrella anywhere, anytime, for no additional fees.
          </p>
          <AppStoreButtons />
        </div>
      </section>
      <section id="about" className="w-full py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900 mb-4">
              About <span className="text-primary">Share</span><span className="text-accent">lah</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sharelah is an umbrella-sharing service that aims to spread a spirit of sharing within the community. We are Singapore&apos;s first automated umbrella sharing service, making rainy days hassle-free for everyone.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <Image
                width={500}
                height={400}
                src="/umbrella-station.jpg" 
                alt="Sharelah Station" 
                className="rounded-2xl shadow-lg w-full object-contain bg-white"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary to-accent rounded-xl p-4 shadow-lg">
                <p className="font-bold text-2xl text-white">500+</p>
                <p className="text-sm text-white/80">Stations Islandwide</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-primary rounded-lg flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-to-use" className="w-full py-12 md:py-20 bg-gradient-to-br from-blue-50 to-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-4 md:text-4xl">How to Use</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in 4 simple steps
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howToUseSteps.map((step, index) => (
              <div 
                key={index}
                className="relative group"
              >
                {/* Connection Line */}
                {index < howToUseSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
                
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:-translate-y-1 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-gray-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section id="pricing" className="w-full py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center flex flex-col justify-center bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-green-600">$0</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-green-700">Per Hour Rental</p>
              </CardContent>
            </Card>
            <Card className="text-center flex flex-col justify-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-blue-600">$2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-blue-700">One-Time Registration Fee</p>
              </CardContent>
            </Card>
            <Card className="text-center flex flex-col justify-center bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-orange-600">24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-orange-700">Service Availability</p>
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