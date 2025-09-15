import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { generateGreetingVariations, GreetingVariation } from '../services/aiService';

interface AIGreetingSelectorProps {
  recipientName: string;
  occasion: string;
  personalNote: string;
  festivalType?: string;
  weddingType?: string;
  onSelect: (greeting: string) => void;
  onBack: () => void;
}

export function AIGreetingSelector({
  recipientName,
  occasion,
  personalNote,
  festivalType,
  weddingType,
  onSelect,
  onBack
}: AIGreetingSelectorProps) {
  const [variations, setVariations] = useState<GreetingVariation[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customGreeting, setCustomGreeting] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    generateVariations();
  }, []);

  const generateVariations = async () => {
    setIsLoading(true);
    try {
      const newVariations = await generateGreetingVariations(
        recipientName,
        occasion,
        personalNote,
        festivalType,
        weddingType
      );
      setVariations(newVariations);
    } catch (error) {
      console.error('Error generating variations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = () => {
    if (showCustom && customGreeting.trim()) {
      onSelect(customGreeting);
    } else if (selectedVariation) {
      const variation = variations.find(v => v.id === selectedVariation);
      if (variation) {
        onSelect(variation.text);
      }
    }
  };

  const getStyleIcon = (style: string) => {
    switch (style) {
      case 'formal': return '🎩';
      case 'casual': return '😊';
      case 'poetic': return '✨';
      default: return '💝';
    }
  };

  const getStyleDescription = (style: string) => {
    switch (style) {
      case 'formal': return 'Professional and respectful';
      case 'casual': return 'Friendly and relaxed';
      case 'poetic': return 'Creative and artistic';
      default: return 'Personalized message';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Choose Your Message</h1>
            <p className="text-gray-600">AI-generated personalized greetings</p>
          </div>
          <button
            onClick={generateVariations}
            disabled={isLoading}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Generating personalized messages...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* AI Generated Variations */}
            <div className="grid gap-6">
              {variations.map((variation) => (
                <div
                  key={variation.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedVariation === variation.id && !showCustom
                      ? 'border-purple-500 shadow-lg'
                      : 'border-white/20 hover:border-purple-300'
                  }`}
                  onClick={() => {
                    setSelectedVariation(variation.id);
                    setShowCustom(false);
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getStyleIcon(variation.style)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 capitalize">{variation.style} Style</h3>
                        <p className="text-sm text-gray-600">{getStyleDescription(variation.style)}</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      selectedVariation === variation.id && !showCustom
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedVariation === variation.id && !showCustom && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                      {variation.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Message Option */}
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                showCustom
                  ? 'border-purple-500 shadow-lg'
                  : 'border-white/20 hover:border-purple-300'
              }`}
              onClick={() => setShowCustom(true)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Write Your Own</h3>
                    <p className="text-sm text-gray-600">Create a completely custom message</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 ${
                  showCustom
                    ? 'bg-purple-500 border-purple-500'
                    : 'border-gray-300'
                }`}>
                  {showCustom && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              {showCustom && (
                <textarea
                  value={customGreeting}
                  onChange={(e) => setCustomGreeting(e.target.value)}
                  placeholder="Write your personalized message here..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:border-purple-500 focus:outline-none"
                  autoFocus
                />
              )}
            </div>

            {/* Continue Button */}
            <div className="text-center pt-6">
              <button
                onClick={handleSelect}
                disabled={!selectedVariation && !showCustom && !customGreeting.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue with Selected Message
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}