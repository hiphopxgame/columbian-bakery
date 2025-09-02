
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Video, Image } from 'lucide-react';

const SocialMedia = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">
          Follow Us
        </CardTitle>
        <p className="text-muted-foreground">
          Stay connected and see behind-the-scenes content
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 mr-2" />
              Instagram
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Video className="w-5 h-5 mr-2" />
              TikTok
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 border-secondary-foreground text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image className="w-5 h-5 mr-2" />
              Pinterest
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMedia;
