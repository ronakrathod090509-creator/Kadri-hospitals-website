import React, { useState } from 'react';
import { PageId, Department, Doctor } from '../types/hospital';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { 
  HeartPulse, 
  Brain, 
  Bone, 
  ShieldAlert, 
  Baby, 
  Activity, 
  Stethoscope, 
  Droplet,
  Calendar, 
  UserCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

interface DepartmentsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (departmentId?: string, doctorId?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectDoctor,
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(DEPARTMENTS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Department icon mapping
  const renderDeptIcon = (id: string, isSelected: boolean) => {
    const iconClass = `w-5 h-5 ${isSelected ? 'text-white' : 'text-sky-700'}`;
    switch (id) {
      case 'cardiology':
        return <HeartPulse className={iconClass} />;
      case 'neurology':
        return <Brain className={iconClass} />;
      case 'orthopedics':
        return <Bone className={iconClass} />;
      case 'oncology':
        return <ShieldAlert className={iconClass} />;
      case 'pediatrics':
        return <Baby className={iconClass} />;
      case 'gynecology':
        return <Activity className={iconClass} />;
      case 'gastroenterology':
        return <Stethoscope className={iconClass} />;
      case 'nephrology':
        return <Droplet className={iconClass} />;
      default:
        return <Activity className={iconClass} />;
    }
  };

  const filteredDepartments = DEPARTMENTS.filter((dept) => {
    const query = searchQuery.toLowerCase();
    return (
      dept.name.toLowerCase().includes(query) ||
      dept.tagline.toLowerCase().includes(query) ||
      dept.procedures.some((p) => p.toLowerCase().includes(query))
    );
  });

  const activeDepartment = DEPARTMENTS.find((d) => d.id === selectedDeptId) || DEPARTMENTS[0];
  const activeDeptDoctors = DOCTORS.filter((doc) => doc.departmentId === activeDepartment.id);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block">
              Centers of Excellence
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Clinical Departments & Specialties
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Kadri Hospitals houses 8 multidisciplinary tertiary centers of excellence. Each department is equipped with modern diagnostics, dedicated surgical teams, and multiple board-certified specialists.
            </p>
          </div>

          {/* Quick Search */}
          <div className="mt-8 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search departments or procedures..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Departments Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Department Navigation List */}
          <div className="lg:col-span-4 space-y-2 sticky top-20">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-2 mb-2 flex items-center justify-between">
              <span>All Clinical Centers ({DEPARTMENTS.length})</span>
              <span className="text-[11px] text-sky-700 font-bold">Select to view</span>
            </div>

            <div className="space-y-1.5">
              {filteredDepartments.map((dept) => {
                const isSelected = dept.id === activeDepartment.id;
                const docCount = DOCTORS.filter((d) => d.departmentId === dept.id).length;
                return (
                  <button
                    key={dept.id}
                    onClick={() => {
                      setSelectedDeptId(dept.id);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-sky-700 text-white border-sky-700 shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-800/80 text-white' : 'bg-sky-50'
                      }`}>
                        {renderDeptIcon(dept.id, isSelected)}
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm leading-snug">
                          {dept.shortName}
                        </div>
                        <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                          {docCount} Specialists · {dept.bedCount} Beds
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}

              {filteredDepartments.length === 0 && (
                <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
                  No departments match "{searchQuery}"
                </div>
              )}
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mt-6 space-y-2">
              <span className="text-xs font-bold text-sky-900 block">Need assistance choosing?</span>
              <p className="text-[11px] text-sky-800 leading-relaxed">
                Our central medical triage team can guide you to the right clinical specialist. Call 1800-419-KADRI.
              </p>
            </div>
          </div>

          {/* Right Column: Selected Department Detailed Dossier */}
          <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            {/* Department Hero */}
            <div className="border-b border-slate-100 pb-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                  {activeDepartment.floor}
                </span>
                <span className="text-xs text-slate-500">
                  Visiting Hours: <span className="font-semibold text-slate-700">{activeDepartment.visitingHours}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeDepartment.name}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-sky-800">
                {activeDepartment.tagline}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {activeDepartment.overview}
              </p>

              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <span className="font-semibold text-slate-800">Head of Department:</span>
                <span>{activeDepartment.headOfDepartment}</span>
              </div>
            </div>

            {/* Key Procedures & Technologies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-700" />
                  Key Clinical Procedures
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {activeDepartment.procedures.map((proc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">•</span>
                      <span>{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  Medical Equipment & Technology
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {activeDepartment.technologies.map((tech, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* DOCTORS IN THIS DEPARTMENT (Explicit user requirement: each department has multiple doctors) */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Consultant Specialists in {activeDepartment.shortName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {activeDeptDoctors.length} senior doctors available for OPD consultation
                  </p>
                </div>
                <button
                  onClick={() => onOpenBooking(activeDepartment.id)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book in this Dept</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeDeptDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between bg-white"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3.5">
                        <img
                          src={doc.avatarUrl}
                          alt={doc.name}
                          className="w-14 h-14 rounded-full object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                          <p className="text-xs text-sky-700 font-medium">{doc.qualifications}</p>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{doc.specialty}</p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span>Experience:</span>
                          <span className="font-semibold text-slate-800">{doc.experienceYears} Years</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Rating:</span>
                          <span className="font-semibold text-amber-600">★ {doc.rating} ({doc.reviewCount})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Consultation Fee:</span>
                          <span className="font-bold text-slate-900">₹{doc.consultationFee.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Clinic Room:</span>
                          <span className="text-slate-700 font-medium">{doc.roomNumber}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        <span className="font-medium text-slate-700">Days:</span> {doc.availableDays.join(', ')}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => onOpenBooking(activeDepartment.id, doc.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Appointment</span>
                      </button>
                      <button
                        onClick={() => onSelectDoctor(doc)}
                        className="px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
