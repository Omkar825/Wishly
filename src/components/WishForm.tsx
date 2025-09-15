import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, X, Loader2, Plus } from 'lucide-react';
import { occasions, festivals, weddingTypes } from '../utils/occasions';
import { WishFormData } from '../types/wish';
import { TemplateGallery } from './TemplateGallery';
import { AIGreetingSelector } from './AIGreetingSelector';
import { CustomizationPanel } from './CustomizationPanel';

interface WishFormProps {
  onBack: () => void;
  onComplete: (slug: string) => void;
}

export function WishForm({ onBack, onComplete }: WishFormProps) {
  const [currentStep, setCurrentStep] = useState(1); // 1-6: occasion, name, note, photos, template, greeting, customize
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'form' | 'template' | 'greeting' | 'customize'>('form');
  const [formData, setFormData] = useState<WishFormData>({
    occasion: 'birthday',
    recipientName: '',
    photos: [],
    greetingText: '',
    personalNote: '',
    festivalType: undefined,
    weddingType: undefined,
    templateId: undefined
  });
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [selectedGreeting, setSelectedGreeting] = useState<string>('');
  const [customizations, setCustomizations] = useState<any>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 5 - formData.photos.length;
    const filesToAdd = files.slice(0, remainingSlots);
    
    if (filesToAdd.length > 0) {
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ...filesToAdd] }));
      
      filesToAdd.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          setPhotoPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const selectedOccasion = occasions.find(occ => occ.id === formData.occasion)!;

  // Handle different views
  if (currentView === 'template') {
    return (
      <TemplateGallery
        category={formData.occasion}
        subType={formData.festivalType}
        onSelect={(templateId) => {
          setFormData(prev => ({ ...prev, templateId }));
          setCurrentView('greeting');
        }}
        onBack={() => setCurrentView('form')}
        selectedTemplateId={formData.templateId}
      />
    );
  }

  if (currentView === 'greeting') {
    return (
      <AIGreetingSelector
        recipientName={formData.recipientName}
        occasion={formData.occasion}
        personalNote={formData.personalNote}
        festivalType={formData.festivalType}
        weddingType={formData.weddingType}
        onSelect={(greeting) => {
          setSelectedGreeting(greeting);
          setCurrentView('customize');
        }}
        onBack={() => setCurrentView('template')}
      />
    );
  }

  if (currentView === 'customize') {
    return (
      <CustomizationPanel
        onBack={() => setCurrentView('greeting')}
        onContinue={(customizationData) => {
          setCustomizations(customizationData);
          // Here we would save to database and complete
          onComplete('demo-slug-' + Date.now());
        }}
        templateId={formData.templateId || ''}
        recipientName={formData.recipientName}
        greetingText={selectedGreeting}
        photoUrls={photoPreviews}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-sm text-gray-500">
            Step {currentStep} of 6
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className={`bg-gradient-to-r ${selectedOccasion.colors.primary} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>

        {/* Form Steps */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
          {/* Step 1: Select Occasion */}
          {currentStep === 1 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">What's the occasion?</h2>
              <p className="text-gray-600 mb-8">Choose the celebration type</p>
              
              <div className="grid grid-cols-2 gap-4">
                {occasions.map((occasion) => (
                  <button
                    key={occasion.id}
                    onClick={() => setFormData(prev => ({ ...prev, occasion: occasion.id }))}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
                      formData.occasion === occasion.id
                        ? `border-${occasion.colors.accent} bg-gradient-to-br ${occasion.colors.secondary} shadow-lg`
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{occasion.emoji}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{occasion.title}</h3>
                    <p className="text-sm text-gray-600">{occasion.description}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                className={`mt-8 bg-gradient-to-r ${selectedOccasion.colors.primary} text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center mx-auto`}
              >
                Continue
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Enter Name */}
          {currentStep === 2 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Who are you celebrating?</h2>
              <p className="text-gray-600 mb-8">Enter the recipient's name</p>
              
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Enter name..."
                  value={formData.recipientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                  className="w-full px-6 py-4 text-xl text-center border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              {/* Conditional fields based on occasion */}
              {formData.occasion === 'festival' && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Which festival?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {festivals.map((festival) => (
                      <button
                        key={festival.id}
                        onClick={() => setFormData(prev => ({ ...prev, festivalType: festival.id }))}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          formData.festivalType === festival.id
                            ? `border-purple-500 bg-gradient-to-br ${festival.colors} text-white`
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{festival.emoji}</div>
                        <div className="text-sm font-medium">{festival.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {formData.occasion === 'wedding' && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">What type of wedding event?</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {weddingTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData(prev => ({ ...prev, weddingType: type.id }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          formData.weddingType === type.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{type.emoji}</span>
                          <span className="font-medium">{type.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:border-gray-300 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.recipientName.trim()}
                  className={`flex-1 bg-gradient-to-r ${selectedOccasion.colors.primary} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                    !formData.recipientName.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Note */}
          {currentStep === 3 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Add a personal note</h2>
              <p className="text-gray-600 mb-8">Share what makes this celebration special (optional)</p>
              
              <div className="mb-8">
                <textarea
                  placeholder="Write a personal message that will be included in the AI-generated greeting..."
                  value={formData.personalNote}
                  onChange={(e) => setFormData(prev => ({ ...prev, personalNote: e.target.value }))}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors resize-none h-32"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:border-gray-300 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className={`flex-1 bg-gradient-to-r ${selectedOccasion.colors.primary} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center`}
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Upload Photos */}
          {currentStep === 4 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Add special photos</h2>
              <p className="text-gray-600 mb-8">Upload up to 5 photos to make it personal (optional)</p>
              
              <div className="mb-8">
                {photoPreviews.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {photoPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-xl shadow-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {formData.photos.length < 5 && (
                      <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition-colors flex flex-col items-center justify-center">
                        <Plus className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ) : (
                  <label className="inline-block w-64 h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-purple-500 transition-colors">
                    <div className="flex flex-col items-center justify-center h-full">
                      <Upload className="w-16 h-16 text-gray-400 mb-4" />
                      <span className="text-gray-600 text-lg">Click to upload photos</span>
                      <span className="text-gray-500 text-sm mt-2">Up to 5 photos</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <p className="text-sm text-gray-500 mb-8">Photos: {formData.photos.length}/5</p>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:border-gray-300 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className={`flex-1 bg-gradient-to-r ${selectedOccasion.colors.primary} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center`}
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Generate */}
          {currentStep === 5 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Review your details</h2>
              <p className="text-gray-600 mb-8">Everything looks good? Let's create your personalized website!</p>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">Summary:</h3>
                <div className={`inline-block bg-gradient-to-r ${selectedOccasion.colors.primary} text-white px-4 py-2 rounded-lg text-sm mb-2`}>
                  {selectedOccasion.title}
                  {formData.festivalType && ` - ${festivals.find(f => f.id === formData.festivalType)?.name}`}
                  {formData.weddingType && ` - ${weddingTypes.find(w => w.id === formData.weddingType)?.name}`}
                </div>
                <p className="text-lg font-medium text-gray-800">{formData.recipientName}</p>
                {formData.personalNote && (
                  <p className="text-sm text-gray-600 mt-2 italic">"{formData.personalNote}"</p>
                )}
                {photoPreviews.length > 0 && (
                  <div className="mt-4 flex justify-center space-x-2">
                    {photoPreviews.slice(0, 3).map((preview, index) => (
                      <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-12 h-12 object-cover rounded-lg" />
                    ))}
                    {photoPreviews.length > 3 && (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-600">
                        +{photoPreviews.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  disabled={isLoading}
                  className="flex-1 border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:border-gray-300 transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={() => setCurrentView('template')}
                  disabled={isLoading}
                  className={`flex-1 bg-gradient-to-r ${selectedOccasion.colors.primary} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Choose Template'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}