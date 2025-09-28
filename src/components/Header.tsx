import { Button } from "@/components/ui/button";
import { Heart, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/20">
            <Heart className="h-6 w-6 text-red-600 dark:text-red-400 fill-current" />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Pulse254
          </h1>
        </div>

        {/* Navigation Section */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#donate"
            className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-1 group"
          >
            Donate Blood
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
          </a>
          <a
            href="#hospitals"
            className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-1 group"
          >
            For Hospitals
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
          </a>
          <a
            href="#about"
            className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-1 group"
          >
            About Us
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
          </a>
        </nav>

        {/* Action Buttons Section */}
        <div className="flex items-center gap-3">
          <a href="#BloodRequests" className="hidden sm:block">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/20 transition-colors duration-200"
            >
              Find Blood Drives
            </Button>
          </a>
          
          <a href="#emergency" className="hidden sm:block">
            <Button 
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors duration-200"
            >
              Emergency Request
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;