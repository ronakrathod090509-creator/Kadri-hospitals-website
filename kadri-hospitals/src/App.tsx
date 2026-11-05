import React, { useState, useEffect } from 'react';
import { PageId, Doctor, Appointment, AdminUser } from './types/hospital';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AppointmentModal } from './components/AppointmentModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { DoctorDetailModal } from './components/DoctorDetailModal';
import { LoginModal } from './components/LoginModal';
import { DOCTORS } from './data/hospitalData';

const APPOINTMENTS_STORAGE_KEY = 'kadri_hospitals_appointments_v2';
const ADMIN_STORAGE_KEY = 'kadri_hospitals_admin_user_v1';

// Initial sample appointment so user can immediately experience the pass, list, and admin dashboard
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'KADRI-2026-9281',
    patientName: 'Eleanor Vance',
    patientEmail: 'eleanor.vance@example.com',
    patientPhone: '+1 (555) 019-4822',
    patientAge: 46,
    patientGender: 'female',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Cardiovascular Sciences',
    doctorId: 'doc-cardio-1',
    doctorName: 'Dr. Alistair Kadri',
    doctorSpecialty: 'Interventional Cardiology & Structural Heart Disease',
    appointmentDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    appointmentTime: '10:20 AM',
    appointmentType: 'First Consultation',
    symptoms: 'Routine cardiovascular checkup and ECG review',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
    roomNumber: 'Suite 301, Heart Pavilion',
    consultationFee: 1200,
  },
  {
    id: 'KADRI-2026-7840',
    patientName: 'Jonathan Davis',
    patientEmail: 'jonathan.davis@example.com',
    patientPhone: '+1 (555) 018-9921',
    patientAge: 58,
    patientGender: 'male',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neurosurgery',
    doctorId: 'doc-neuro-1',
    doctorName: 'Dr. Meera Nambiar',
    doctorSpecialty: 'Cerebrovascular Surgery & Brain Tumors',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointmentTime: '09:45 AM',
    appointmentType: 'Second Opinion',
    symptoms: 'Recurrent severe migraines and neuro-radiology second opinion',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
    roomNumber: 'Suite 401, Neurosciences Wing',
    consultationFee: 1300,
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load appointments from localStorage', e);
    }
    return INITIAL_APPOINTMENTS;
  });

  // Admin authentication state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load admin session', e);
    }
    return null;
  });

  // Modal states
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedDeptId, setPreselectedDeptId] = useState<string | undefined>();
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>();

  const [myAppointmentsOpen, setMyAppointmentsOpen] = useState(false);
  const [doctorDetailModalDoc, setDoctorDetailModalDoc] = useState<Doctor | null>(null);

  // Sync appointments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.error('Failed to save appointments to localStorage', e);
    }
  }, [appointments]);

  // Sync admin user to localStorage
  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      } else {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync admin session to localStorage', e);
    }
  }, [adminUser]);

  const handleOpenBooking = (deptId?: string, docId?: string) => {
    setPreselectedDeptId(deptId);
    setPreselectedDoctorId(docId);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdateAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setLoginModalOpen(false);
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setAdminUser(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setDoctorDetailModalDoc(doctor);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-sky-100 selection:text-sky-900">
      {/* Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === 'admin' && !adminUser) {
            setLoginModalOpen(true);
            return;
          }
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setMyAppointmentsOpen(true)}
        appointmentsCount={appointments.length}
        adminUser={adminUser}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBooking={handleOpenBooking}
            onSelectDoctor={handleSelectDoctor}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'departments' && (
          <DepartmentsPage
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBooking={handleOpenBooking}
            onSelectDoctor={handleSelectDoctor}
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsPage
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBooking={handleOpenBooking}
            onSelectDoctor={handleSelectDoctor}
          />
        )}

        {currentPage === 'admin' && adminUser && (
          <AdminDashboardPage
            adminUser={adminUser}
            appointments={appointments}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            onDeleteAppointment={handleDeleteAppointment}
            onOpenBooking={() => handleOpenBooking()}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* Admin Login Modal (id: admin, password: admin) */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Appointment Booking Wizard Modal */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedDepartmentId={preselectedDeptId}
        preselectedDoctorId={preselectedDoctorId}
        onSuccess={handleBookingSuccess}
        onViewAllAppointments={() => setMyAppointmentsOpen(true)}
      />

      {/* My Appointments Manager Modal */}
      <MyAppointmentsModal
        isOpen={myAppointmentsOpen}
        onClose={() => setMyAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onBookNew={() => {
          setMyAppointmentsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Doctor Details Modal */}
      <DoctorDetailModal
        doctor={doctorDetailModalDoc}
        isOpen={!!doctorDetailModalDoc}
        onClose={() => setDoctorDetailModalDoc(null)}
        onBookAppointment={(doc) => {
          setDoctorDetailModalDoc(null);
          handleOpenBooking(doc.departmentId, doc.id);
        }}
      />
    </div>
  );
}
