import React, { useEffect, useState } from 'react';
import { Share2, Heart, ArrowLeft } from 'lucide-react';
import { Wish } from '../types/wish';
import { supabase } from '../lib/supabase';
import { getOccasionById } from '../utils/occasions';
import { ShareDialog } from './ShareDialog';

interface WishPageProps {
  slug: string;
  onBack?: () => void;
}

export function WishPage({ slug, onBack }: WishPageProps) {
  const [wish, setWish] = useState<Wish | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchWish = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('wishes')
          .select('*')
          .eq('generated_slug', slug)
          .single();

        if (fetchError) {
          console.error('Error fetching wish:', fetchError);
          setError('Wish not found');
        } else {
          setWish(data);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load wish');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWish();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your special wish...</p>
        </div>
      </div>
    );
  }

  if (error || !wish) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
          <p className="text-gray-600 mb-6">{error || "This wish couldn't be found."}</p>
          {onBack && (
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Go Back Home
            </button>
          )}
        </div>
      </div>
    );
  }

  const occasion = getOccasionById(wish.occasion);
  if (!occasion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Unknown Occasion</h1>
          <p className="text-gray-600 mb-6">This wish has an unknown occasion type.</p>
          {onBack && (
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Go Back Home
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentUrl = window.location.href;
  const hasMultiplePhotos = wish.photo_urls && wish.photo_urls.length > 1;

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br ${occasion.colors.secondary} relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-white animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-white animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-white animate-pulse animation-delay-500"></div>
        </div>

        {/* Header */}
        {onBack && (
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        )}

        {/* Share Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setShowShare(true)}
            className="bg-white/80 backdrop-blur-sm text-gray-700 hover:text-gray-900 p-3 rounded-xl hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-2xl w-full text-center">
            {/* Occasion Badge */}
            <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${occasion.colors.primary} text-white px-6 py-3 rounded-full mb-8 shadow-lg`}>
              <span className="text-2xl">{occasion.emoji}</span>
              <span className="font-semibold text-lg">{occasion.title}</span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-5xl md:text-7xl font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ color: occasion.colors.text }}
            >
              {wish.recipient_name}
            </h1>

            {/* Photo */}
            {wish.photo_urls && wish.photo_urls.length > 0 && (
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                {hasMultiplePhotos ? (
                  <div className="relative max-w-md mx-auto">
                    <img
                      src={wish.photo_urls[currentPhotoIndex]}
                      alt={`Photo ${currentPhotoIndex + 1} of ${wish.recipient_name}`}
                      className="w-full aspect-square object-cover rounded-3xl shadow-2xl border-8 border-white"
                    />
                    <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-transparent rounded-3xl blur-xl -z-10"></div>
                    {/* Photo navigation */}
                    <div className="flex justify-center mt-4 space-x-2">
                      {wish.photo_urls.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <img
                      src={wish.photo_urls[0]}
                      alt={`Photo of ${wish.recipient_name}`}
                      className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl shadow-2xl border-8 border-white"
                    />
                    <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-transparent rounded-3xl blur-xl -z-10"></div>
                  </div>
                )}
              </div>
            )}

            {/* Greeting Text */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl border border-white/20 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
              <p
                className="text-xl md:text-2xl leading-relaxed whitespace-pre-line"
                style={{ color: occasion.colors.text }}
              >
                {wish.greeting_text}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center space-x-2 text-gray-600 animate-in fade-in duration-700 delay-700">
              <span>Made with</span>
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              <span>on WishCraft</span>
            </div>
          </div>
        </div>
      </div>

      <ShareDialog
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        url={currentUrl}
        recipientName={wish.recipient_name}
      />
    </>
  );
}