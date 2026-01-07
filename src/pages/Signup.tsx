import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordChecks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'Contains number', valid: /[0-9]/.test(password) },
    { label: 'Passwords match', valid: password === confirmPassword && password.length > 0 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setLoading(false);
      if (!username || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
      } else if (password !== confirmPassword) {
        setError('Passwords do not match');
      }
    }, 1500);

    try{
      const login_response = fetch("http://localhost:8080/api/signup",{
        method: "POST",
        headers:{
          "Content-type":"application/json",   //it tells the browser/server that the data it is sending is raw which is not human readable
        },
        body:JSON.stringify({
          username:username,
          email: email,
          password:password,
          // dob:dob,
        }),
      });
    }
    catch(error){
      console.error("error occured while making signup post request: ",error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--cs-green)]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
             <div className="relative">
              <img className='h-10 w-10 relative z-10' src="./logo.png" alt="DARER" />
            </div>
            <span className="text-3xl font-bold text-gradient">DARER</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Create your account</h1>
          <p className="text-muted-foreground mt-2">Join millions of viewers and streamers</p>
        </div>

        {/* Signup Form */}
        <div className="bg-twitch-surface border border-border rounded-lg p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:border-[var(--cs-green)]/30 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[var(--cs-green)] transition-colors" />
                <Input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-black/20 border-border focus-visible:ring-[var(--cs-green)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[var(--cs-green)] transition-colors" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-black/20 border-border focus-visible:ring-[var(--cs-green)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[var(--cs-green)] transition-colors" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-black/20 border-border focus-visible:ring-[var(--cs-green)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[var(--cs-green)] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[var(--cs-green)] transition-colors" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-black/20 border-border focus-visible:ring-[var(--cs-green)]"
                />
              </div>
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="space-y-2 p-3 bg-black/20 border border-border rounded-md">
                {passwordChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${check.valid ? 'bg-[var(--cs-green)]' : 'bg-muted'}`}>
                      {check.valid && <Check className="h-3 w-3 text-black" />}
                    </div>
                    <span className={check.valid ? 'text-[var(--cs-green)]' : 'text-muted-foreground'}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full btn-cyber-brand"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider & OAuth... (same as Login but abbreviated for brevity here as logic is identical) */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-twitch-surface px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
           {/* OAuth Buttons */}
           <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full border-border hover:border-[var(--cs-cyan)] hover:bg-[var(--cs-cyan)]/5">
                Google
            </Button>
            <Button variant="outline" className="w-full border-border hover:border-[var(--cs-green)] hover:bg-[var(--cs-green)]/5">
                GitHub
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-[var(--cs-cyan)] hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-[var(--cs-cyan)] hover:underline">Privacy Policy</Link>
          </p>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--cs-cyan)] hover:underline font-medium hover:text-[var(--cs-green)]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}