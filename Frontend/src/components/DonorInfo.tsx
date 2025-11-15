import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Shield, Clock, Users, Award, CheckCircle, X, Droplets, User, Mail, Phone, Calendar, Loader2, MapPin, Scale, Hash } from "lucide-react";
import { useState } from "react";
import { registerDonor, type DonorRegistrationData } from "../services/api";

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

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Modal Component
const DonorRegistrationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodType: "",
    age: "",
    weight: "",
    address: "",
    city: "",
    idNumber: "",
    hasDonatedBefore: "",
    lastDonationDate: "",
    healthConditions: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('📤 Submitting donor registration data:', formData);

      const donorData: DonorRegistrationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        bloodType: formData.bloodType,
        age: parseInt(formData.age),
        weight: parseInt(formData.weight),
        address: formData.address,
        city: formData.city,
        idNumber: formData.idNumber,
        hasDonatedBefore: formData.hasDonatedBefore === "true",
        lastDonationDate: formData.lastDonationDate || undefined,
        healthConditions: formData.healthConditions || ""
      };

      console.log('🚀 Sending to donor registration API:', donorData);

      const result = await registerDonor(donorData);

      console.log("✅ Donor registration successful:", result);

      // Show success message with donor ID
      alert(`✅ Registration Successful!\n\nThank you ${result.donor.fullName}! You are now registered as a blood donor.\n\nDonor ID: ${result.donor._id}\n\nWe will contact you at ${result.donor.email} when your blood type ${result.donor.bloodType} is needed.`);

      onClose();

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        bloodType: "",
        age: "",
        weight: "",
        address: "",
        city: "",
        idNumber: "",
        hasDonatedBefore: "",
        lastDonationDate: "",
        healthConditions: ""
      });
    } catch (error) {
      console.error("❌ Registration failed:", error);

      const errorMessage = error instanceof Error
        ? error.message
        : 'Please check your information and try again.';

      alert(`❌ Registration failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Register as Blood Donor</h3>
              <p className="text-red-100 text-sm">Join our life-saving community today</p>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="text-white hover:bg-red-800 rounded-full p-2 transition-colors disabled:opacity-50"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-red-600" />
              <div>
                <p className="font-semibold text-gray-900">Thank you for choosing to save lives!</p>
                <p className="text-sm text-gray-600">Complete this form to join our donor registry</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                placeholder="John Kamau"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                placeholder="+254712345678"
              />
            </div>

            {/* Blood Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Droplets className="inline h-4 w-4 mr-1" />
                Blood Type *
              </label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
              >
                <option value="">Select blood type</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="18"
                max="65"
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                placeholder="25"
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Scale className="inline h-4 w-4 mr-1" />
                Weight (kg) *
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                required
                min="50"
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                placeholder="65"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
              placeholder="123 Main Street, Westlands"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* City */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                placeholder="Nairobi"
              />
            </div>

            {/* ID Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Hash className="inline h-4 w-4 mr-1" />
                ID/Passport Number *
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                placeholder="12345678"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Donation History */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Have you donated blood before? *
              </label>
              <select
                name="hasDonatedBefore"
                value={formData.hasDonatedBefore}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Last Donation Date (conditional) */}
            {formData.hasDonatedBefore === "true" && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Last Donation Date
                </label>
                <input
                  type="date"
                  name="lastDonationDate"
                  value={formData.lastDonationDate}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                />
              </div>
            )}
          </div>

          {/* Health Conditions */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Any known health conditions or medications?
            </label>
            <textarea
              name="healthConditions"
              value={formData.healthConditions}
              onChange={handleInputChange}
              rows={3}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
              placeholder="Please list any health conditions, medications, or other relevant health information..."
            />
          </div>

          {/* Privacy Note */}
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> By registering as a donor, you agree to be contacted when your blood type is needed.
              All information provided will be kept confidential and used solely for blood donation purposes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-6 text-base font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>

                  Registering...
                </>
              ) : (
                <>

                  Register
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DonorInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Register as Donor
                    </Button>
                    <a href="#blood-requests" className="w-full">
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

      {/* Modal */}
      <DonorRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DonorInfo;