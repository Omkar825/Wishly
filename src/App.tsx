import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { WishForm } from './components/WishForm';
import { WishPage } from './components/WishPage';

type AppState = 'home' | 'form' | 'wish';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're viewing a wish page from URL
    const path = window.location.pathname;
    if (path.startsWith('/wishes/')) {
      const slug = path.split('/wishes/')[1];
      if (slug) {
        setCurrentSlug(slug);
        setCurrentView('wish');
      }
    }
  }, []);

  const handleGetStarted = () => {
    setCurrentView('form');
    window.history.pushState(null, '', '/create');
  };

  const handleFormComplete = (slug: string) => {
    setCurrentSlug(slug);
    setCurrentView('wish');
    window.history.pushState(null, '', `/wishes/${slug}`);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentSlug(null);
    window.history.pushState(null, '', '/');
  };

  if (currentView === 'home') {
    return <HomePage onGetStarted={handleGetStarted} />;
  }

  if (currentView === 'form') {
    return <WishForm onBack={handleBackToHome} onComplete={handleFormComplete} />;
  }

  if (currentView === 'wish' && currentSlug) {
    return <WishPage slug={currentSlug} onBack={handleBackToHome} />;
  }

  // Fallback
  return <HomePage onGetStarted={handleGetStarted} />;
}

export default App;