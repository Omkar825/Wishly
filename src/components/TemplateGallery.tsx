import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { templates, getTemplatesByCategory } from '../utils/occasions';
import { Template } from '../types/wish';

interface TemplateGalleryProps {
  category: string;
  subType?: string;
  onSelect: (templateId: string) => void;
  onBack: () => void;
  selectedTemplateId?: string;
}

export function TemplateGallery({ category, subType, onSelect, onBack, selectedTemplateId }: TemplateGalleryProps) {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const availableTemplates = getTemplatesByCategory(category, subType);

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleSelect = (templateId: string) => {
    onSelect(templateId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Choose Your Template</h1>
          <div></div>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {availableTemplates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-2 ${
                selectedTemplateId === template.id ? 'border-purple-500' : 'border-transparent'
              }`}
            >
              <div className="relative">
                <img
                  src={template.preview_url}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handlePreview(template)}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className={`inline-block bg-gradient-to-r ${template.colors.primary} text-white px-3 py-1 rounded-full text-sm mb-3`}>
                  {template.category}
                </div>
                <div className="flex space-x-2 mb-4">
                  {template.animations.map((animation) => (
                    <span key={animation} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {animation}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleSelect(template.id)}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    selectedTemplateId === template.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedTemplateId === template.id ? 'Selected' : 'Select Template'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedTemplateId && (
          <div className="text-center">
            <button
              onClick={() => onSelect(selectedTemplateId)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center mx-auto"
            >
              Continue with Selected Template
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">{previewTemplate.name} Preview</h2>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className={`bg-gradient-to-br ${previewTemplate.colors.secondary} rounded-2xl p-8 text-center`}>
              <div className={`inline-block bg-gradient-to-r ${previewTemplate.colors.primary} text-white px-4 py-2 rounded-full mb-4`}>
                Sample Occasion
              </div>
              <h1 className={`text-4xl font-bold text-${previewTemplate.colors.text} mb-4`}>
                Sample Name
              </h1>
              <p className={`text-${previewTemplate.colors.text} text-lg`}>
                This is how your personalized message will appear with this beautiful template design.
              </p>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => {
                  handleSelect(previewTemplate.id);
                  setPreviewTemplate(null);
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Select This Template
              </button>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:border-gray-300 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}