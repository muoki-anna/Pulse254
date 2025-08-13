import { Button } from "@/components/ui/button";
import { Heart, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-medical-red" />
          <h1 className="text-xl font-bold text-foreground">LifeConnect</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#donate" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Donate Blood
          </a>
          <a href="#hospitals" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            For Hospitals
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About Us
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="medical" size="sm" className="hidden md:inline-flex">
            Register as Donor
          </Button>
          <Button variant="hero" size="sm">
            Find Blood Drives
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;