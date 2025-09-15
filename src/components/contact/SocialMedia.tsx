
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, ExternalLink } from 'lucide-react';

const SocialMedia = () => {
  // Sample Instagram photos - showing latest posts
  const instagramPhotos = [
    '/lovable-uploads/bombshell-classic-new.jpg',
    '/lovable-uploads/vegan-bombshell-new.jpg'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">
          Follow Us on Instagram
        </CardTitle>
        <p className="text-muted-foreground">
          See our latest creations and behind-the-scenes content
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Instagram Button */}
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
          onClick={() => {
            const url = 'https://www.instagram.com/bombshellspdx/';
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
        >
          <Instagram className="w-5 h-5 mr-2" />
          @bombshellspdx
        </Button>

        {/* Instagram Photo Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Recent Posts</h4>
            <button 
              onClick={() => {
                const url = 'https://www.instagram.com/bombshellspdx/';
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none"
            >
              View all <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {instagramPhotos.map((photo, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img 
                  src={photo} 
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => {
                    const url = 'https://www.instagram.com/bombshellspdx/';
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMedia;
