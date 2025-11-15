// Updated BloodRequests.tsx with API integration
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { MapPin, Clock, Phone, AlertCircle, Droplet, Heart, X, Calendar, User, Mail, Loader2 } from "lucide-react";
import { getBloodRequests, bookAppointment } from "../services/api";
import type { BloodRequest } from "../services/api";

const getUrgencyColor = (urgency: string) => {
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

const getButtonStyle = (urgency: string) => {
  return urgency === "Critical"
    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg";
};

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospital: BloodRequest | null;
}

const DonationModal = ({ isOpen, onClose, hospital }: DonationModalProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodType: hospital?.bloodType || "",
    date: "",
    time: "",
    idNumber: "",
    medicalConditions: "",
  });

  const bookingMutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: (data) => {
      alert(`✅ Appointment booked successfully!\n\nReference ID: ${data._id}\n\nThe hospital will contact you at ${formData.email} to confirm your appointment.`);
      queryClient.invalidateQueries({ queryKey: ['bloodRequests'] });
      onClose();
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        bloodType: hospital?.bloodType || "",
        date: "",
        time: "",
        idNumber: "",
        medicalConditions: "",
      });
    },
    onError: (error: Error) => {
      alert(`❌ Failed to book appointment: ${error.message}\n\nPlease try again or contact the hospital directly.`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hospital) return;

    const appointmentData = {
      bloodRequestId: hospital._id,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      bloodType: formData.bloodType,
      date: formData.date,
      time: formData.time,
      idNumber: formData.idNumber,
      medicalConditions: formData.medicalConditions,
    };

    bookingMutation.mutate(appointmentData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Schedule Blood Donation</h3>
              <p className="text-red-100 text-sm">{hospital?.hospitalName}</p>
            </div>
            <button
              onClick={onClose}
              disabled={bookingMutation.isPending}
              className="text-white hover:bg-red-800 rounded-full p-2 transition-colors disabled:opacity-50"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Droplet className="h-8 w-8 text-red-600" />
              <div>
                <p className="font-semibold text-gray-900">Blood Type Needed: {hospital?.bloodType}</p>
                <p className="text-sm text-gray-600">Urgency: {hospital?.urgency}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={bookingMutation.isPending}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={bookingMutation.isPending}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                  placeholder="john..example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={bookingMutation.isPending}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            {/* Blood Type and ID Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Droplet className="inline h-4 w-4 mr-1" />
                  Your Blood Type *
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                  disabled={bookingMutation.isPending}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ID/Passport Number *
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                  disabled={bookingMutation.isPending}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                  placeholder="12345678"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  disabled={bookingMutation.isPending}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  disabled={bookingMutation.isPending}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                >
                  <option value="">Select time</option>
                  <option value="08:00">08:00 AM</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
            </div>

            {/* Medical Conditions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Any Medical Conditions or Medications?
              </label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                rows={3}
                disabled={bookingMutation.isPending}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:opacity-50"
                placeholder="Please list any medical conditions, current medications, or recent travel..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              type="button"
              onClick={onClose}
              disabled={bookingMutation.isPending}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-6 text-base font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={bookingMutation.isPending}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {bookingMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5 mr-2" />
                  Confirm Donation
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting this form, you confirm that you meet the eligibility criteria for blood donation.
          </p>
        </form>
      </div>
    </div>
  );
};

const BloodRequests = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<BloodRequest | null>(null);

  // Fetch blood requests from API
  const { data: bloodRequests, isLoading, error } = useQuery<BloodRequest[]>({
    queryKey: ['bloodRequests'],
    queryFn: getBloodRequests,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const displayedRequests = showAll ? bloodRequests : bloodRequests?.slice(0, 3);

  const handleBookAppointment = (request: BloodRequest) => {
    setSelectedHospital(request);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading blood requests...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load blood requests. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!bloodRequests || bloodRequests.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container text-center">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No blood requests available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="blood-requests" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
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

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {displayedRequests?.map((request) => (
              <Card
                key={request._id}
                onClick={() =>
                  setActiveCard(activeCard === request._id ? null : request._id)
                }
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 border-2 h-full
                  ${
                    activeCard === request._id
                      ? "scale-105 shadow-2xl z-10 border-red-400"
                      : "hover:scale-102 hover:shadow-xl border-gray-200"
                  }
                  ${request.urgency === "Critical" ? "ring-2 ring-red-200" : ""}
                `}
              >
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
                    {request.hospitalName}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 px-4 sm:px-5 pb-5">
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

                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2.5 text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="font-medium">
                        {request.location} {request.distance && `• ${request.distance}`}
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

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
                    {request.description}
                  </p>

                  <Button
                    className={`w-full py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${getButtonStyle(
                      request.urgency
                    )} hover:scale-105`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookAppointment(request);
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
          {bloodRequests && bloodRequests.length > 3 && (
            <div className="text-center mt-10 sm:mt-12 lg:mt-16">
              <Button 
                onClick={() => setShowAll(!showAll)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <AlertCircle className="h-5 w-5 mr-2" />
                {showAll ? 'Show Less' : `View All Requests (${bloodRequests.length})`}
              </Button>
            </div>
          )}
        </div>
      </section>

      <DonationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        hospital={selectedHospital}
      />
    </>
  );
};

export default BloodRequests;