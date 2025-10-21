'use client';

import Image from 'next/image'
import { AppStoreButtons } from '@/components/store-buttons'
import { MapPin, Smartphone, Umbrella, Wallet, Cloudy, Repeat, Bluetooth, Download, CheckCircle, CreditCard, Clock, Store, Bus, Building, Wifi, WifiOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { getAllStalls } from '@/lib/api'
import { Stall } from '@/lib/api'

const howItWorksSteps = [
  {
    icon: <Smartphone size={32} className="text-blue-500" />,
    title: "1. Download & Sign Up",
    description: "Get the app and register with a one-time $2 fee"
  },
  {
    icon: <Umbrella size={32} className="text-blue-500" />,
    title: "2. Find & Borrow",
    description: "Locate nearby umbrellas and borrow when you need them"
  },
  {
    icon: <Repeat size={32} className="text-blue-500" />,
    title: "3. Return & Share",
    description: "Return to any ShareLah station to help the next person"
  }
]

const features = [
  {
    icon: <MapPin size={20} className="text-blue-500" />,
    title: "Convenient Locations",
    description: "Find and return umbrellas at MRT stations, shopping malls, and public areas"
  },
  {
    icon: <Smartphone size={20} className="text-blue-500" />,
    title: "Real-time Support",
    description: "Get help anytime via WhatsApp at +65 9276 6847"
  },
  {
    icon: <Cloudy size={20} className="text-blue-500" />,
    title: "Community Focused",
    description: "Join thousands of Singaporeans helping each other stay dry"
  },
  {
    icon: <Repeat size={20} className="text-blue-500" />,
    title: "Eco-Friendly",
    description: "Reduce waste by sharing instead of buying new umbrellas"
  }
]

const farEastMalls = [
  "Pacific Plaza", "One Holland V", "Greenwich V", "Hougang One", 
  "Katong V", "Riverside Point", "Junction 10", "Siglap Centre", 
  "West Coast Plaza", "Far East Square"
]

const sbsLocations = [
  "Toa Payoh Interchange", "Tampines Interchange", "Hougang Interchange", 
  "Clementi Interchange", "Bedok Interchange", "DTL Bukit Panjang", 
  "DTL Beauty World", "DTL Little India", "DTL Telok Ayer", 
  "DTL Botanic Garden", "DTL Newton", "DTL Expo"
]

const otherLocations = [
  "Ascent Tower A", "CIMB Tower", "Furama Hotel & Annex Building"
]

const articles = [
  {
    title: "Joo Chiat Pilot with Youth Volunteers",
    description: "This initiative provided free umbrellas without locks or monetary commitments.",
    link: "https://www.instagram.com",
    platform: "Instagram"
  },
  {
    title: "Service Cessation",
    description: "'Not sustainable': Joo Chiat's free umbrella-sharing service to stop due to low return rates by inconsiderate users.",
    link: "https://www.todayonline.com",
    platform: "TODAY Article"
  },
  {
    title: "Istana Open House Collaboration",
    description: "In partnership with SBS Transit, we distributed free umbrellas during the Istana Open House (held quarterly), an event we launched at the end of last year.",
    links: [
      { url: "https://www.linkedin.com", platform: "LinkedIn" },
      { url: "https://www.facebook.com", platform: "Facebook" }
    ]
  }
]

// Stalls-related constants and types
const FAR_EAST_MALLS_KEYWORDS = [
  'pacific plaza', 'one holland v', 'greenwich v', 'hougang one', 
  'katong v', 'riverside point', 'junction 10', 'siglap centre', 
  'west coast plaza', 'far east square', 'far east'
];

const SBS_NETWORK_KEYWORDS = [
  'toa payoh interchange', 'tampines interchange', 'hougang interchange', 
  'clementi interchange', 'bedok interchange', 'dtl bukit panjang', 
  'dtl beauty world', 'dtl little india', 'dtl telok ayer', 
  'dtl botanic garden', 'dtl newton', 'dtl expo', 'interchange', 'dtl'
];

type StallCategory = 'far-east-malls' | 'sbs-network' | 'others';

interface CategorizedStalls {
  'far-east-malls': Stall[];
  'sbs-network': Stall[];
  'others': Stall[];
}

// Function to categorize stalls based on name
function categorizeStall(stall: Stall): StallCategory {
  const name = stall.name.toLowerCase();
  
  // Check for Far East Malls
  if (FAR_EAST_MALLS_KEYWORDS.some(keyword => name.includes(keyword))) {
    return 'far-east-malls';
  }
  
  // Check for SBS Network
  if (SBS_NETWORK_KEYWORDS.some(keyword => name.includes(keyword))) {
    return 'sbs-network';
  }
  
  // Default to others
  return 'others';
}

// Stall Card Component
function StallCard({ stall }: { stall: Stall }) {
  const isOnline = true; // You can implement actual online status logic here
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{stall.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{stall.deviceName}</p>
        </div>
        <div className="flex items-center">
          {isOnline ? (
            <Wifi className="h-5 w-5 text-green-500" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-500" />
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Umbrella className="h-4 w-4 mr-2" />
          <span>{stall.umbrellaCount} umbrellas available</span>
        </div>
        
        {stall.location && stall.location.length >= 2 && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{stall.location[0].toFixed(4)}, {stall.location[1].toFixed(4)}</span>
          </div>
        )}
        
        <div className="flex items-center text-sm">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            stall.status === 'approved' 
              ? 'bg-green-100 text-green-800' 
              : stall.status === 'draft'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {stall.status}
          </span>
        </div>
      </div>
    </div>
  );
}

// Tab Component
function TabButton({ 
  active, 
  onClick, 
  children, 
  count 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode; 
  count: number; 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children} ({count})
    </button>
  );
}

export default function Home() {
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [categorizedStalls, setCategorizedStalls] = useState<CategorizedStalls>({
    'far-east-malls': [],
    'sbs-network': [],
    'others': []
  });
  const [activeTab, setActiveTab] = useState<StallCategory>('far-east-malls');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStalls() {
      try {
        setLoading(true);
        const response = await getAllStalls();
        
        if (!response.success) {
          setError(response.error || 'Failed to fetch stalls');
          return;
        }
        
        const allStalls = response.data || [];
        setStalls(allStalls);
        
        // Categorize stalls
        const categorized: CategorizedStalls = {
          'far-east-malls': [],
          'sbs-network': [],
          'others': []
        };
        
        allStalls.forEach(stall => {
          const category = categorizeStall(stall);
          categorized[category].push(stall);
        });
        
        setCategorizedStalls(categorized);
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Error fetching stalls:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStalls();
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      setFormError('Please fill in all required fields.');
      return;
    }
    
    // Create email content
    const emailBody = `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

---
This message was sent from the ShareLah website contact form.
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:info@sharelah-sg.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Try to open email client
    try {
      window.location.href = mailtoLink;
      setFormSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormSubmitted(false);
        (e.target as HTMLFormElement).reset();
      }, 3000);
    } catch (err) {
      setFormError('Unable to open email client. Please email us directly at info@sharelahsg.com');
    }
  };

  return (
    <main className="bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-10 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
          </div>

          {/* Logo with dynamic sizing */}
          <div className="flex justify-center w-full my-6 mb-8 relative">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-110 group-hover:opacity-50 transition-opacity duration-300"></div>
              
              {/* Logo container */}
              <Image
                  src="/logo.png" 
                  alt="ShareLah" 
                  width={120} 
                  height={120}
                  className="w-64 lg:w-64 "
                />
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
          
          {/* Main headline with enhanced styling */}
          <div className="relative z-10">
            
            {/* Tagline with enhanced styling */}
            <div className="space-y-2 mb-6">
              <p className="text-xl md:text-2xl lg:text-3xl text-blue-600 max-w-3xl mx-auto font-medium">
                Singapore's Community Umbrella Sharing Service
              </p>
              <p className="text-lg md:text-xl text-gray-600 font-light">
                Stay dry and help others do the same!
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
            
            {/* Stats or highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-800">40</div>
                <div className="text-sm text-gray-600">Stations Islandwide</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-800">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-800">$2</div>
                <div className="text-sm text-gray-600">One-time Fee</div>
              </div>
            </div>
          </div>
        </header>

        {/* How It Works */}
        <section id="how-it-works" className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">How ShareLah Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-5 text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                <div className="text-blue-500 text-3xl mb-3 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Simple & Fair Pricing</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-blue-100 rounded-xl p-5 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-blue-800">One-Time Registration</h3>
                  <p className="text-gray-600">Lifetime access to ShareLah</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">$2.00</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border-2 border-green-500 rounded-xl p-4 bg-green-50">
                <h3 className="font-bold text-green-700 mb-2">Free Usage</h3>
                <ul className="text-gray-700 space-y-1">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4" />
                    <span>Always Free: Just return the umbrella within 48 hours.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4" />
                    <span>We don't count weekends!</span>
                  </li>
                </ul>
              </div>
              <div className="border-2 border-amber-500 rounded-xl p-4 bg-amber-50">
                <h3 className="font-bold text-amber-700 mb-2">Extended Use</h3>
                <ul className="text-gray-700 space-y-1">
                  <li className="flex items-start">
                    <Clock className="text-amber-500 mt-1 mr-2 h-4 w-4" />
                    <span>Auto Charge $2.00 for 3 days extension</span>
                  </li>
                  <li className="flex items-start">
                    <CreditCard className="text-amber-500 mt-1 mr-2 h-4 w-4" />
                    <span>Auto Charge $15.00 (Refundable deposit) after 3 days extension</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-300">
              <h3 className="font-bold text-gray-800 mb-2">Our Promise</h3>
              <p className="text-gray-700">
                <CheckCircle className="text-blue-500 mr-2 h-4 w-4 inline" />
                100% refundable deposit for overdue returns - because our goal is community sharing, not collecting fees!
              </p>
            </div>
          </div>
        </section>

            {/* Features */}
        <section id="features" className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Why Choose ShareLah?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
              <div key={index} className="flex items-start p-3">
                <div className="text-blue-500 text-xl mt-1 mr-3">
                    {feature.icon}
                  </div>
                  <div>
                  <h3 className="font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stalls Section */}
        <section id="stalls" className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Our Locations</h2>
          <p className="text-center text-gray-600 mb-8">
            Find and locate ShareLah umbrella stations across Singapore
          </p>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading stalls...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Stalls</h3>
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              {/* Stalls Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Store className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-800">{categorizedStalls['far-east-malls'].length}</div>
                  <div className="text-sm text-gray-600">Far East Malls</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Bus className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">{categorizedStalls['sbs-network'].length}</div>
                  <div className="text-sm text-gray-600">SBS Network</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Building className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{categorizedStalls['others'].length}</div>
                  <div className="text-sm text-gray-600">Other Locations</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-3 mb-6">
                <TabButton
                  active={activeTab === 'far-east-malls'}
                  onClick={() => setActiveTab('far-east-malls')}
                  count={categorizedStalls['far-east-malls'].length}
                >
                  <Store className="h-4 w-4 mr-2 inline" />
                  Far East Malls
                </TabButton>
                
                <TabButton
                  active={activeTab === 'sbs-network'}
                  onClick={() => setActiveTab('sbs-network')}
                  count={categorizedStalls['sbs-network'].length}
                >
                  <Bus className="h-4 w-4 mr-2 inline" />
                  SBS Network
                </TabButton>
                
                <TabButton
                  active={activeTab === 'others'}
                  onClick={() => setActiveTab('others')}
                  count={categorizedStalls['others'].length}
                >
                  <Building className="h-4 w-4 mr-2 inline" />
                  Other Locations
                </TabButton>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {categorizedStalls[activeTab].length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      {activeTab === 'far-east-malls' && <Store className="h-12 w-12 mx-auto" />}
                      {activeTab === 'sbs-network' && <Bus className="h-12 w-12 mx-auto" />}
                      {activeTab === 'others' && <Building className="h-12 w-12 mx-auto" />}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No stalls found</h3>
                    <p className="text-gray-600">
                      No stalls are currently available in this category.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorizedStalls[activeTab].map((stall) => (
                      <StallCard key={stall._id} stall={stall} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </section>
        
        {/* Articles */}
        <section id="articles" className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">In The News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map((article, index) => (
              <div key={index} className="border border-blue-200 rounded-xl p-5 bg-blue-50">
                <h3 className="font-bold text-lg text-blue-800 mb-2">{article.title}</h3>
                <p className="text-gray-700 mb-3">{article.description}</p>
                <a href={article.link} className="text-blue-600 font-medium hover:underline flex items-center">
                  <span className="mr-2">📱</span> View on {article.platform}
                </a>
                </div>
              ))}
            
            <div className="border border-blue-200 rounded-xl p-5 bg-blue-50 md:col-span-2">
              <h3 className="font-bold text-lg text-blue-800 mb-2">{articles[2].title}</h3>
              <p className="text-gray-700 mb-3">{articles[2].description}</p>
              <div className="flex flex-wrap gap-4">
                {articles[2].links?.map((link, index) => (
                  <a key={index} href={link.url} className="text-blue-600 font-medium hover:underline flex items-center">
                    <span className="mr-2">🔗</span> View {link.platform} Post
                  </a>
              ))}
            </div>
          </div>
        </div>
      </section>


        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl shadow-lg p-8 mb-10 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Share the Shelter?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">Join Singapore's community umbrella sharing movement today!</p>
          <div className="mb-6">
            <AppStoreButtons />
          </div>
          {/* <div className="mt-6">
            <p className="mb-2">Scan to download:</p>
            <div className="bg-white inline-block p-2 rounded-lg">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center text-gray-500">
                QR Code
              </div>
            </div>
          </div> */}
        </section>

        {/* Contact Form */}
        <section id="contact" className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                Have questions about ShareLah? Need help with the service? We're here to help! 
                Reach out to us through any of the channels below or fill out the contact form.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">📱</span>
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <p className="text-gray-600">+65 9276 6847</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-blue-500 text-xl mr-3">✉️</span>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">info@sharelahsg.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-blue-600 text-xl mr-3">⏰</span>
                  <div>
                    <p className="font-semibold text-gray-800">Response Time</p>
                    <p className="text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-blue-800 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com" className="text-pink-500 text-2xl hover:scale-110 transition-transform">
                    📷
                  </a>
                  <a href="https://www.facebook.com" className="text-blue-600 text-2xl hover:scale-110 transition-transform">
                    📘
                  </a>
                  <a href="https://www.tiktok.com" className="text-black text-2xl hover:scale-110 transition-transform">
                    🎵
                  </a>
                  <a href="https://www.linkedin.com" className="text-blue-700 text-2xl hover:scale-110 transition-transform">
                    💼
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Send us a Message</h3>
              
              {/* Success Message */}
              {formSubmitted && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-500 text-xl mr-2">✅</span>
                    <div>
                      <p className="text-green-800 font-medium">Email client opened!</p>
                      <p className="text-green-600 text-sm">Your message has been prepared. Please send it from your email client.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {formError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-red-500 text-xl mr-2">❌</span>
                    <div>
                      <p className="text-red-800 font-medium">Error</p>
                      <p className="text-red-600 text-sm">{formError}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="business">Business Partnership</option>
                    <option value="media">Media Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and 
                    consent to ShareLah contacting me regarding my inquiry.
                  </label>
          </div>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formSubmitted ? 'Opening Email Client...' : 'Send Message'}
                </button>
              </form>
            </div>
        </div>
      </section>

        {/* Footer */}
        <footer className="bg-gray-800 rounded-2xl shadow-lg p-6 text-white">
          <div className="text-center">
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
        </footer>
        </div>
    </main>
  )
}
