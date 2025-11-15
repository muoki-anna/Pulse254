import { Heart, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "../components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-medical-red" />
              <h3 className="text-xl font-bold">LifeConnect</h3>
            </div>
            <p className="text-sm text-background/80 leading-relaxed">
              Connecting lives through blood donation. Join our mission to save lives 
              and strengthen communities across the region.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-background/10">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#donate" className="text-background/80 hover:text-background transition-colors">Donate Blood</a></li>
              <li><a href="#hospitals" className="text-background/80 hover:text-background transition-colors">For Hospitals</a></li>
              <li><a href="#about" className="text-background/80 hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Eligibility</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Blood Types</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Donation Process</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Health Benefits</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">FAQs</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-medical-red" />
                <span className="text-background/80">info@lifeconnect.org</span>
              </div>
              <p className="text-background/70 leading-relaxed">
                Have questions? We're here to help! Reach out to us via email 
                and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/60">
            © 2024 LifeConnect. All rights reserved. Saving lives, one donation at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;