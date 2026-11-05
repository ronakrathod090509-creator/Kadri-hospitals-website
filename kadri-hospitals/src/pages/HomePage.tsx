import React from 'react';
import { PageId, Doctor } from '../types/hospital';
import { HOSPITAL_INFO, DEPARTMENTS, DOCTORS, TESTIMONIALS, FACILITIES } from '../data/hospitalData';
import { 
  Calendar, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Activity, 
  HeartPulse, 
  Brain, 
  Bone, 
  Baby, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  UserCheck,
  Stethoscope
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (departmentId?: string, doctorId?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectDoctor,
}) => {
  // Department icon mapping
  const renderDeptIcon = (id: string) => {
    switch (id) {
      case 'cardiology':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'neurology':
        return <Brain className="w-5 h-5 text-indigo-600" />;
      case 'orthopedics':
        return <Bone className="w-5 h-5 text-amber-600" />;
      case 'pediatrics':
        return <Baby className="w-5 h-5 text-teal-600" />;
      default:
        return <Activity className="w-5 h-5 text-sky-600" />;
    }
  };

  const featuredDepartments = DEPARTMENTS.slice(0, 4);
  const featuredDoctors = DOCTORS.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Hospital Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-100/70 px-3 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
                <span>NABH & JCI Gold Seal Certified Tertiary Hospital</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                Advanced Clinical Medicine. <span className="text-sky-700">Compassionate Healing.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Kadri Hospitals provides world-class tertiary healthcare across 8 specialized centers of excellence, 140+ board-certified medical consultants, and cutting-edge robotic surgical technology.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Doctor Appointment</span>
                </button>

                <button
                  onClick={() => onNavigate('doctors')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-sky-700" />
                  <span>Explore Specialists</span>
                </button>

                <a
                  href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 rounded-lg transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Emergency: 1800-419-5237</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Zero Waiting for Emergencies
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Direct Online Confirmation
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  All Major Health Insurances Accepted
                </span>
              </div>
            </div>

            {/* Right Column: Hospital Campus Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-16/10 sm:aspect-16/11">
                <img
                  src="/src/assets/images/kadri_hospital_exterior_1793286646084.jpg"
                  alt="Kadri Hospitals Modern Medical Campus Exterior"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-sky-400" />
                    <span>Kadri Health City Campus</span>
                  </div>
                  <p className="text-slate-200 text-[11px] mt-0.5">
                    State-of-the-art 650-bed multi-specialty medical center
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4-COLUMN KPI METRIC STRIP (Full-width row directly below the hero split) */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-900">
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-800 font-mono tabular-nums">
                {HOSPITAL_INFO.stats.beds}
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">Inpatient Capacity</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Including 120 ICU & NICU beds</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-800 font-mono tabular-nums">
                {HOSPITAL_INFO.stats.boardCertifiedDoctors}
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">Specialist Consultants</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Across 8 major clinical departments</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-800 font-mono tabular-nums">
                {HOSPITAL_INFO.stats.annualSurgeries}
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">Annual Surgeries</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Minimally invasive & robotic procedures</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
                {HOSPITAL_INFO.stats.patientSatisfaction}
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">Patient Satisfaction</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Audited clinical feedback</div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CARE SERVICES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block">
                Immediate Healthcare Assistance
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                24/7 Emergency & Rapid Response Center
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Trauma Bay: 1800-419-KADRI</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs text-slate-300">
            <div className="space-y-1">
              <span className="font-bold text-white text-sm block">Sub-8 Min Door-to-Doctor</span>
              <p className="text-slate-400 leading-relaxed">
                Dedicated resuscitation bays, acute stroke thrombolysis team, and primary cath lab standing by 24/7.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white text-sm block">Round-the-Clock Diagnostics</span>
              <p className="text-slate-400 leading-relaxed">
                Emergency 3T MRI, 128-slice dual source CT scans, and pathology blood banks open every hour of every day.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white text-sm block">Critical Care & Level-3 NICU</span>
              <p className="text-slate-400 leading-relaxed">
                Specialized intensive care beds with 1:1 nurse-to-patient monitoring and multi-organ support capabilities.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-white text-sm block">Cashless Insurance Desk</span>
              <p className="text-slate-400 leading-relaxed">
                Partnered with over 40 leading TPAs and national health insurance providers for hassle-free pre-authorization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL CENTERS OF EXCELLENCE (DEPARTMENTS OVERVIEW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 block">
              Specialized Healthcare
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Clinical Centers of Excellence
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Each clinical department at Kadri Hospitals is staffed by multiple board-certified senior consultants, surgeons, and dedicated nursing teams.
            </p>
          </div>
          <button
            onClick={() => onNavigate('departments')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer shrink-0"
          >
            <span>View All 8 Departments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDepartments.map((dept) => {
            const docs = DOCTORS.filter((d) => d.departmentId === dept.id);
            return (
              <div
                key={dept.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center border border-sky-100">
                    {renderDeptIcon(dept.id)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {dept.overview.slice(0, 115)}...
                    </p>
                  </div>

                  <div className="pt-2 text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Specialists:</span>
                    <div className="space-y-1 mt-1">
                      {docs.map((doc) => (
                        <div key={doc.id} className="text-[11px] text-slate-600 truncate flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                          <span>{doc.name}</span>
                          <span className="text-slate-400">({doc.qualifications.split(',')[0]})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenBooking(dept.id)}
                    className="text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer"
                  >
                    Book Consultation →
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">{dept.floor}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CLINICAL INFRASTRUCTURE & TECHNOLOGY (Bento Visual Showcase) */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 block">
              Advanced Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Cutting-Edge Medical Technology & Surgical Suites
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Precision clinical outcomes require the highest level of medical instrumentation, sterile air handling, and robotic surgical consoles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Big Feature: Modular Operating Rooms */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative aspect-16/9 bg-slate-100">
                <img
                  src="/src/assets/images/kadri_modern_operating_room_1793286647025.jpg"
                  alt="Kadri Hospitals Robotic Operating Suite"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-700 text-white px-2 py-0.5 rounded">
                    Surgical Pavilion
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    14 Ultra-Clean Laminar Flow Modular Operating Suites
                  </h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Equipped with Da Vinci Xi robotic surgery platforms, Stryker MAKO joint reconstruction guidance, and intraoperative neuro-navigation for sub-millimeter surgical accuracy.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Air Purity</span>
                    <span className="font-semibold text-slate-800">ISO Class 5 HEPA</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Surgical Robotics</span>
                    <span className="font-semibold text-slate-800">Da Vinci & MAKO</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Imaging Integration</span>
                    <span className="font-semibold text-slate-800">4K Ultra-HD 3D</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Infection Rate</span>
                    <span className="font-semibold text-emerald-700">&lt; 0.08% Global Best</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Feature: Diagnostic Radiology & 3T MRI */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative aspect-16/10 bg-slate-100">
                <img
                  src="/src/assets/images/kadri_mri_diagnostics_1793286647118.jpg"
                  alt="Kadri Hospitals Siemens 3T MRI Diagnostic Imaging"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-700 text-white px-2 py-0.5 rounded">
                    Advanced Diagnostics
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    Siemens 3T Magnetom Vida MRI & 128-Slice CT
                  </h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-definition neuro and cardiac imaging with BioMatrix technology that auto-adapts to patient bio-variability, resulting in faster scans and crystal-clear tissue contrast.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Cardiac MRI & Non-Invasive Coronary CT Angiography</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Functional Brain MRI & Tractography for Neurosurgery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS & SPECIALISTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 block">
              Medical Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Meet Our Board-Certified Senior Specialists
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Each of our departments is led by distinguished clinicians with decades of surgical experience, international fellowships, and proven clinical excellence.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <button
              onClick={() => onNavigate('doctors')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-sky-700" />
              <span>Browse All {DOCTORS.length} Doctors</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold text-slate-800 shadow-xs">
                    ★ {doc.rating}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[11px] text-sky-700 font-semibold uppercase tracking-wide block">
                    {doc.departmentName.split('&')[0].trim()}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{doc.specialty}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{doc.qualifications}</p>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                    <span>{doc.experienceYears}+ Yrs Experience</span>
                    <span className="font-bold text-slate-900">₹{doc.consultationFee.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => onOpenBooking(doc.departmentId, doc.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
                <button
                  onClick={() => onSelectDoctor(doc)}
                  className="w-full py-1 text-xs text-slate-500 hover:text-slate-900 font-medium text-center transition-colors cursor-pointer"
                >
                  View Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PATIENT RECOVERY STORIES & PROOF (Claim-to-Proof Adjacency) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 block">
              Patient Outcomes
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Real Patient Recoveries & Clinical Experiences
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Verified clinical testimonials from patients treated at Kadri Hospitals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs">
                  <div className="font-bold text-slate-900">{t.patientName}</div>
                  <div className="text-sky-700 text-[11px] font-medium">{t.treatment}</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">
                    Attending: {t.doctorName} · {t.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL APPOINTMENT ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-sky-800 to-slate-900 rounded-2xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Personalized Healthcare
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Schedule Your Consultation at Kadri Hospitals
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Skip hospital queues by choosing your preferred department, selecting your doctor, and reserving your consultation slot online in less than 2 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-sky-950 bg-white hover:bg-sky-50 rounded-lg shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-sky-700" />
              <span>Book Appointment Now</span>
            </button>
            <button
              onClick={() => onNavigate('departments')}
              className="w-full sm:w-auto px-5 py-3.5 text-sm font-medium text-white hover:bg-white/10 border border-white/20 rounded-lg transition-colors cursor-pointer"
            >
              Explore Departments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
