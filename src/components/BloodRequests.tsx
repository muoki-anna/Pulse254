import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, AlertCircle } from "lucide-react";

const bloodRequests = [
  {
    id: 1,
    hospital: "City General Hospital",
    bloodType: "O-",
    unitsNeeded: 8,
    urgency: "Critical",
    location: "Downtown Medical District",
    distance: "2.3 km",
    deadline: "6 hours",
    contact: "+1 (555) 123-4567",
    description: "Urgent need for emergency surgery patient"
  },
  {
    id: 2,
    hospital: "St. Mary's Medical Center",
    bloodType: "A+",
    unitsNeeded: 5,
    urgency: "High",
    location: "Westside",
    distance: "4.1 km",
    deadline: "12 hours",
    contact: "+1 (555) 987-6543",
    description: "Blood needed for scheduled procedures"
  },
  {
    id: 3,
    hospital: "Children's Hospital",
    bloodType: "B+",
    unitsNeeded: 3,
    urgency: "Moderate",
    location: "North District",
    distance: "5.8 km",
    deadline: "24 hours",
    contact: "+1 (555) 456-7890",
    description: "Pediatric unit requires blood transfusion"
  },
  {
    id: 4,
    hospital: "Regional Medical Center",
    bloodType: "AB-",
    unitsNeeded: 2,
    urgency: "High",
    location: "East Side",
    distance: "7.2 km",
    deadline: "8 hours",
    contact: "+1 (555) 654-3210",
    description: "Rare blood type needed for cancer patient"
  }
];

const getUrgencyVariant = (urgency: string) => {
  switch (urgency) {
    case "Critical": return "urgent";
    case "High": return "critical";
    case "Moderate": return "needed";
    default: return "default";
  }
};

const BloodRequests = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Urgent Blood Requests
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hospitals near you need your help. Every donation can save up to three lives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bloodRequests.map((request) => (
            <Card key={request.id} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              {request.urgency === "Critical" && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-urgent to-medical-red" />
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant={getUrgencyVariant(request.urgency)} className="text-xs">
                    {request.urgency}
                  </Badge>
                  {request.urgency === "Critical" && (
                    <AlertCircle className="h-4 w-4 text-urgent animate-pulse" />
                  )}
                </div>
                <CardTitle className="text-lg">{request.hospital}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-medical-red">{request.bloodType}</div>
                  <div className="text-sm text-muted-foreground">
                    {request.unitsNeeded} units needed
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{request.location} • {request.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Needed within {request.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span className="text-xs">{request.contact}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {request.description}
                </p>

                <div className="pt-2">
                  <Button 
                    variant={request.urgency === "Critical" ? "urgent" : "hero"} 
                    className="w-full"
                    size="sm"
                  >
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="medical" size="lg">
            View All Requests
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BloodRequests;