import { Button } from "../components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onOpenDonorModal: () => void;
}

const Header = ({ onOpenDonorModal }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleDonorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenDonorModal();
    closeMobileMenu();
  };

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

        {/* Desktop Navigation Section */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={handleDonorClick}
            className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-1 group bg-transparent border-0 cursor-pointer"
          >
            Register as Donor
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
          </button>
          
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDonorClick}
            className="hidden sm:block border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/20 transition-colors duration-200"
          >
            Register as Donor
          </Button>
          
          <a href="#blood-requests" className="hidden sm:block">
            <Button 
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors duration-200"
            >
              Blood Requests
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="container py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <button
                onClick={handleDonorClick}
                className="block w-full text-left py-3 px-4 text-base font-medium text-foreground hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              >
                Register as Donor
              </button>
              
              <a
                href="#about"
                className="block py-3 px-4 text-base font-medium text-foreground hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                About Us
              </a>
            </div>

            {/* Mobile Action Buttons */}
            <div className="space-y-3 pt-2 border-t">
              <Button 
                variant="outline" 
                onClick={handleDonorClick}
                className="w-full justify-center border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/20 transition-colors duration-200"
              >
                Register as Donor
              </Button>
              
              <a 
                href="#blood-requests" 
                className="block w-full"
                onClick={closeMobileMenu}
              >
                <Button 
                  className="w-full justify-center bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors duration-200"
                >
                  Blood Requests
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;