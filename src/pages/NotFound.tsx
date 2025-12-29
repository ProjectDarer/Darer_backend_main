import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--cs-magenta)] via-[var(--cs-cyan)] to-[var(--cs-yellow)]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--cs-magenta)]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center max-w-md relative z-10">
        {/* Glitch Effect Logo Box */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--cs-magenta)] to-[var(--cs-cyan)] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,0,255,0.3)]">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="currentColor">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
          </svg>
        </div>

        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--cs-magenta)] to-[var(--cs-cyan)] mb-4 animate-pulse-slow">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <button className="btn-cyber-brand">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </button>
          </Link>
          <Button 
            variant="ghost" 
            className="border border-border hover:border-[var(--cs-cyan)] hover:text-[var(--cs-cyan)]"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;