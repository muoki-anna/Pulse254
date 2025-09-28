import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Users, Heart } from "lucide-react";
import heroImage from "@/assets/hero-blood-donation.jpg";

const Hero = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-medical-red/5 to-medical-blue/5" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Save Lives with
                <span className="text-medical-red"> Every Drop</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect hospitals in need with volunteers ready to donate. Join
                our community and help save lives in your area.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center border-medical-red/20">
                <div className="text-2xl font-bold text-medical-red">2,847</div>
                <div className="text-sm text-muted-foreground">Lives Saved</div>
              </Card>
              <Card className="p-4 text-center border-medical-blue/20">
                <div className="text-2xl font-bold text-medical-blue">156</div>
                <div className="text-sm text-muted-foreground">Hospitals</div>
              </Card>
              <Card className="p-4 text-center border-medical-green/20">
                <div className="text-2xl font-bold text-medical-green">
                  5,432
                </div>
                <div className="text-sm text-muted-foreground">Donors</div>
              </Card>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#donate">
                <Button
                  variant="hero"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <Heart className="h-5 w-5" />
                  Donate Blood Now
                </Button>
              </a>
              <Button
                variant="medical"
                size="lg"
                className="flex items-center gap-2"
              >
                <MapPin className="h-5 w-5" />
                Find Nearby Drives
              </Button>
            </div>

            {/* Quick info */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-medical-blue" />
                <span>Process takes 30-45 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-medical-green" />
                <span>One donation saves 3 lives</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Blood donation drive with volunteers and medical staff"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <Card className="absolute -bottom-6 -left-6 p-4 bg-background shadow-xl border-medical-red/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-medical-green rounded-full animate-pulse" />
                <div>
                  <div className="text-sm font-medium">Blood Drive Active</div>
                  <div className="text-xs text-muted-foreground">
                    City Hospital - 2.3km away
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
