import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setLoading(false);
      if (!email) {
        setError('Please enter your email address');
      } else {
        setSent(true);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--cs-cyan)]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="relative">
               <img  className='h-8 w-8 relative z-10' src="./logo.png" alt="DARER" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">DARER</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Reset your password</h1>
          <p className="text-muted-foreground mt-2">
            {sent 
              ? "Check your email for reset instructions" 
              : "Enter your email and we'll send you a reset link"
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-twitch-surface border border-border rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:border-[var(--cs-cyan)]/30 transition-colors duration-300">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-[var(--cs-green)]/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-[var(--cs-green)]">
                <Check className="h-8 w-8 text-[var(--cs-green)]" />
              </div>
              <h3 className="font-semibold mb-2 text-[var(--cs-green)]">Email Sent!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent a password reset link to <strong className="text-foreground">{email}</strong>. 
                Please check your inbox and follow the instructions.
              </p>
              <Button variant="ghost" className="w-full border border-border hover:border-[var(--cs-cyan)]" onClick={() => setSent(false)}>
                Try another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[var(--cs-cyan)] transition-colors" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-black/20 border-border focus-visible:ring-[var(--cs-cyan)]"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full btn-cyber-brand"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Back to Login */}
        <Link 
          to="/login" 
          className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground hover:text-[var(--cs-cyan)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}