
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-bread-brown text-coconut-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-2">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Colombian Bakery PDX
              </h3>
              <p className="text-coconut-white/80 mb-4 leading-relaxed">
                Bringing authentic Colombian flavors to Portland through handcrafted, 
                gluten-free yuca pastries made with love and tradition.
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-colombian-yellow via-colombian-blue to-colombian-red"></div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-serif font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-coconut-white/80">
                <li>
                  <button 
                    onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-coconut-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.querySelector('#retail')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-coconut-white transition-colors"
                  >
                    Retail Orders
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.querySelector('#wholesale')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-coconut-white transition-colors"
                  >
                    Wholesale
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.querySelector('#catering')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-coconut-white transition-colors"
                  >
                    Catering
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-serif font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-coconut-white/80">
                <p>(503) 555-BOMB</p>
                <p>hello@colombianbakerypdx.com</p>
                <p>Portland, Oregon</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-coconut-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-coconut-white/60 text-sm">
              © 2024 Colombian Bakery PDX. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-coconut-white/60 hover:text-coconut-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-coconut-white/60 hover:text-coconut-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
