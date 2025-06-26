
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Video, Image } from 'lucide-react';

const SocialMedia = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-bread-brown">
          Follow Us
        </CardTitle>
        <p className="text-muted-foreground">
          Stay connected and see behind-the-scenes content
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 border-guava-pink text-guava-pink hover:bg-guava-pink hover:text-coconut-white"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Instagram
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 border-bread-brown text-bread-brown hover:bg-bread-brown hover:text-coconut-white"
          >
            <Video className="w-5 h-5 mr-2" />
            TikTok
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 border-dulce-caramel text-dulce-caramel hover:bg-dulce-caramel hover:text-coconut-white"
          >
            <Image className="w-5 h-5 mr-2" />
            Pinterest
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMedia;
