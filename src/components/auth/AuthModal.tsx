import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
      try {
        if (mode === 'signup') {
          const { error } = await signUp(email, password, fullName);
          if (error) {
            // Gracefully handle existing accounts without touching other projects' data
            const msg = String(error?.message || '').toLowerCase();
            if (msg.includes('already registered') || (error as any)?.status === 422 || (error as any)?.code === 'user_already_exists') {
              toast({
                title: 'Account already exists',
                description: 'Please sign in instead. We switched you to the sign-in form.',
              });
              setMode('signin');
            } else {
              toast({
                title: 'Sign up failed',
                description: (error as any).message || 'Please try again.',
                variant: 'destructive'
              });
            }
          } else {
            toast({
              title: 'Success!',
              description: 'Check your email to confirm your account.'
            });
            onClose();
          }
        } else {
          const { error } = await signIn(email, password);
          if (error) {
            toast({
              title: 'Sign in failed',
              description: error.message,
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Welcome back!',
              description: 'You have been signed in successfully.'
            });
            onClose();
          }
        }
      } finally {
        setLoading(false);
      }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Please wait...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </Button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};