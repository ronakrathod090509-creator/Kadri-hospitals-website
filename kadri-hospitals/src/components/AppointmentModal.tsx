import React, { useState, useEffect } from 'react';
import { Department, Doctor, Appointment } from '../types/hospital';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Printer, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDepartmentId?: string;
  preselectedDoctorId?: string;
  onSuccess: (appointment: Appointment) => void;
  onViewAllAppointments: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDepartmentId,
  preselectedDoctorId,
  onSuccess,
  onViewAllAppointments,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form selections
  const [selectedDeptId, setSelectedDeptId] = useState<string>(preselectedDepartmentId || DEPARTMENTS[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(preselectedDoctorId || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState<number | ''>('');
  const [patientGender, setPatientGender] = useState<'male' | 'female' | 'other'>('male');
  const [appointmentType, setAppointmentType] = useState<Appointment['appointmentType']>('First Consultation');
  const [symptoms, setSymptoms] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Confirmed appointment output
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Sync props when opening
  useEffect(() => {
    if (isOpen) {
      if (preselectedDoctorId) {
        setSelectedDoctorId(preselectedDoctorId);
        const doc = DOCTORS.find((d) => d.id === preselectedDoctorId);
        if (doc) {
          setSelectedDeptId(doc.departmentId);
        }
      } else if (preselectedDepartmentId) {
        setSelectedDeptId(preselectedDepartmentId);
        const docsInDept = DOCTORS.filter((d) => d.departmentId === preselectedDepartmentId);
        if (docsInDept.length > 0) {
          setSelectedDoctorId(docsInDept[0].id);
        }
      } else {
        const docsInDept = DOCTORS.filter((d) => d.departmentId === selectedDeptId);
        if (docsInDept.length > 0 && !selectedDoctorId) {
          setSelectedDoctorId(docsInDept[0].id);
        }
      }

      // Generate default date (Tomorrow)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
      setStep(1);
      setErrors({});
    }
  }, [isOpen, preselectedDepartmentId, preselectedDoctorId]);

  // When department changes, adjust default doctor
  const handleDepartmentChange = (deptId: string) => {
    setSelectedDeptId(deptId);
    const availableDocs = DOCTORS.filter((d) => d.departmentId === deptId);
    if (availableDocs.length > 0) {
      setSelectedDoctorId(availableDocs[0].id);
    } else {
      setSelectedDoctorId('');
    }
    setSelectedTimeSlot('');
  };

  // Current selected entities
  const currentDept = DEPARTMENTS.find((d) => d.id === selectedDeptId) || DEPARTMENTS[0];
  const departmentDoctors = DOCTORS.filter((d) => d.departmentId === selectedDeptId);
  const currentDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || departmentDoctors[0];

  // Helper: Next 14 days dates generator
  const getUpcomingDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isSunday = d.getDay() === 0;
      days.push({
        dateStr: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        isSunday,
      });
    }
    return days;
  };

  const upcomingDays = getUpcomingDays();

  // Validate step 3
  const handleProceedToConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!patientName.trim()) {
      newErrors.patientName = 'Please enter patient full name.';
    }
    if (!patientPhone.trim() || patientPhone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.patientPhone = 'Please provide a valid contact number (at least 8 digits).';
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      newErrors.patientEmail = 'Please provide a valid email address.';
    }
    if (!patientAge || Number(patientAge) <= 0 || Number(patientAge) > 120) {
      newErrors.patientAge = 'Please enter a valid age.';
    }
    if (!selectedTimeSlot) {
      newErrors.timeSlot = 'Please select an appointment time slot in Step 2.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.timeSlot) {
        setStep(2);
      }
      return;
    }

    // Create appointment
    const newAppointment: Appointment = {
      id: `KADRI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      patientPhone: patientPhone.trim(),
      patientAge: Number(patientAge),
      patientGender,
      departmentId: currentDept.id,
      departmentName: currentDept.name,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      doctorSpecialty: currentDoctor.specialty,
      appointmentDate: selectedDate,
      appointmentTime: selectedTimeSlot,
      appointmentType,
      symptoms: symptoms.trim() || 'General health consultation',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      roomNumber: currentDoctor.roomNumber,
      consultationFee: currentDoctor.consultationFee,
    };

    setConfirmedAppointment(newAppointment);
    onSuccess(newAppointment);
    setStep(4);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-xs uppercase tracking-wider text-sky-400 font-semibold block">
              Kadri Hospitals · Outpatient Services
            </span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {step === 4 ? 'Appointment Confirmed' : 'Book a Consultation'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 3) */}
        {step < 4 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
            <div className="flex items-center justify-between max-w-lg mx-auto text-xs font-medium text-slate-500">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-1.5 cursor-pointer ${
                  step === 1 ? 'text-sky-700 font-bold' : step > 1 ? 'text-slate-900' : ''
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step === 1 ? 'bg-sky-700 text-white' : step > 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  1
                </span>
                <span>Doctor & Dept</span>
              </button>

              <div className="w-8 h-px bg-slate-300" />

              <button
                onClick={() => {
                  if (selectedDoctorId) setStep(2);
                }}
                className={`flex items-center gap-1.5 cursor-pointer ${
                  step === 2 ? 'text-sky-700 font-bold' : step > 2 ? 'text-emerald-700' : ''
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step === 2 ? 'bg-sky-700 text-white' : step > 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  2
                </span>
                <span>Date & Slot</span>
              </button>

              <div className="w-8 h-px bg-slate-300" />

              <button
                onClick={() => {
                  if (selectedDoctorId && selectedTimeSlot) setStep(3);
                }}
                className={`flex items-center gap-1.5 cursor-pointer ${
                  step === 3 ? 'text-sky-700 font-bold' : ''
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step === 3 ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </span>
                <span>Patient Details</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* STEP 1: Department & Doctor */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Clinical Department
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DEPARTMENTS.map((dept) => {
                    const isSelected = dept.id === selectedDeptId;
                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => handleDepartmentChange(dept.id)}
                        className={`p-3 text-left rounded-xl border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50/80 text-sky-900 font-semibold shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <div className="font-semibold truncate">{dept.shortName}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{dept.bedCount} Beds</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    2. Select Specialist in {currentDept.shortName}
                  </label>
                  <span className="text-xs text-slate-500">
                    {departmentDoctors.length} doctors available
                  </span>
                </div>

                <div className="space-y-3">
                  {departmentDoctors.map((doc) => {
                    const isSelected = doc.id === selectedDoctorId;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50/50 shadow-xs ring-1 ring-sky-600/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <img
                            src={doc.avatarUrl}
                            alt={doc.name}
                            className="w-13 h-13 rounded-full object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                              <span className="text-xs text-sky-700 font-medium">({doc.qualifications})</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">{doc.specialty}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 flex-wrap">
                              <span>{doc.experienceYears} Years Exp</span>
                              <span>·</span>
                              <span>{doc.roomNumber}</span>
                              <span>·</span>
                              <span className="text-emerald-700 font-medium">★ {doc.rating} ({doc.reviewCount})</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                          <span className="text-xs text-slate-500">Consultation Fee</span>
                          <span className="text-sm font-bold text-slate-900">₹{doc.consultationFee.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot Selection */}
          {step === 2 && currentDoctor && (
            <div className="space-y-6">
              {/* Doctor Mini Banner */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={currentDoctor.avatarUrl}
                    alt={currentDoctor.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{currentDoctor.name}</h4>
                    <p className="text-xs text-slate-600">{currentDept.name} · {currentDoctor.roomNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Fee</span>
                  <span className="text-sm font-bold text-slate-900">₹{currentDoctor.consultationFee.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Date Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Consultation Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {upcomingDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        onClick={() => {
                          setSelectedDate(day.dateStr);
                          setSelectedTimeSlot('');
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-sky-600 bg-sky-600 text-white shadow-xs font-semibold'
                            : day.isSunday
                            ? 'border-slate-200 bg-slate-50 text-slate-400 opacity-80'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-medium">{day.dayName}</div>
                        <div className="text-base font-bold my-0.5">{day.dayNumber}</div>
                        <div className="text-[10px]">{day.month}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Available Time Slots ({selectedDate})
                  </label>
                  {errors.timeSlot && (
                    <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.timeSlot}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Morning Slots */}
                  <div>
                    <span className="text-xs font-medium text-slate-500 block mb-1.5">
                      Morning (09:00 AM – 12:30 PM)
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {currentDoctor.timeSlots.morning.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedTimeSlot(slot);
                              setErrors((prev) => ({ ...prev, timeSlot: '' }));
                            }}
                            className={`py-2 px-3 text-xs rounded-lg border text-center font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'border-sky-600 bg-sky-50 text-sky-800 ring-1 ring-sky-600 font-bold'
                                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Afternoon Slots */}
                  <div>
                    <span className="text-xs font-medium text-slate-500 block mb-1.5">
                      Afternoon (02:00 PM – 05:00 PM)
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {currentDoctor.timeSlots.afternoon.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedTimeSlot(slot);
                              setErrors((prev) => ({ ...prev, timeSlot: '' }));
                            }}
                            className={`py-2 px-3 text-xs rounded-lg border text-center font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'border-sky-600 bg-sky-50 text-sky-800 ring-1 ring-sky-600 font-bold'
                                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Evening Slots */}
                  <div>
                    <span className="text-xs font-medium text-slate-500 block mb-1.5">
                      Evening (05:30 PM – 07:30 PM)
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {currentDoctor.timeSlots.evening.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedTimeSlot(slot);
                              setErrors((prev) => ({ ...prev, timeSlot: '' }));
                            }}
                            className={`py-2 px-3 text-xs rounded-lg border text-center font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'border-sky-600 bg-sky-50 text-sky-800 ring-1 ring-sky-600 font-bold'
                                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information Form */}
          {step === 3 && (
            <form onSubmit={handleProceedToConfirmation} className="space-y-4">
              <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-3.5 text-xs text-sky-900 flex items-center justify-between">
                <div>
                  <span className="font-semibold block">Booking Summary</span>
                  <span>{currentDoctor.name} · {selectedDate} at {selectedTimeSlot}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sky-700 hover:text-sky-900 underline font-medium cursor-pointer"
                >
                  Change Slot
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600/30 focus:border-sky-600 bg-white"
                  />
                  {errors.patientName && (
                    <p className="text-xs text-rose-600 mt-1">{errors.patientName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 014-8833"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600/30 focus:border-sky-600 bg-white"
                  />
                  {errors.patientPhone && (
                    <p className="text-xs text-rose-600 mt-1">{errors.patientPhone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Email Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address (for appointment pass) *
                  </label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="eleanor.vance@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600/30 focus:border-sky-600 bg-white"
                  />
                  {errors.patientEmail && (
                    <p className="text-xs text-rose-600 mt-1">{errors.patientEmail}</p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value ? Number(e.target.value) : '')}
                    placeholder="42"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600/30 focus:border-sky-600 bg-white"
                  />
                  {errors.patientAge && (
                    <p className="text-xs text-rose-600 mt-1">{errors.patientAge}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Gender
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600/30 focus:border-sky-600 bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other / Prefer not to say</option>
                  </select>
                </div>

                {/* Appointment Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Appointment Type
                  </label>
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600/30 focus:border-sky-600 bg-white"
                  >
                    <option value="First Consultation">First Consultation</option>
                    <option value="Follow-up Visit">Follow-up Visit</option>
                    <option value="Second Opinion">Second Opinion</option>
                    <option value="Health Checkup">Health Checkup Review</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Chief Complaint */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Reason for Visit / Symptoms Description
                </label>
                <textarea
                  rows={2}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Briefly describe your symptoms or reason for consulting the doctor..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600/30 focus:border-sky-600 bg-white"
                />
              </div>

              {/* Patient Charter Notice */}
              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                <span className="font-semibold text-slate-700">Notice:</span> By booking an appointment at Kadri Hospitals, your clinical slot is reserved immediately. Please bring your valid ID and previous medical records/prescriptions if applicable.
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation & Printable Digital Slip */}
          {step === 4 && confirmedAppointment && (
            <div className="space-y-6">
              <div className="text-center py-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Appointment Successfully Confirmed</h3>
                <p className="text-xs text-slate-600 mt-1">
                  A confirmation SMS & digital pass have been issued. Please keep the reference ID handy upon arrival.
                </p>
              </div>

              {/* Printable Appointment Pass */}
              <div 
                id="printable-voucher" 
                className="bg-white border-2 border-dashed border-sky-300 rounded-2xl p-6 shadow-xs relative overflow-hidden"
              >
                {/* Hospital Header on Slip */}
                <div className="flex items-start justify-between border-b border-slate-200 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-sky-700 uppercase tracking-wide">
                      Official Outpatient Consultation Pass
                    </span>
                    <h4 className="text-lg font-bold text-slate-900">{HOSPITAL_INFO.name}</h4>
                    <p className="text-xs text-slate-500">{HOSPITAL_INFO.address}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block">Booking Reference</span>
                    <span className="font-mono font-bold text-sky-800 text-sm">{confirmedAppointment.id}</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Patient Name</span>
                    <span className="font-bold text-slate-900 text-sm">{confirmedAppointment.patientName}</span>
                    <span className="text-slate-500 block text-[11px]">
                      {confirmedAppointment.patientAge} Yrs · {confirmedAppointment.patientGender.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Consultant</span>
                    <span className="font-bold text-slate-900 text-sm">{confirmedAppointment.doctorName}</span>
                    <span className="text-sky-700 font-medium block text-[11px]">
                      {confirmedAppointment.departmentName}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Date & Time</span>
                    <span className="font-bold text-slate-900 text-sm">{confirmedAppointment.appointmentDate}</span>
                    <span className="text-emerald-700 font-bold block text-xs">
                      {confirmedAppointment.appointmentTime}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Clinic Location</span>
                    <span className="font-semibold text-slate-800">{confirmedAppointment.roomNumber}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Consultation Fee</span>
                    <span className="font-semibold text-slate-800">₹{confirmedAppointment.consultationFee.toLocaleString('en-IN')} (Payable at OPD Desk)</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Visit Category</span>
                    <span className="font-semibold text-slate-800">{confirmedAppointment.appointmentType}</span>
                  </div>
                </div>

                {/* Instructions Box */}
                <div className="mt-5 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
                  <div className="space-y-0.5">
                    <p>• Please report at OPD Reception 15 minutes before slot time.</p>
                    <p>• Carry your previous test reports, medications, and insurance card if applicable.</p>
                  </div>
                  <div className="p-2 border border-slate-300 rounded bg-slate-50 text-[10px] text-center font-mono">
                    <div className="font-bold text-slate-800">[QR VERIFIED]</div>
                    <div className="text-slate-500">KADRI-CHECKIN</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save Pass</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onViewAllAppointments();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View in My Appointments</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls (Steps 1 to 3) */}
        {step < 4 && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              {step === 1 && (
                <button
                  type="button"
                  disabled={!selectedDoctorId}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <span>Select Date & Time</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  disabled={!selectedTimeSlot}
                  onClick={() => {
                    if (!selectedTimeSlot) {
                      setErrors({ timeSlot: 'Please select a consultation time slot.' });
                      return;
                    }
                    setStep(3);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <span>Enter Patient Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 3 && (
                <button
                  type="button"
                  onClick={handleProceedToConfirmation}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
