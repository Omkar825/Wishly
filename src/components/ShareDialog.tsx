import React, { useState } from 'react';
import { Share2, Copy, MessageCircle, Instagram, Facebook, Check, X } from 'lucide-react';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  recipientName: string;
}

export function ShareDialog({ isOpen, onClose, url, recipientName }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToWhatsApp = () => {
    const message = `🎉 Check out this special celebration website I created for ${recipientName}! ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToInstagram = () => {
    // Instagram doesn't support direct URL sharing, so we copy to clipboard
    copyToClipboard();
    alert('Link copied! You can now paste it in your Instagram story or bio.');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative animate-in fade-in slide-in-from-bottom-5 duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Share Your Creation</h2>
          <p className="text-gray-600">Let {recipientName} and others see this special website</p>
        </div>

        {/* Copy Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Website Link</label>
          <div className="flex">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl bg-gray-50 text-gray-800 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-6 py-3 bg-gray-800 text-white rounded-r-xl hover:bg-gray-900 transition-colors flex items-center"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-3">
          <button
            onClick={shareToWhatsApp}
            className="w-full flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Share on WhatsApp</span>
          </button>

          <button
            onClick={shareToFacebook}
            className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-colors"
          >
            <Facebook className="w-5 h-5" />
            <span className="font-semibold">Share on Facebook</span>
          </button>

          <button
            onClick={shareToInstagram}
            className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-xl transition-all duration-200"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-semibold">Copy for Instagram</span>
          </button>
        </div>
      </div>
    </div>
  );
}