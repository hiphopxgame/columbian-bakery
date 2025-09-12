import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const BombshellGallery = () => {
  const images = [
    '/lovable-uploads/bombshell-classic-new.jpg',
    '/lovable-uploads/43147ce4-8157-4c4a-9198-abf9f5baae8a.png',
    '/lovable-uploads/4809ef95-b0a8-4409-a91e-65ea30799e62.png'
  ];

  return (
    <div className="relative">
      <Carousel className="w-full max-w-md mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square bg-gradient-to-br from-dulce-caramel/10 to-guava-pink/10 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src={image}
                  alt={`Bombshell pastry ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      <div className="text-center mt-4">
        <p className="text-lg font-medium text-bread-brown">Bombshell Cross-Section</p>
        <p className="text-sm text-muted-foreground">Golden yuca pastry with creamy guava filling</p>
      </div>
    </div>
  );
};

export default BombshellGallery;