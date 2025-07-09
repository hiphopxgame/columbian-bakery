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
    '/lovable-uploads/d19d4938-15fa-41fc-a515-47093ac4239a.png',
    '/lovable-uploads/a2ef11b1-af95-4824-b397-ccc6e2e537ab.png',
    '/lovable-uploads/871ce97d-7c8b-45c1-bc72-42a33c3e2956.png',
    '/lovable-uploads/3158bddf-4527-4a8b-940c-5b0ef15c6d57.png',
    '/lovable-uploads/c03fd8e2-7379-427a-aace-4c30e2e41f14.png',
    '/lovable-uploads/3bac3804-1983-4829-82b1-3db97a1856d2.png',
    '/lovable-uploads/b6885ed7-b5a7-4f96-b04a-74819abd3824.png',
    '/lovable-uploads/a9d2895e-7072-49a0-8e6a-407e9c11b741.png'
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