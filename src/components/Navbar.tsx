
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { UserRound, LogIn } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { retrieveImage } from '../utils/imageStorage';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Header customization settings
  const [headerHeight, setHeaderHeight] = useState<number>(80);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [logoWidth, setLogoWidth] = useState<number>(120);
  const [logoHorizontalOffset, setLogoHorizontalOffset] = useState<number>(0);
  
  // Menu text customization
  const [menuItems, setMenuItems] = useState([
    { id: 'home', text: 'Home', link: '/' },
    { id: 'about', text: 'Sobre', link: '/about' },
    { 
      id: 'services', 
      text: 'Serviços', 
      link: '/services',
      hasSubmenu: true,
      submenu: [
        { id: 'banho-tosa', text: 'Banho & Tosa', link: '/banho-tosa' },
        { id: 'hospedagem', text: 'Hospedagem', link: '/hospedagem' }
      ] 
    },
    { id: 'price', text: 'Preços', link: '/price' },
    { id: 'contact', text: 'Contato', link: '/contact' }
  ]);
  
  // Load header settings from localStorage and database
  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = localStorage.getItem('landingPageSettings');
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          if (parsedSettings.headerHeight) setHeaderHeight(parsedSettings.headerHeight);
          
          // Handle logo URL - check if it's a database reference
          if (parsedSettings.logoUrl) {
            if (parsedSettings.logoUrl.startsWith('db-image://')) {
              // Load from database
              const logoData = await retrieveImage(parsedSettings.logoUrl);
              if (logoData) {
                setLogoUrl(logoData);
              } else {
                console.warn('Logo image not found in database');
              }
            } else {
              // Regular URL
              setLogoUrl(parsedSettings.logoUrl);
            }
          }
          
          if (parsedSettings.logoWidth) setLogoWidth(parsedSettings.logoWidth);
          if (parsedSettings.logoHorizontalOffset) setLogoHorizontalOffset(parsedSettings.logoHorizontalOffset);
          if (parsedSettings.menuItems && Array.isArray(parsedSettings.menuItems)) {
            setMenuItems(parsedSettings.menuItems);
          }
        } catch (error) {
          console.error('Error parsing header settings:', error);
        }
      }
    };
    
    loadSettings();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setUser(username);
      toast({
        title: "Login successful",
        description: "Welcome back, admin!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUsername('');
    setPassword('');
    toast({
      title: "Logged out",
      description: "You have been logged out",
    });
  };

  return (
    <nav className="flex justify-between items-center" style={{ height: `${headerHeight}px` }}>
      <div className="flex items-center gap-8">
        {logoUrl ? (
          <div style={{ marginLeft: `${logoHorizontalOffset}px` }}>
            <img 
              src={logoUrl} 
              alt="PETISS Logo" 
              className="object-contain"
              style={{ width: `${logoWidth}px`, height: 'auto' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallbackElement = document.createElement('div');
                fallbackElement.className = 'text-pet-orange font-bold text-2xl';
                fallbackElement.innerText = 'PETISS';
                e.currentTarget.parentNode?.appendChild(fallbackElement);
              }}
            />
          </div>
        ) : (
          <div className="text-pet-orange font-bold text-2xl">PETISS</div>
        )}
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <UserRound className="text-pet-orange" />
                  <span>Hi, {user}</span>
                </>
              ) : (
                <>
                  <LogIn className="text-pet-orange" />
                  <span>Login</span>
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isLoggedIn ? "Account" : "Login to CRM"}</DialogTitle>
            </DialogHeader>
            {isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <div>
                  <p>Welcome back, <strong>{user}</strong>!</p>
                  <p className="text-sm text-gray-500">You are logged in as admin</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/crm">
                    <Button className="w-full bg-pet-orange hover:bg-pet-orange/90">
                      Access CRM
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input 
                    id="username"
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input 
                    id="password"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="bg-pet-orange hover:bg-pet-orange/90">
                  Login
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Use username: admin, password: admin
                </p>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="hidden md:flex gap-8">
        {menuItems.map((item) => (
          <div key={item.id} className="relative group">
            <Link to={item.link} className="font-medium py-2 flex items-center">
              {item.text}
              {item.hasSubmenu && <span className="ml-1">▼</span>}
            </Link>
            
            {item.hasSubmenu && item.submenu && (
              <div className="absolute left-0 top-full bg-white shadow-md rounded-md py-2 min-w-[150px] hidden group-hover:block z-10">
                {item.submenu.map((subItem) => (
                  <Link 
                    key={subItem.id} 
                    to={subItem.link} 
                    className="block px-4 py-2 hover:bg-gray-100 font-medium"
                  >
                    {subItem.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
