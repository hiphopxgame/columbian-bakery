
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartIcon } from './CartIcon';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    { label: 'Home', href: '/', emoji: '🏠', type: 'route' },
    { label: 'About', href: '#about', emoji: '📖', type: 'scroll' },
    { label: 'Wholesale', href: '#wholesale', emoji: '🏢', type: 'scroll' },
    { label: 'Catering', href: '#catering', emoji: '🎉', type: 'scroll' },
    { label: 'Catalog', href: '/catalog', emoji: '📋', type: 'route' },
    { label: 'Contact', href: '#contact', emoji: '💬', type: 'scroll' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === 'route') {
      navigate(item.href);
    } else {
      // Handle scroll navigation
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: item.href } });
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
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
              {' '}The Colombian Bakery
            </h1>
          </div>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="group flex items-center space-x-1 text-cacao-brown hover:text-guava-pink transition-all duration-300 font-medium hover:scale-105"
              >
                <span className="group-hover:animate-joyful-bounce">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <CartIcon />
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
                  onClick={() => handleNavClick(item)}
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
