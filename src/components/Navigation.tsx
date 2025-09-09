
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', emoji: '🏠' },
    { label: 'About', href: '#about', emoji: '📖' },
    { label: 'Catalog', href: '#catalog', emoji: '📋' },
    { label: 'Contact', href: '#contact', emoji: '💬' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`mobile-sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-coconut-white/95 backdrop-blur-sm shadow-lg border-b-2 border-guava-pink/20' 
        : 'bg-yuca-beige/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-serif font-bold text-cacao-brown hover:text-guava-pink transition-colors cursor-pointer">
              <span className="animate-joyful-bounce inline-block">🥮</span>
              {' '}Colombian Bakery PDX
            </h1>
          </div>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="group flex items-center space-x-1 text-cacao-brown hover:text-guava-pink transition-all duration-300 font-medium hover:scale-105"
              >
                <span className="group-hover:animate-joyful-bounce">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button with enhanced styling */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cacao-brown hover:text-guava-pink hover:bg-guava-pink/10 quick-tap"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-coconut-white/95 backdrop-blur-sm border-t border-guava-pink/20 rounded-b-lg shadow-lg">
            <div className="px-2 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-3 w-full text-left px-4 py-3 text-cacao-brown hover:text-guava-pink hover:bg-yuca-beige/50 transition-all duration-300 rounded-lg quick-tap font-medium"
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
