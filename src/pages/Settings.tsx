import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { userProfile } from '@/data/dummy';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Link2, 
  Save,
  Camera,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SettingsTab = 'general' | 'security' | 'notifications' | 'appearance' | 'connections';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [username, setUsername] = useState(userProfile.username);
  const [displayName, setDisplayName] = useState(userProfile.displayName);
  const [email, setEmail] = useState(userProfile.email);
  const [bio, setBio] = useState(userProfile.bio);
  const [saved, setSaved] = useState(false);
  const [user_data,setuser_data] = useState(null);

  const tabs = [
    { id: 'general' as const, label: 'General', icon: User },
    // { id: 'security' as const, label: 'Security', icon: Shield },
    // { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    // { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    // { id: 'connections' as const, label: 'Connections', icon: Link2 },
  ];
  useEffect(()=>{
    const fetchuser = async()=>{
      const res = await fetch("http://localhost:8080/api/get_profiledata");
      const res_data = await res.json();
      setuser_data(res_data.data);
    };
    fetchuser();
  },[]);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    const saveProfileresponse = fetch("http://localhost:8080/api/updateProfile",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify({
        username:username,
        bio:bio,
        // profile_picture:profile_picture,
      })
    });
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gradient">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-48 flex-shrink-0 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
                  activeTab === tab.id 
                    ? "bg-[var(--cs-cyan)]/20 text-[var(--cs-cyan)] border-l-2 border-[var(--cs-cyan)]" 
                    : "hover:bg-twitch-hover text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1 bg-twitch-surface rounded-lg p-6 border border-border">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--cs-cyan)]">Profile Settings</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.displayName}
                      className="w-20 h-20 rounded-full ring-2 ring-[var(--cs-magenta)]"
                    />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--cs-magenta)] rounded-full flex items-center justify-center hover:bg-[var(--cs-magenta)]/80 transition-colors shadow-lg">
                      <Camera className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium">Profile Picture</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-cyan)]">Username</label>
                    <Input 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-black/20 focus-visible:ring-[var(--cs-cyan)]"
                    />
                    <p className="text-xs text-muted-foreground mt-1">DARER.tv/{username}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-green)]">Display Name</label>
                    <Input 
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-black/20 focus-visible:ring-[var(--cs-green)]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-yellow)]">Bio</label>
                    <textarea 
                      className="w-full h-24 px-3 py-2 bg-black/20 border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--cs-yellow)]"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      maxLength={300}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{bio.length}/300</p>
                  </div>
                </div>

                <button className="btn-cyber-brand" onClick={handleSave}>
                  {saved ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Other tabs follow similar styling patterns */}
            {/* {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--cs-cyan)]">Security Settings</h2> */}
                {/* ... existing structure with updated inputs ... */}
                {/* <div className="space-y-4">
                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <div className="space-y-3">
                      <Input type="password" placeholder="Current password" className="bg-black/20" />
                      <Input type="password" placeholder="New password" className="bg-black/20" />
                      <Input type="password" placeholder="Confirm new password" className="bg-black/20" />
                    </div>
                    <Button variant="outline" className="mt-4 border-[var(--cs-magenta)] text-[var(--cs-magenta)] hover:bg-[var(--cs-magenta)] hover:text-white">Update Password</Button>
                  </div>
                </div>
              </div>
            )} */}

            {/* Appearance Tab with Brand Colors */}
            {/* {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--cs-cyan)]">Appearance</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <h3 className="font-medium mb-4">Theme</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['Dark', 'Light', 'System'].map((theme) => (
                        <button 
                          key={theme}
                          className={cn(
                            "p-4 rounded-lg border-2 transition-colors",
                            theme === 'Dark' ? "border-[var(--cs-cyan)] bg-[var(--cs-cyan)]/10" : "border-border hover:border-muted-foreground"
                          )}
                        >
                          <p className="font-medium">{theme}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <h3 className="font-medium mb-4">Accent Color</h3>
                    <div className="flex gap-3">
                      {['#ff00ff', '#00fff7', '#39ff14', '#ffff00'].map((color) => (
                        <button 
                          key={color}
                          className={cn(
                            "w-10 h-10 rounded-full transition-transform hover:scale-110 ring-2 ring-transparent hover:ring-white",
                          )}
                          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )} */}
            
            {/* {activeTab === 'notifications' && (
                 <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--cs-cyan)]">Notification Preferences</h2>
                 <div className="space-y-4">
                  {[
                    { id: 'email', label: 'Email Notifications', desc: 'Receive email updates about your channel' },
                    { id: 'push', label: 'Push Notifications', desc: 'Get notified when streamers go live' },
                  ].map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-background/50 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{setting.label}</p>
                        <p className="text-sm text-muted-foreground">{setting.desc}</p>
                      </div>
                      <button className="w-12 h-6 bg-[var(--cs-green)] rounded-full relative">
                        <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
            
             {/* {activeTab === 'connections' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--cs-cyan)]">Connected Accounts</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Google', connected: true },
                    { name: 'Discord', connected: true },
                    { name: 'Twitter', connected: false },
                  ].map((account) => (
                    <div key={account.name} className="flex items-center justify-between p-4 bg-background/50 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {account.connected ? <span className="text-[var(--cs-green)]">Connected</span> : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <Button variant={account.connected ? 'destructive' : 'outline'} className={!account.connected ? "border-[var(--cs-cyan)] text-[var(--cs-cyan)] hover:bg-[var(--cs-cyan)]/10" : ""}>
                        {account.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

          </div>
        </div>
      </div>
    </MainLayout>
  );
}