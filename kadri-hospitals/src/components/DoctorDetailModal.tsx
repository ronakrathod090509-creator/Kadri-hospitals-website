import React from 'react';
import { Doctor } from '../types/hospital';
import { 
  X, 
  Award, 
  Clock, 
  MapPin, 
  Globe2, 
  Calendar, 
  Star, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-sky-400/30 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                {doctor.departmentName}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{doctor.name}</h2>
              <p className="text-xs text-slate-300 font-medium">{doctor.qualifications}</p>
              <div className="flex items-center gap-3 text-xs text-slate-300 pt-1 flex-wrap">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {doctor.rating} ({doctor.reviewCount} verified reviews)
                </span>
                <span>·</span>
                <span>{doctor.experienceYears} Years Clinical Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Key Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Consultation Fee</span>
              <span className="font-bold text-slate-900 text-sm">₹{doctor.consultationFee.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Clinic Location</span>
              <span className="font-semibold text-slate-800">{doctor.roomNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Languages</span>
              <span className="font-semibold text-slate-800 truncate block">
                {doctor.languages.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Available Days</span>
              <span className="font-semibold text-slate-800">
                {doctor.availableDays.length} Days / Week
              </span>
            </div>
          </div>

          {/* About Doctor */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Clinical Profile & Background
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {doctor.bio}
            </p>
          </div>

          {/* Subspecialties & Focus */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Specialized Areas of Care
            </h4>
            <div className="bg-sky-50/50 p-3.5 rounded-xl border border-sky-100/70 text-xs text-sky-950 font-medium">
              {doctor.specialty}
            </div>
          </div>

          {/* Key Accolades & Credentials */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Distinctions & Fellowships
            </h4>
            <ul className="space-y-2 text-xs">
              {doctor.accolades.map((acc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{acc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation Schedule Preview */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Regular Consultation Hours
            </h4>
            <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span>Morning Session:</span>
                <span className="font-semibold text-slate-800">09:00 AM – 12:30 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Afternoon Session:</span>
                <span className="font-semibold text-slate-800">02:00 PM – 05:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Evening Session:</span>
                <span className="font-semibold text-slate-800">05:30 PM – 07:30 PM</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Consulting on: {doctor.availableDays.join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500 hidden sm:block">
            <span>Next available slot: Tomorrow</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAppointment(doctor);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer w-full sm:w-auto justify-center"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with {doctor.name.split(' ').slice(0, 2).join(' ')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
