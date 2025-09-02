
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-bread-brown">
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-1">Phone</h4>
          <p className="text-muted-foreground">(541) 625-3627</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-1">Email</h4>
          <p className="text-muted-foreground">gavabombshellpdx@gmail.com</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-1">Location</h4>
          <p className="text-muted-foreground">Portland, Oregon</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
