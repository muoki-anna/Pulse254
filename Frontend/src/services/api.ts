// src/services/api.ts
import { apiConfig } from "../apiconfig/apiconfiguration";

const API_URL = apiConfig.backUrl

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

// ============================================
// BLOOD REQUESTS API
// ============================================

export interface BloodRequest {
  _id: string;
  hospital: string;
  hospitalName: string;
  bloodType: string;
  unitsNeeded: number;
  urgency: 'Critical' | 'High' | 'Moderate';
  location: string;
  distance?: string;
  deadline: string;
  contact: string;
  description: string;
  status: 'active' | 'fulfilled' | 'cancelled' | 'expired';
  unitsFulfilled: number;
  createdAt: string;
  updatedAt: string;
}

// Get all blood requests (Public)
export const getBloodRequests = async (): Promise<BloodRequest[]> => {
  const response = await fetch(`${API_URL}/blood-requests`);
  const data = await handleResponse(response);
  const jsonData = JSON.stringify(data);
  console.log("This is the"+jsonData);
  return data.data;
};

// Get single blood request by ID (Public)
export const getBloodRequestById = async (id: string): Promise<BloodRequest> => {
  const response = await fetch(`${API_URL}/blood-requests/${id}`);
  const data = await handleResponse(response);
  return data.data;
};

// Create blood request (Public - no authentication required)
export interface PublicBloodRequestData {
  hospitalName: string; // REQUIRED - This was missing!
  bloodType: string;
  unitsNeeded: number;
  urgency: string;
  location: string;
  distance?: string;
  deadline: string;
  contact: string;
  description: string;
}

export const createBloodRequest = async (requestData: PublicBloodRequestData): Promise<BloodRequest> => {
  const response = await fetch(`${API_URL}/blood-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // REMOVED Authorization header since it's public
    },
    body: JSON.stringify(requestData),
  });
  
  const data = await handleResponse(response);
    const jsonData = JSON.stringify(data);
  console.log("This is the"+jsonData);
  return data.data;
};

// ============================================
// APPOINTMENTS API
// ============================================

export interface AppointmentData {
  bloodRequestId: string;
  fullName: string;
  email: string;
  phone: string;
  bloodType: string;
  date: string;
  time: string;
  idNumber: string;
  medicalConditions?: string;
}

export interface Appointment {
  _id: string;
  bloodRequest: BloodRequest;
  hospital: string;
  hospitalName: string;
  donorInfo: {
    fullName: string;
    email: string;
    phone: string;
    bloodType: string;
    idNumber: string;
  };
  appointmentDetails: {
    date: string;
    time: string;
    medicalConditions: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  createdAt: string;
  updatedAt: string;
}

// Book appointment (Public)
export const bookAppointment = async (appointmentData: AppointmentData): Promise<Appointment> => {
  const response = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });
  
  const data = await handleResponse(response);
  return data.appointment;
};

// Get appointment by ID (Public)
export const getAppointmentById = async (id: string): Promise<Appointment> => {
  const response = await fetch(`${API_URL}/appointments/${id}`);
  const data = await handleResponse(response);
  console.log(data);
  return data.data;
};

// ============================================
// DONOR REGISTRATION API
// ============================================

export interface DonorRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  bloodType: string;
  age: number;
  weight: number;
  address: string;
  city: string;
  idNumber: string;
  hasDonatedBefore?: boolean | string;
  lastDonationDate?: string;
  healthConditions?: string;
}

export interface Donor {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  bloodType: string;
  age: number;
  weight: number;
  address: string;
  city: string;
  idNumber: string;
  hasDonatedBefore: boolean;
  lastDonationDate?: string;
  healthConditions: string;
  isActive: boolean;
  availability: string;
  createdAt: string;
  updatedAt: string;
}

// Register new donor
export const registerDonor = async (donorData: DonorRegistrationData): Promise<{ donor: Donor }> => {
  const response = await fetch(`${API_URL}/donors/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(donorData),
  });
  
  const data = await handleResponse(response);
  return data.data;
};

// ============================================
// AUTHENTICATION API (Hospital) - Optional
// ============================================

export interface HospitalLoginData {
  email: string;
  password: string;
}

export interface HospitalRegisterData {
  hospitalName: string;
  email: string;
  password: string;
  contactPhone: string;
  location: string;
  address?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    hospitalName: string;
    email: string;
    contactPhone: string;
    location: string;
    role: string;
    isVerified: boolean;
  };
}

// Hospital login
export const hospitalLogin = async (loginData: HospitalLoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/hospital/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  
  const data = await handleResponse(response);
  
  // Store token in localStorage
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
};

// Hospital register
export const hospitalRegister = async (registerData: HospitalRegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/hospital/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });
  
  const data = await handleResponse(response);
  
  // Store token in localStorage
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
};

// Get current hospital (Protected)
export const getCurrentHospital = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/auth/hospital/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await handleResponse(response);
  return data.user;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('token');
};

// ============================================
// HOSPITAL DASHBOARD API (Protected) - Optional
// ============================================

// Get hospital's own blood requests
export const getMyBloodRequests = async (): Promise<BloodRequest[]> => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/blood-requests/hospital/my-requests`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await handleResponse(response);
  return data.data;
};

// Get hospital's appointments
export const getHospitalAppointments = async (status?: string): Promise<Appointment[]> => {
  const token = localStorage.getItem('token');
  const url = status 
    ? `${API_URL}/appointments/hospital/all?status=${status}`
    : `${API_URL}/appointments/hospital/all`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await handleResponse(response);
  return data.data;
};

// Update appointment status (Hospital only)
export const updateAppointmentStatus = async (
  appointmentId: string,
  status: string,
  notes?: string
): Promise<Appointment> => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/appointments/${appointmentId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status, notes }),
  });
  
  const data = await handleResponse(response);
  return data.data;
};