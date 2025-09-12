import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';

export const CartSidebar: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, loading } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-muted-foreground">Loading cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 space-y-4">
        <p className="text-muted-foreground">Your cart is empty</p>
        <Button onClick={() => navigate('/catalog')} variant="outline">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 py-4">
        {items.map((item) => (
          <Card key={item.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">{item.productName}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              
              {item.doughType && (
                <Badge variant="outline" className="mr-2 mb-2 text-xs">
                  {item.doughType}
                </Badge>
              )}
              {item.filling && (
                <Badge variant="outline" className="mr-2 mb-2 text-xs">
                  {item.filling}
                </Badge>
              )}
              
              {item.specialInstructions && (
                <p className="text-xs text-muted-foreground mb-2">
                  Note: {item.specialInstructions}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="text-sm font-semibold text-guava-pink">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="border-t pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-guava-pink">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-guava-pink hover:bg-guava-pink/90 text-coconut-white"
            onClick={() => navigate('/order')}
          >
            Proceed to Checkout
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};