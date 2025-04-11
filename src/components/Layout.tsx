
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Home, 
  User, 
  CreditCard, 
  Calendar, 
  Dumbbell, 
  Users, 
  Menu, 
  X, 
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    // Implement actual logout logic here
    toast({
      title: "Çıkış Yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
    navigate("/login");
  };
  
  const menuItems = [
    { name: "Ana Sayfa", path: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { name: "Profil", path: "/profile", icon: <User className="h-5 w-5" /> },
    { name: "Üyelik", path: "/memberships", icon: <CreditCard className="h-5 w-5" /> },
    { name: "Randevular", path: "/appointments", icon: <Calendar className="h-5 w-5" /> },
    { name: "Egzersizler", path: "/exercises", icon: <Dumbbell className="h-5 w-5" /> },
    { name: "Eğitmenler", path: "/instructors", icon: <Users className="h-5 w-5" /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex flex-col w-64 p-5 bg-muted/50 border-r">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold text-primary">Reformer Pro</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center p-3 rounded-lg transition-colors ${
                isActive(item.path) 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted text-foreground"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <Button 
          variant="ghost" 
          className="mt-auto flex items-center justify-start" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Çıkış Yap
        </Button>
      </aside>
      
      {/* Mobile sidebar */}
      <aside 
        className={`fixed inset-0 z-40 lg:hidden bg-background transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-5">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-semibold text-primary">Reformer Pro</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted text-foreground"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <Button 
            variant="ghost" 
            className="mt-auto flex items-center justify-start" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Çıkış Yap
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-5 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
