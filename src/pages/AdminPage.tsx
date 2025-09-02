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
import { ArrowLeft, Package, MessageSquare, Mail, FileText, Users, Crown, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';

interface CbakeProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

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

interface NewsletterSubscription {
  id: string;
  email: string;
  status: string;
  created_at: string;
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

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, isAdmin, loading: authLoading } = useAuth();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [profiles, setProfiles] = useState<CbakeProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (isAdmin) {
        fetchData();
      } else {
        setLoading(false);
      }
    }
  }, [isAdmin, authLoading]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('cbake_orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (ordersError) {
        console.error('Orders error:', ordersError);
        toast({ title: 'Error fetching orders', description: ordersError.message, variant: 'destructive' });
      } else {
        setOrders(ordersData || []);
      }

      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('cbake_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (messagesError) {
        console.error('Messages error:', messagesError);
      } else {
        setMessages(messagesData || []);
      }

      // Fetch user profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('cbake_profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) {
        console.error('Profiles error:', profilesError);
      } else {
        setProfiles(profilesData || []);
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

  const toggleUserAdmin = async (userId: string, currentAdminStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('cbake_profiles')
        .update({ is_admin: !currentAdminStatus })
        .eq('user_id', userId);

      if (error) throw error;

      setProfiles(prev => prev.map(profile => 
        profile.user_id === userId ? { ...profile, is_admin: !currentAdminStatus } : profile
      ));

      toast({
        title: "Success",
        description: `User ${!currentAdminStatus ? 'promoted to' : 'removed from'} admin.`,
      });
    } catch (error) {
      console.error('Error updating user admin status:', error);
      toast({
        title: "Error",
        description: "Failed to update user admin status.",
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bread-brown mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Admin Access Required</CardTitle>
                <CardDescription>
                  {!user ? 'You must be signed in to access the admin panel.' : 'You do not have admin privileges.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!user ? (
                  <Button onClick={() => setAuthModalOpen(true)} className="w-full">
                    Sign In
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Contact an administrator to request admin access.
                    </p>
                    <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                      Return to Home
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
        />
      </div>
    );
  }

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
                  Welcome back, {profile?.full_name || user.email}
                </p>
              </div>
              <Badge variant="secondary" className="bg-guava-pink/10 text-guava-pink">
                <Crown className="w-4 h-4 mr-1" />
                Admin
              </Badge>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  <Users className="h-8 w-8 text-bread-brown" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Users</p>
                    <p className="text-2xl font-bold text-foreground">{profiles.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Tables */}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
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
                          <TableHead>Type</TableHead>
                          <TableHead>Quantity</TableHead>
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
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">{order.order_type.replace('-', ' ')}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
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

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage user accounts and admin privileges
                  </CardDescription>
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
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {profiles.map((userProfile) => (
                          <TableRow key={userProfile.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{userProfile.full_name || 'No name'}</p>
                                <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {userProfile.is_admin ? (
                                  <Badge className="bg-guava-pink/10 text-guava-pink">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Admin
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary">
                                    <Shield className="w-3 h-3 mr-1" />
                                    User
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(userProfile.created_at)}</TableCell>
                            <TableCell>{formatDate(userProfile.updated_at)}</TableCell>
                            <TableCell>
                              {userProfile.user_id !== user.id && (
                                <Button
                                  variant={userProfile.is_admin ? "destructive" : "outline"}
                                  size="sm"
                                  onClick={() => toggleUserAdmin(userProfile.user_id, userProfile.is_admin)}
                                >
                                  {userProfile.is_admin ? 'Remove Admin' : 'Make Admin'}
                                </Button>
                              )}
                              {userProfile.user_id === user.id && (
                                <Badge variant="outline" className="text-xs">
                                  You
                                </Badge>
                              )}
                            </TableCell>
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