import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Hospital, Target, CheckCircle, Award } from "lucide-react";

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion First",
      description: "Every life matters. We connect donors with those in critical need with empathy and urgency."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Building a network of heroes across Kenya who believe in the power of giving."
    },
    {
      icon: Target,
      title: "Mission Focused",
      description: "Eliminating blood shortages through technology, education, and rapid mobilization."
    },
    {
      icon: Award,
      title: "Transparency",
      description: "Clear communication and accountability in every donation journey from donor to recipient."
    }
  ];

  const milestones = [
    { number: "2,847+", label: "Lives Saved" },
    { number: "156", label: "Partner Hospitals" },
    { number: "5,432", label: "Active Donors" },
    { number: "47", label: "Counties Reached" }
  ];

  const impact = [
    "Real-time matching of blood donors with hospitals in need",
    "24/7 emergency response system for critical cases",
    "Community blood drives organized across all counties",
    "Educational programs on blood donation importance",
    "Mobile alerts for urgent blood requirements",
    "Safe and verified donation process"
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="h-4 w-4" />
            About Pulse 254
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Connecting <span className="text-red-600">Hearts</span> to Save Lives
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Pulse 254 is Kenya's leading blood donation network, bridging the gap between hospitals 
            facing critical blood shortages and compassionate volunteers ready to donate. Through 
            technology and community mobilization, we're ensuring that no patient suffers due to 
            lack of blood.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-6xl mx-auto">
          <Card className="p-6 sm:p-8 border-2 border-red-100 hover:border-red-200 transition-all hover:shadow-lg">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To eliminate preventable deaths caused by blood shortages in Kenya by creating 
              an efficient, technology-driven ecosystem that connects willing donors with 
              hospitals in need, saving lives one drop at a time.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 border-2 border-blue-100 hover:border-blue-200 transition-all hover:shadow-lg">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Hospital className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A Kenya where every hospital has immediate access to safe blood when needed, 
              and every citizen understands the life-saving power they hold. We envision 
              a future with zero blood shortage-related deaths.
            </p>
          </Card>
        </div>

        {/* Milestones */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">Our Impact</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {milestones.map((milestone, index) => (
              <Card 
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all border-2 hover:border-red-200"
              >
                <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
                  {milestone.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600">{milestone.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-lg transition-all border hover:border-red-200"
                >
                  <div className="bg-gradient-to-br from-red-50 to-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-red-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* What We Do */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">What We Do</h3>
          <Card className="p-6 sm:p-8 lg:p-10 border-2 border-gray-200">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {impact.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-8 sm:p-10 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Join the Pulse 254 Movement
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
              Whether you're a donor, hospital, or supporter, there's a place for you 
              in our life-saving community. Together, we can ensure no one waits for blood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-base rounded-lg hover:scale-105 transition-transform">
                <Heart className="h-5 w-5 mr-2" />
                Become a Donor
              </Button>
              <Button className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-6 text-base rounded-lg hover:scale-105 transition-transform">
                <Hospital className="h-5 w-5 mr-2" />
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;