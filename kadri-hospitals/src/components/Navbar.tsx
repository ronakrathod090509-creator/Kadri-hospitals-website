import React, { useState } from 'react';
import { PageId, AdminUser } from '../types/hospital';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { 
  PhoneCall, 
  Clock, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  Activity, 
  CheckCircle2,
  FileText,
  Lock,
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
  appointmentsCount: number;
  adminUser: AdminUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenMyAppointments,
  appointmentsCount,
  adminUser,
  onOpenLogin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Doctors' },
  ];

  if (adminUser) {
    navItems.push({ id: 'admin', label: 'Admin Portal' });
  }

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Top Notification / Emergency & Staff Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold tracking-wide">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>24/7 Emergency: {HOSPITAL_INFO.emergencyPhone}</span>
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>OPD: 08:30 AM – 08:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden lg:inline-flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>NABH & JCI Accredited</span>
            </span>
            
            <button
              onClick={onOpenMyAppointments}
              className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white transition-colors cursor-pointer font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>My Appointments</span>
              {appointmentsCount > 0 && (
                <span className="bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                  {appointmentsCount}
                </span>
              )}
            </button>

            <span className="text-slate-600">|</span>

            {/* Admin Login / Logout Section */}
            {adminUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white font-medium cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin: {adminUser.username}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-rose-400 transition-colors ml-1 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium cursor-pointer bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded border border-slate-700"
              >
                <Lock className="w-3 h-3 text-sky-400" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar (Strict 3-zone contract: Brand — Nav Links — 1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left text-slate-900 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-700 flex items-center justify-center text-white shadow-sm group-hover:bg-sky-800 transition-colors">
              <Activity className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                {HOSPITAL_INFO.name}
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
                Tertiary Care & Research
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-sky-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {item.id === 'admin' && (
                  <span className="ml-1.5 text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                    Admin
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-50 text-sky-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'admin' && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                      Portal
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyAppointments();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Booked Appointments ({appointmentsCount})</span>
            </button>

            {adminUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out ({adminUser.username})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-sky-700" />
                <span>Admin Login (admin / admin)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
