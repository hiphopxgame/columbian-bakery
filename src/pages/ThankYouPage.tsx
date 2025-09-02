import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-2xl">¡Gracias por tu pedido!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-muted-foreground">
              <p className="mb-4">
                Hemos recibido tu pedido exitosamente. Te contactaremos pronto para confirmar los detalles y coordinar la entrega.
              </p>
              <p>
                Si tienes alguna pregunta, no dudes en contactarnos directamente.
              </p>
            </div>
            
            <div className="pt-6 space-y-4">
              <Button asChild className="w-full">
                <Link to="/">Volver al Inicio</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/order">Hacer Otro Pedido</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThankYouPage;