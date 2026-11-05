import React from 'react';
import { PageId } from '../types/hospital';
import { HOSPITAL_INFO, FACILITIES } from '../data/hospitalData';
import { 
  ShieldCheck, 
  Award, 
  Activity, 
  HeartHandshake, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Microscope,
  Building2,
  Clock,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  const leadershipMembers = [
    {
      name: 'Dr. Alistair Kadri',
      role: 'Founder & Chief Medical Director',
      credentials: 'MD, DM, FACC (USA)',
      bio: 'Pioneered interventional cardiology in the region. Leads clinical governance and clinical research programs across all hospital wings.',
    },
    {
      name: 'Dr. Meera Nambiar',
      role: 'Chairperson of Medical Board & Director of Neurosciences',
      credentials: 'MCh Neurosurgery, FINR (Zurich)',
      bio: 'World-renowned neurosurgeon overseeing surgical safety protocols, advanced robotic neuro-navigation, and tertiary medical fellowships.',
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Head of Clinical Research & Cancer Institute',
      credentials: 'MD, DM Oncology, FACS',
      bio: 'Directs the multidisciplinary tumor board, personalized immunotherapy trials, and clinical oncology compliance.',
    },
    {
      name: 'Sister Mary Teresa Gallagher',
      role: 'Director of Nursing Services & Patient Welfare',
      credentials: 'MSN, RN, FAAN',
      bio: 'Oversees 800+ registered nurses, ensuring compassionate bedside care, infection control, and continuous nursing education.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Page Hero Header */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-3 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>38 Years of Trusted Healthcare Excellence</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              About Kadri Hospitals
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Established with an unyielding commitment to clinical precision and patient dignity, Kadri Hospitals has grown from a specialized surgical facility into an internationally accredited 650-bed multi-specialty institution.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION, VISION & ETHOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Clinical Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To deliver compassionate, evidence-based tertiary medical care of international benchmarks to every patient, regardless of complexity or background, with complete transparency.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Medical Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be the benchmark for robotic surgery, acute emergency response, and clinical research in South Asia, continuously adopting minimally invasive surgical technologies.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Core Ethical Pillars</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Patient safety first, uncompromising infection control, informed consent without pressure, and continuous clinical audit of every surgical outcome.
            </p>
          </div>
        </div>
      </section>

      {/* STORY & HERITAGE (Split layout with doctor consultation photo) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 block">
              Our Journey Since 1988
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              A Legacy of Clinical Milestones & Patient Dedication
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founded in 1988 by Dr. Alistair Kadri and a visionary team of surgeons, Kadri Hospitals began with a 50-bed surgical unit dedicated to making complex cardiovascular interventions accessible. Over the decades, the institution expanded into a sprawling medical campus with 24 clinical specialties, 14 robotic-assisted operating suites, and a Level-1 Trauma Care Center.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Today, Kadri Hospitals conducts over 28,000 surgeries every year, trains hundreds of clinical post-graduates, and provides subsidized critical care to underserved families through the Kadri Health Foundation.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-lg font-bold text-slate-900 block font-mono">140+</span>
                <span className="text-xs text-slate-500">Board-Certified Doctors</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-lg font-bold text-slate-900 block font-mono">450,000+</span>
                <span className="text-xs text-slate-500">Patients Treated to Date</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl aspect-4/3 bg-slate-100">
              <img
                src="/src/assets/images/kadri_doctor_consultation_1793286647586.jpg"
                alt="Kadri Hospitals Senior Physician Consulting Patient"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES & INFRASTRUCTURE */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 block">
              Campus Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Built for Safety, Speed & Precision
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Every square meter of Kadri Hospitals is engineered in alignment with international hospital architecture safety guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FACILITIES.map((fac) => (
              <div
                key={fac.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                    {fac.category}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{fac.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{fac.description}</p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                  {fac.specifications.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE CLINICAL LEADERSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 block">
            Governance & Board
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Clinical Executive Leadership
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Physician-led governance ensuring the highest medical standards across all clinical operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                <span className="text-xs font-semibold text-sky-700 block mt-0.5">
                  {member.role}
                </span>
                <span className="text-[11px] text-slate-400 block">{member.credentials}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACCREDITATIONS & QUALITY STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block">
                Quality Certifications
              </span>
              <h2 className="text-2xl font-bold text-white">
                Accredited by National & International Health Bodies
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kadri Hospitals maintains the Joint Commission International (JCI) Gold Seal of Approval and full NABH accreditation, validating our clinical protocols, medication safety, surgical checks, and patient rights.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center">
                  <div className="font-bold text-white text-xs">JCI Gold Seal</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">International Standard</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center">
                  <div className="font-bold text-white text-xs">NABH Certified</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Hospital Quality</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center">
                  <div className="font-bold text-white text-xs">NABL Laboratories</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Diagnostic Accuracy</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center">
                  <div className="font-bold text-white text-xs">ISO 9001:2015</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Process Excellence</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-slate-900 bg-white hover:bg-sky-50 rounded-lg shadow-md transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-sky-700" />
                <span>Schedule a Visit Today</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
