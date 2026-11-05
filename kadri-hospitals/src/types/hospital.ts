export type PageId = 'home' | 'about' | 'departments' | 'doctors' | 'admin';

export interface AdminUser {
  username: string;
  role: string;
  name: string;
  loggedInAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  specialty: string;
  qualifications: string;
  experienceYears: number;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  languages: string[];
  availableDays: string[];
  timeSlots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
  bio: string;
  roomNumber: string;
  avatarUrl: string;
  accolades: string[];
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  overview: string;
  iconName: string;
  headOfDepartment: string;
  procedures: string[];
  technologies: string[];
  bedCount: number;
  doctorIds: string[];
  visitingHours: string;
  floor: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge: number;
  patientGender: 'male' | 'female' | 'other';
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'First Consultation' | 'Follow-up Visit' | 'Second Opinion' | 'Health Checkup';
  symptoms: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  roomNumber: string;
  consultationFee: number;
}

export interface Testimonial {
  id: string;
  patientName: string;
  condition: string;
  treatment: string;
  department: string;
  quote: string;
  doctorName: string;
  date: string;
  rating: number;
}

export interface Facility {
  id: string;
  title: string;
  category: string;
  description: string;
  specifications: string[];
}
