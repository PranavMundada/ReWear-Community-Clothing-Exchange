import { useState } from 'react'
import { ChevronRight, Users, Star, TrendingUp, Shield, ArrowRight, Search, Heart, Zap } from 'lucide-react'

const categories = [
  { name: 'Clothing', icon: '👕', count: '2.5k+' },
  { name: 'Shoes', icon: '👟', count: '1.2k+' },
  { name: 'Accessories', icon: '👜', count: '800+' },
  { name: 'Bags', icon: '🎒', count: '650+' },
  { name: 'Jewelry', icon: '💍', count: '400+' },
  { name: 'Electronics', icon: '📱', count: '300+' },
  { name: 'Books', icon: '📚', count: '900+' },
  { name: 'Home', icon: '🏠', count: '550+' },
]

const featuredItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    category: 'Clothing',
    condition: 'Good',
    points: 45,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    owner: 'Sarah M.',
    rating: 4.8,
    location: 'New York, NY'
  },
  {
    id: 2,
    title: 'Designer Handbag',
    category: 'Bags',
    condition: 'Like New',
    points: 85,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    owner: 'Emma J.',
    rating: 5.0,
    location: 'Los Angeles, CA'
  },
  {
    id: 3,
    title: 'Classic Boots',
    category: 'Shoes',
    condition: 'Like New',
    points: 65,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
    owner: 'Alex R.',
    rating: 4.9,
    location: 'Chicago, IL'
  },
  {
    id: 4,
    title: 'Cozy Knit Sweater',
    category: 'Clothing',
    condition: 'Like New',
    points: 40,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
    owner: 'Mike T.',
    rating: 4.7,
    location: 'Austin, TX'
  }
]

const stats = [
  { icon: Users, label: 'Active Users', value: '50,000+' },
  { icon: TrendingUp, label: 'Items Swapped', value: '25,000+' },
  { icon: Star, label: 'Average Rating', value: '4.8/5' },
  { icon: Shield, label: 'Trust Score', value: '99.2%' }
]

const testimonials = [
  {
    name: 'Sarah Martinez',
    location: 'New York, NY',
    rating: 5,
    text: 'SwapHub has completely changed how I approach fashion. I\'ve found amazing pieces while giving my clothes a second life.',
    swaps: 23
  },
  {
    name: 'Emma Johnson',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'The points system is brilliant! I\'ve built up enough points to get items I really wanted without spending money.',
    swaps: 18
  },
  {
    name: 'Alex Rodriguez',
    location: 'Chicago, IL',
    rating: 4,
    text: 'Love the community aspect. Every swap feels personal and the quality verification gives me confidence.',
    swaps: 31
  }
]

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SwapHub
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#browse" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Browse</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">How It Works</a>
              <a href="#community" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Community</a>
              <button className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Sign In</button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  <span>Join 50,000+ Active Swappers</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Swap, Share,
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {' '}Sustain
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  The marketplace where your unused items become someone else's treasure. 
                  Trade clothing, accessories, and more with our trusted community.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <span>Start Swapping</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {featuredItems.slice(0, 4).map((item, index) => (
                  <div key={item.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform ${index % 2 === 1 ? 'mt-8' : ''}`}>
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-blue-600 font-bold">{item.points} pts</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for clothing, accessories, electronics, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse Categories</h2>
            <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`bg-white rounded-2xl p-6 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                  selectedCategory === category.name ? 'ring-2 ring-blue-600 shadow-lg' : ''
                }`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-blue-600 font-medium">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Items</h2>
              <p className="text-xl text-gray-600">Discover popular items from our community</p>
            </div>
            <button className="hidden md:flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-lg text-sm font-medium text-gray-900">
                    {item.condition}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-600 font-bold text-lg">{item.points} points</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-600 text-sm">{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{item.owner}</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How SwapHub Works</h2>
            <p className="text-xl text-blue-100">Simple steps to sustainable swapping</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'List Your Items',
                description: 'Upload photos and descriptions of items you want to swap. Set your preferences and earn points.'
              },
              {
                step: '02',
                title: 'Find & Request',
                description: 'Browse items from our community. Send swap requests using your items or points.'
              },
              {
                step: '03',
                title: 'Complete Swap',
                description: 'Connect with other users, arrange shipping, and complete your sustainable exchange.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-blue-100 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="community" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Real stories from real swappers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                  <div className="text-blue-600 font-semibold text-sm">
                    {testimonial.swaps} swaps
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Swapping?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users making sustainable choices every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
              Create Account
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold">SwapHub</span>
              </div>
              <p className="text-gray-400">
                Making sustainable fashion accessible to everyone through community-driven exchanges.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Items</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety & Trust</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SwapHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
