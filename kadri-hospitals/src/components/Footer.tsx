import React from 'react';
import { PageId } from '../types/hospital';
import { HOSPITAL_INFO, DEPARTMENTS } from '../data/hospitalData';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Activity, 
  ArrowRight 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, onOpenLogin }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Highlight Box for Quick Care & Appointments */}
        <div className="bg-gradient-to-r from-sky-900/60 to-slate-800/80 border border-sky-800/40 rounded-2xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400 text-sm font-semibold">
              <Activity className="w-4 h-4" />
              <span>Need Specialized Clinical Consultation?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Consult with Kadri Hospitals Senior Specialists Today
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Instant appointment confirmation, verified time slots, and access to all 8 specialized centers of excellence.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <span>Schedule an Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span>Emergency Helpline</span>
            </a>
          </div>
        </div>

        {/* 4 Column Standard Medical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-sm">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {HOSPITAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Founded in {HOSPITAL_INFO.foundedYear}, Kadri Hospitals is committed to providing compassionate, evidence-based tertiary healthcare powered by cutting-edge medical technology and patient-first ethics.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NABH & JCI Accredited Hospital</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NABL Certified Diagnostic Labs</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links & Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Hospital Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  About Our Hospital & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('departments')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Clinical Centers of Excellence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctors')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Find a Doctor & Specialists
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-sky-400 font-medium"
                >
                  Online Appointment Booking
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 flex items-center gap-1"
                >
                  <span>Staff & Admin Portal (admin / admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Departments */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Key Departments</h4>
            <ul className="space-y-2 text-xs">
              {DEPARTMENTS.slice(0, 5).map((dept) => (
                <li key={dept.id}>
                  <button
                    onClick={() => onNavigate('departments')}
                    className="hover:text-white transition-colors cursor-pointer text-slate-400 text-left"
                  >
                    {dept.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('departments')}
                  className="text-sky-400 hover:text-sky-300 font-medium cursor-pointer"
                >
                  View All 8 Departments →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Emergency */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Contact & Location</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Emergency: {HOSPITAL_INFO.emergencyPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>OPD: Mon – Sat (08:30 AM – 08:00 PM)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{HOSPITAL_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Medical Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kadri Hospitals. All rights reserved. Compassionate Care & Medical Innovation.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Patient Rights & Charter</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Infection Control Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
