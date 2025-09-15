import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Palette, Type, Image, Layout } from 'lucide-react';

interface CustomizationPanelProps {
  onBack: () => void;
  onContinue: (customizations: any) => void;
  templateId: string;
  recipientName: string;
  greetingText: string;
  photoUrls: string[];
}

export function CustomizationPanel({
  onBack,
  onContinue,
  templateId,
  recipientName,
  greetingText,
  photoUrls
}: CustomizationPanelProps) {
  const [customizations, setCustomizations] = useState({
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#8b5cf6',
    fontFamily: 'Inter',
    photoLayout: 'grid' as 'grid' | 'slider',
    customGreeting: greetingText
  });

  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'layout' | 'text'>('colors');

  const colorPresets = [
    { name: 'Purple Dream', bg: '#f3e8ff', text: '#581c87', accent: '#8b5cf6' },
    { name: 'Rose Gold', bg: '#fdf2f8', text: '#9f1239', accent: '#f43f5e' },
    { name: 'Ocean Blue', bg: '#eff6ff', text: '#1e3a8a', accent: '#3b82f6' },
    { name: 'Sunset', bg: '#fff7ed', text: '#9a3412', accent: '#ea580c' },
    { name: 'Forest', bg: '#f0fdf4', text: '#14532d', accent: '#22c55e' },
    { name: 'Midnight', bg: '#1f2937', text: '#f9fafb', accent: '#6366f1' }
  ];

  const fontOptions = [
    { name: 'Inter', class: 'font-sans' },
    { name: 'Playfair Display', class: 'font-serif' },
    { name: 'Dancing Script', class: 'font-cursive' },
    { name: 'Poppins', class: 'font-sans' }
  ];

  const handleColorPreset = (preset: any) => {
    setCustomizations(prev => ({
      ...prev,
      backgroundColor: preset.bg,
      textColor: preset.text,
      accentColor: preset.accent
    }));
  };

  const handleContinue = () => {
    onContinue(customizations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Customize Your Design</h1>
          <div></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customization Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg sticky top-8">
              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'colors', icon: Palette, label: 'Colors' },
                  { id: 'fonts', icon: Type, label: 'Fonts' },
                  { id: 'layout', icon: Layout, label: 'Layout' },
                  { id: 'text', icon: Type, label: 'Text' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Colors Tab */}
              {activeTab === 'colors' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Color Presets</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => handleColorPreset(preset)}
                          className="p-3 rounded-lg border-2 border-gray-200 hover:border-purple-300 transition-colors"
                          style={{ backgroundColor: preset.bg }}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: preset.accent }}
                            />
                            <span
                              className="text-sm font-medium"
                              style={{ color: preset.text }}
                            >
                              {preset.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Custom Colors</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Background</label>
                        <input
                          type="color"
                          value={customizations.backgroundColor}
                          onChange={(e) => setCustomizations(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="w-full h-10 rounded-lg border border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Text Color</label>
                        <input
                          type="color"
                          value={customizations.textColor}
                          onChange={(e) => setCustomizations(prev => ({ ...prev, textColor: e.target.value }))}
                          className="w-full h-10 rounded-lg border border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Accent Color</label>
                        <input
                          type="color"
                          value={customizations.accentColor}
                          onChange={(e) => setCustomizations(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="w-full h-10 rounded-lg border border-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Fonts Tab */}
              {activeTab === 'fonts' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Font Family</h3>
                  <div className="space-y-2">
                    {fontOptions.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => setCustomizations(prev => ({ ...prev, fontFamily: font.name }))}
                        className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                          customizations.fontFamily === font.name
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className={font.class}>{font.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Layout Tab */}
              {activeTab === 'layout' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Photo Layout</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setCustomizations(prev => ({ ...prev, photoLayout: 'grid' }))}
                      className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                        customizations.photoLayout === 'grid'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="grid grid-cols-2 gap-1 w-8 h-8">
                          <div className="bg-gray-300 rounded"></div>
                          <div className="bg-gray-300 rounded"></div>
                          <div className="bg-gray-300 rounded"></div>
                          <div className="bg-gray-300 rounded"></div>
                        </div>
                        <span>Grid Layout</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setCustomizations(prev => ({ ...prev, photoLayout: 'slider' }))}
                      className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                        customizations.photoLayout === 'slider'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1 w-8 h-8">
                          <div className="bg-gray-300 rounded flex-1"></div>
                          <div className="bg-gray-200 rounded w-1"></div>
                          <div className="bg-gray-200 rounded w-1"></div>
                        </div>
                        <span>Slider Layout</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Text Tab */}
              {activeTab === 'text' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Edit Message</h3>
                  <textarea
                    value={customizations.customGreeting}
                    onChange={(e) => setCustomizations(prev => ({ ...prev, customGreeting: e.target.value }))}
                    className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:border-purple-500 focus:outline-none"
                    placeholder="Edit your greeting message..."
                  />
                </div>
              )}

              {/* Continue Button */}
              <div className="mt-8">
                <button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                >
                  Apply Customizations
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h2>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                <div
                  className="p-8 text-center min-h-[500px] flex flex-col justify-center"
                  style={{
                    backgroundColor: customizations.backgroundColor,
                    color: customizations.textColor,
                    fontFamily: customizations.fontFamily
                  }}
                >
                  <div
                    className="inline-block px-4 py-2 rounded-full text-white mb-6"
                    style={{ backgroundColor: customizations.accentColor }}
                  >
                    Sample Occasion
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    {recipientName}
                  </h1>

                  {photoUrls.length > 0 && (
                    <div className="mb-6">
                      {customizations.photoLayout === 'grid' ? (
                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                          {photoUrls.slice(0, 4).map((url, index) => (
                            <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                              <img src={url} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="max-w-sm mx-auto">
                          <img src={photoUrls[0]} alt="Featured photo" className="w-full aspect-square object-cover rounded-lg" />
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto"
                    style={{ backgroundColor: `${customizations.accentColor}20` }}
                  >
                    <p className="text-lg leading-relaxed whitespace-pre-line">
                      {customizations.customGreeting}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}