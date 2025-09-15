import React from 'react';
import { Heart, Sparkles, Gift, Star } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export function HomePage({ onGetStarted }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">WishCraft</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Create magical moments</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Create personalized
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> celebration websites </span>
              in 1 minute
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform special moments into beautiful, shareable websites. Perfect for birthdays, 
              anniversaries, weddings, and festivals.
            </p>

            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Create Your Wish Website
              <Gift className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/80 transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Beautiful Templates</h3>
              <p className="text-gray-600">Choose from stunning, occasion-specific designs that make every celebration special.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/80 transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Sharing</h3>
              <p className="text-gray-600">Share instantly on WhatsApp, Instagram, Facebook, or copy the direct link.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/80 transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobile Perfect</h3>
              <p className="text-gray-600">Every website looks amazing on phones, tablets, and desktops.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to create something beautiful?</h2>
            <p className="text-purple-100 mb-6 text-lg">Join thousands who've made their celebrations unforgettable</p>
            <button
              onClick={onGetStarted}
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}