import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Package, MessageSquare, Mail, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';


interface Order {
  id: string;
  name: string;
  email: string;
  phone?: string;
  order_type: string;
  quantity: number;
  dough_type: string;
  filling: string;
  delivery: string;
  special_instructions?: string;
  estimated_total?: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  inquiry_type: string;
  message: string;
  status: string;
  created_at: string;
  user_id?: string;
}

interface Quote {
  id: string;
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  event_type?: string;
  guest_count?: number;
  event_date?: string;
  catering_services?: any;
  special_requirements?: string;
  status: string;
  quoted_amount?: number;
  admin_notes?: string;
  created_at: string;
}

interface NewsletterSubscription {
  id: string;
  email: string;
  created_at: string;
}

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);  
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    
    // Set up real-time subscription for new orders
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'cbake_orders'
        },
        (payload) => {
          console.log('New order received:', payload);
          setOrders(prev => [payload.new as Order, ...prev]);
          toast({
            title: "New Order Received!",
            description: `Order from ${payload.new.name} - $${payload.new.estimated_total}`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'cbake_orders'
        },
        (payload) => {
          console.log('Order updated:', payload);
          setOrders(prev => prev.map(order => 
            order.id === payload.new.id ? payload.new as Order : order
          ));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      console.log('Starting to fetch admin data...');
      
      const [ordersResult, messagesResult, quotesResult, newslettersResult] = await Promise.all([
        // Fetch orders
        supabase
          .from('cbake_orders')
          .select('*')
          .order('created_at', { ascending: false }),
        
        // Fetch messages  
        supabase
          .from('cbake_messages')
          .select('*')
          .order('created_at', { ascending: false }),
        
        // Fetch catering quotes
        supabase
          .from('cbake_quotes')
          .select('*')
          .order('created_at', { ascending: false }),
          
        // Fetch newsletter subscriptions
        supabase
          .from('cbake_newsletter_subscriptions')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      console.log('Orders result:', ordersResult);
      console.log('Messages result:', messagesResult);
      console.log('Quotes result:', quotesResult);
      console.log('Newsletters result:', newslettersResult);

      if (ordersResult.error) {
        console.error('Orders error:', ordersResult.error);
        toast({ title: 'Error fetching orders', description: ordersResult.error.message, variant: 'destructive' });
      } else {
        console.log('Setting orders:', ordersResult.data);
        setOrders(ordersResult.data || []);
      }

      if (messagesResult.error) {
        console.error('Messages error:', messagesResult.error);
      } else {
        setMessages(messagesResult.data || []);
      }

      if (quotesResult.error) {
        console.error('Quotes error:', quotesResult.error);
      } else {
        setQuotes(quotesResult.data || []);
      }

      if (newslettersResult.error) {
        console.error('Newsletter error:', newslettersResult.error);
      } else {
        setNewsletters(newslettersResult.data || []);
      }

    } catch (error) {
      console.error('Unexpected error fetching data:', error);
      toast({ title: 'Error', description: 'An unexpected error occurred', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('cbake_orders')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setOrders(prev => prev.map(order => 
        order.id === id ? { ...order, status } : order
      ));

      toast({
        title: "Success",
        description: "Order status updated.",
      });
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('cbake_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setMessages(prev => prev.map(message => 
        message.id === id ? { ...message, status } : message
      ));

      toast({
        title: "Success",
        description: "Message status updated.",
      });
    } catch (error) {
      console.error('Error updating message:', error);
      toast({
        title: "Error",
        description: "Failed to update message status.",
        variant: "destructive",
      });
    }
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('cbake_quotes')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setQuotes(prev => prev.map(quote => 
        quote.id === id ? { ...quote, status } : quote
      ));

      toast({
        title: "Success",
        description: "Quote status updated.",
      });
    } catch (error) {
      console.error('Error updating quote:', error);
      toast({
        title: "Error",
        description: "Failed to update quote status.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': case 'active': return 'bg-green-100 text-green-800';
      case 'completed': case 'resolved': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'new': return 'bg-purple-100 text-purple-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-serif font-bold text-bread-brown mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage your bakery operations
                </p>
              </div>
              <Badge variant="secondary" className="bg-guava-pink/10 text-guava-pink">
                Admin
              </Badge>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-bread-brown" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Orders</p>
                    <p className="text-2xl font-bold text-foreground">{orders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-bread-brown" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Messages</p>
                    <p className="text-2xl font-bold text-foreground">{messages.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-bread-brown" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Catering Requests</p>
                    <p className="text-2xl font-bold text-foreground">{quotes.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Mail className="h-8 w-8 text-bread-brown" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Newsletter Subscribers</p>
                    <p className="text-2xl font-bold text-foreground">{newsletters.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Tables */}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="catering">Catering</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Orders Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bread-brown"></div>
                    </div>
                  ) : (
                    <Table>
                       <TableHeader>
                         <TableRow>
                           <TableHead>Customer</TableHead>
                           <TableHead>Product</TableHead>
                           <TableHead>Type</TableHead>
                           <TableHead>Quantity</TableHead>
                           <TableHead>Delivery</TableHead>
                           <TableHead>Total</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Date</TableHead>
                           <TableHead>Actions</TableHead>
                         </TableRow>
                       </TableHeader>
                      <TableBody>
                         {orders.map((order) => (
                           <TableRow key={order.id}>
                             <TableCell>
                               <div>
                                 <p className="font-medium">{order.name}</p>
                                 <p className="text-sm text-muted-foreground">{order.email}</p>
                                 {(order as any).business_location && (
                                   <p className="text-xs text-muted-foreground">📍 {(order as any).business_location}</p>
                                 )}
                               </div>
                             </TableCell>
                             <TableCell>
                               <div>
                                 <p className="font-medium">{(order as any).product_name || 'N/A'}</p>
                                 {order.special_instructions && (
                                   <p className="text-xs text-muted-foreground truncate max-w-32">
                                     {order.special_instructions}
                                   </p>
                                 )}
                               </div>
                             </TableCell>
                             <TableCell className="capitalize">{order.order_type.replace('-', ' ')}</TableCell>
                             <TableCell>{order.quantity} unit{order.quantity > 1 ? 's' : ''}</TableCell>
                             <TableCell className="capitalize">{order.delivery}</TableCell>
                             <TableCell>${order.estimated_total || 0}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(order.created_at)}</TableCell>
                            <TableCell>
                              <Select
                                value={order.status}
                                onValueChange={(value) => updateOrderStatus(order.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="in_progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bread-brown"></div>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>From</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {messages.map((message) => (
                          <TableRow key={message.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{message.name}</p>
                                <p className="text-sm text-muted-foreground">{message.email}</p>
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">{message.inquiry_type}</TableCell>
                            <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(message.status)}>
                                {message.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(message.created_at)}</TableCell>
                            <TableCell>
                              <Select
                                value={message.status}
                                onValueChange={(value) => updateMessageStatus(message.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="read">Read</SelectItem>
                                  <SelectItem value="replied">Replied</SelectItem>
                                  <SelectItem value="resolved">Resolved</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="catering">
              <Card>
                <CardHeader>
                  <CardTitle>Catering Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bread-brown"></div>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Event</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Guests</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Quote</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quotes.map((quote) => (
                          <TableRow key={quote.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{quote.name}</p>
                                <p className="text-sm text-muted-foreground">{quote.email}</p>
                                {quote.business_name && (
                                  <p className="text-sm text-muted-foreground">{quote.business_name}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">{quote.event_type || 'N/A'}</TableCell>
                            <TableCell>
                              {quote.event_date ? new Date(quote.event_date).toLocaleDateString() : 'N/A'}
                            </TableCell>
                            <TableCell>{quote.guest_count || 'N/A'}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(quote.status)}>
                                {quote.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {quote.quoted_amount ? `$${quote.quoted_amount}` : 'Pending'}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={quote.status}
                                onValueChange={(value) => updateQuoteStatus(quote.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="quoted">Quoted</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="newsletter">
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bread-brown"></div>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Subscribed Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newsletters.map((newsletter) => (
                          <TableRow key={newsletter.id}>
                            <TableCell className="font-medium">{newsletter.email}</TableCell>
                            <TableCell>{formatDate(newsletter.created_at)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;