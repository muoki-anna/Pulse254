import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Shield, Clock, Users, Award, CheckCircle } from "lucide-react";

const donorBenefits = [
  {
    icon: Heart,
    title: "Save Lives",
    description: "One donation can save up to 3 lives"
  },
  {
    icon: Shield,
    title: "Health Check",
    description: "Free mini health screening with every donation"
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Donor appreciation programs and certificates"
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a community of life-savers"
  }
];

const requirements = [
  "Age 18-65 years",
  "Weight at least 50kg",
  "Good general health",
  "No recent illness",
  "Valid ID required"
];

const DonorInfo = () => {
  return (
    <section id="donate" className="py-16">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Donate Blood?
              </h2>
              <p className="text-lg text-muted-foreground">
                Blood donation is a simple act that can make a profound difference. 
                Here's why your contribution matters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {donorBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-4 border-l-4 border-l-medical-red">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Icon className="h-5 w-5 text-medical-red" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Process is Simple</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="w-8 h-8 bg-medical-red text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    1
                  </div>
                  <div className="text-sm font-medium">Register</div>
                  <div className="text-xs text-muted-foreground">Quick form & health check</div>
                </div>
                <div className="text-center p-4">
                  <div className="w-8 h-8 bg-medical-red text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    2
                  </div>
                  <div className="text-sm font-medium">Donate</div>
                  <div className="text-xs text-muted-foreground">10-15 minutes donation</div>
                </div>
                <div className="text-center p-4">
                  <div className="w-8 h-8 bg-medical-red text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    3
                  </div>
                  <div className="text-sm font-medium">Refresh</div>
                  <div className="text-xs text-muted-foreground">Snacks & certificate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Requirements & CTA */}
          <div className="space-y-6">
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle className="h-5 w-5 text-medical-green" />
                  Donor Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-medical-green flex-shrink-0" />
                    <span className="text-sm">{requirement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-medical-red/5 to-medical-blue/5 border-medical-red/20">
              <div className="text-center space-y-4">
                <Clock className="h-12 w-12 text-medical-red mx-auto" />
                <div>
                  <h3 className="text-xl font-bold">Ready to Donate?</h3>
                  <p className="text-muted-foreground">
                    The entire process takes about 30-45 minutes. 
                    Your donation could save 3 lives today.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button variant="hero" size="lg" className="w-full">
                    Schedule Donation
                  </Button>
                   <a href="#blood-requests" className="w-full" >
                  <Button variant="medical" size="lg" className="w-full">
                    Find Blood Requests
                  </Button>
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  No appointment? Walk-ins welcome at most locations.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorInfo;