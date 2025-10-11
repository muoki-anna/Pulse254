import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, AlertCircle, Droplet, Heart } from "lucide-react";

const bloodRequests = [
  {
    id: 1,
    hospital: "Kenyatta National Hospital",
    bloodType: "O-",
    unitsNeeded: 8,
    urgency: "Critical",
    location: "Central Nairobi",
    distance: "2.3 km",
    deadline: "6 hours",
    contact: "+254 707 819 850",
    description: "Urgent need for emergency surgery patient",
  },
  {
    id: 2,
    hospital: "Kenyatta University Teaching, Referral & Research Hospital",
    bloodType: "A+",
    unitsNeeded: 5,
    urgency: "High",
    location: "Kahawa West",
    distance: "4.1 km",
    deadline: "12 hours",
    contact: "+254 798 765 843",
    description: "Blood needed for scheduled procedures",
  },
  {
    id: 3,
    hospital: "Nairobi West Hospital",
    bloodType: "B+",
    unitsNeeded: 3,
    urgency: "Moderate",
    location: "Westlands",
    distance: "5.8 km",
    deadline: "24 hours",
    contact: "+254 712 345 678",
    description: "Pediatric unit requires blood transfusion",
  },
  {
    id: 4,
    hospital: "Mater Hospital",
    bloodType: "AB-",
    unitsNeeded: 2,
    urgency: "High",
    location: "South B",
    distance: "7.2 km",
    deadline: "8 hours",
    contact: "+254 701 234 567",
    description: "Rare blood type needed for cancer patient",
  },
  {
    id: 5,
    hospital: "Aga Khan University Hospital",
    bloodType: "O+",
    unitsNeeded: 6,
    urgency: "Critical",
    location: "Parklands",
    distance: "3.5 km",
    deadline: "4 hours",
    contact: "+254 720 456 789",
    description: "Multiple trauma cases require immediate transfusion",
  },
  {
    id: 6,
    hospital: "Nairobi Hospital",
    bloodType: "B-",
    unitsNeeded: 3,
    urgency: "High",
    location: "Upper Hill",
    distance: "4.2 km",
    deadline: "9 hours",
    contact: "+254 711 222 333",
    description: "Oncology department critical requirement",
  },
  {
    id: 7,
    hospital: "Gertrude's Children's Hospital",
    bloodType: "A+",
    unitsNeeded: 2,
    urgency: "Critical",
    location: "Muthaiga",
    distance: "6.1 km",
    deadline: "5 hours",
    contact: "+254 722 444 555",
    description: "Pediatric emergency requires urgent transfusion",
  },
  {
    id: 8,
    hospital: "MP Shah Hospital",
    bloodType: "A-",
    unitsNeeded: 4,
    urgency: "High",
    location: "Parklands",
    distance: "3.8 km",
    deadline: "10 hours",
    contact: "+254 733 987 654",
    description: "Maternity ward urgent requirement",
  },
];

const getUrgencyColor = (urgency) => {
  switch (urgency) {
    case "Critical":
      return "bg-red-100 text-red-700 border-red-300";
    case "High":
      return "bg-orange-100 text-orange-700 border-orange-300";
    case "Moderate":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const getButtonStyle = (urgency) => {
  return urgency === "Critical"
    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg";
};

const BloodRequests = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Show only first 3 requests initially, all when showAll is true
  const displayedRequests = showAll ? bloodRequests : bloodRequests.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Droplet className="h-4 w-4" />
            Active Requests
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
            Urgent Blood Requests
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Hospitals near you need your help. Every donation can save up to three lives.
          </p>
        </div>

        {/* Cards Grid - Full Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {displayedRequests.map((request) => (
            <Card
              key={request.id}
              onClick={() =>
                setActiveCard(activeCard === request.id ? null : request.id)
              }
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 border-2 h-full
                ${
                  activeCard === request.id
                    ? "scale-105 shadow-2xl z-10 border-red-400"
                    : "hover:scale-102 hover:shadow-xl border-gray-200"
                }
                ${request.urgency === "Critical" ? "ring-2 ring-red-200" : ""}
              `}
            >
              {/* Critical Indicator Bar */}
              {request.urgency === "Critical" && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-red-500 animate-pulse" />
              )}

              <CardHeader className="pb-3 pt-5 px-4 sm:px-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge
                    className={`text-xs font-semibold border-2 ${getUrgencyColor(
                      request.urgency
                    )} shadow-sm`}
                  >
                    {request.urgency}
                  </Badge>
                  {request.urgency === "Critical" && (
                    <AlertCircle className="h-5 w-5 text-red-600 animate-pulse flex-shrink-0" />
                  )}
                </div>
                <CardTitle className="text-base sm:text-lg font-bold leading-tight pr-2">
                  {request.hospital}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 px-4 sm:px-5 pb-5">
                {/* Blood Type Display */}
                <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-100 shadow-inner">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Droplet className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                    <div className="text-2xl sm:text-3xl font-bold text-red-600">
                      {request.bloodType}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">
                    {request.unitsNeeded} units needed
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="font-medium">
                      {request.location} • {request.distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <Clock className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    <span className="font-medium">
                      Within {request.deadline}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-mono">
                      {request.contact}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
                  {request.description}
                </p>

                {/* Action Button */}
                <Button
                  className={`w-full py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${getButtonStyle(
                    request.urgency
                  )} hover:scale-105`}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Booking appointment for ${request.hospital}`);
                  }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <Button 
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            {showAll ? 'Show Less' : `View All Requests (${bloodRequests.length})`}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BloodRequests;