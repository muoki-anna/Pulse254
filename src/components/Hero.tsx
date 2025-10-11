import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Users, Heart } from "lucide-react";
import heroImage from "@/assets/life-saver4.jpg";
const Hero = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-blue-500/5" />

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Save Lives with
                <span className="text-red-600"> Every Drop</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg">
                Connect hospitals in need with volunteers ready to donate. Join
                our community and help save lives in your area.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <Card className="p-3 sm:p-4 text-center border-red-200 hover:border-red-300 transition-all hover:shadow-md">
                <div className="text-xl sm:text-2xl font-bold text-red-600">2,847</div>
                <div className="text-xs sm:text-sm text-gray-600">Lives Saved</div>
              </Card>
              <Card className="p-3 sm:p-4 text-center border-blue-200 hover:border-blue-300 transition-all hover:shadow-md">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">156</div>
                <div className="text-xs sm:text-sm text-gray-600">Hospitals</div>
              </Card>
              <Card className="p-3 sm:p-4 text-center border-green-200 hover:border-green-300 transition-all hover:shadow-md">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  5,432
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Donors</div>
              </Card>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#donate" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-6 text-base sm:text-lg rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg"
                >
                  <Heart className="h-5 w-5" />
                  Donate Blood Now
                </Button>
              </a>
              <Button
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-6 py-6 text-base sm:text-lg rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <MapPin className="h-5 w-5" />
                Find Nearby Drives
              </Button>
            </div>

            {/* Quick info */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span>Process takes 30-45 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>One donation saves 3 lives</span>
              </div>
            </div>
          </div>

          
          <div className="relative w-full">
  {/* Image */}
<div className="relative">
  <div className="aspect-[4/3] sm:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
    <img
      src={heroImage}
      alt="Blood donation drive with volunteers and medical staff"
      className="w-full h-full object-cover"
    />
  </div>
</div>

</div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-red-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
    </section>
  );    
};

export default Hero;