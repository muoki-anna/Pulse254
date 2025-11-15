// src/services/api.ts
// Create this file in your frontend project

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
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
  return data.data;
};

// Get single blood request by ID (Public)
export const getBloodRequestById = async (id: string): Promise<BloodRequest> => {
  const response = await fetch(`${API_URL}/blood-requests/${id}`);
  const data = await handleResponse(response);
  return data.data;
};

// Create blood request (Hospital only - Protected)
export const createBloodRequest = async (requestData: {
  bloodType: string;
  unitsNeeded: number;
  urgency: string;
  location?: string;
  distance?: string;
  deadline: string;
  contact?: string;
  description: string;
}): Promise<BloodRequest> => {
  const token = getAuthToken();
  
  const response = await fetch(`${API_URL}/blood-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  });
  
  const data = await handleResponse(response);
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
  return data.data;
};

// ============================================
// AUTHENTICATION API (Hospital)
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
  const token = getAuthToken();
  
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
  return !!getAuthToken();
};

// ============================================
// HOSPITAL DASHBOARD API (Protected)
// ============================================

// Get hospital's own blood requests
export const getMyBloodRequests = async (): Promise<BloodRequest[]> => {
  const token = getAuthToken();
  
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
  const token = getAuthToken();
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
  const token = getAuthToken();
  
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