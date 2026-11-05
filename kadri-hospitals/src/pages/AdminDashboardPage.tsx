import React, { useState, useMemo } from 'react';
import { Appointment, AdminUser, Doctor } from '../types/hospital';
import { DEPARTMENTS, DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Printer, 
  ShieldCheck, 
  LogOut, 
  Activity, 
  Building2, 
  AlertCircle,
  TrendingUp,
  IndianRupee,
  UserCheck
} from 'lucide-react';

interface AdminDashboardPageProps {
  adminUser: AdminUser;
  appointments: Appointment[];
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  onDeleteAppointment: (id: string) => void;
  onOpenBooking: () => void;
  onLogout: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  adminUser,
  appointments,
  onUpdateAppointmentStatus,
  onDeleteAppointment,
  onOpenBooking,
  onLogout,
}) => {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'appointments' | 'departments' | 'doctors'>('appointments');

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        apt.patientName.toLowerCase().includes(query) ||
        apt.id.toLowerCase().includes(query) ||
        apt.doctorName.toLowerCase().includes(query) ||
        apt.patientPhone.includes(query);

      const matchesDept = selectedDeptFilter === 'all' || apt.departmentId === selectedDeptFilter;
      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [appointments, searchQuery, selectedDeptFilter, statusFilter]);

  // Calculated Metrics
  const totalRevenue = appointments.reduce((sum, apt) => sum + (apt.consultationFee || 0), 0);
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;
  const cancelledCount = appointments.filter((a) => a.status === 'Cancelled').length;

  const handlePrint = (apt: Appointment) => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16 bg-slate-50 min-h-screen">
      {/* Top Admin Banner */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-sky-800/80 text-sky-200 px-2.5 py-0.5 rounded">
                  Admin Console
                </span>
                <span className="text-xs text-slate-400">
                  Kadri Health Management Information System (HMIS)
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Hospital Administration & Clinical Operations
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Logged in as: <strong className="text-white font-mono">{adminUser.username}</strong> ({adminUser.role}) · Session Active
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register Walk-In Patient</span>
              </button>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* KPI Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Bookings</span>
              <Calendar className="w-4 h-4 text-sky-700" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {appointments.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {confirmedCount} Confirmed · {completedCount} Completed
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Active In OPD</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {confirmedCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Awaiting clinical consult today
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">Doctors On Duty</span>
              <UserCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-indigo-700 font-mono tabular-nums">
              {DOCTORS.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Across 8 clinical departments
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">OPD Inflow</span>
              <IndianRupee className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Calculated consultation dues
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Outpatient Consultations ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'doctors'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Specialist Rosters ({DOCTORS.length})
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'departments'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Department Beds & Census ({DEPARTMENTS.length})
          </button>
        </div>

        {/* TAB 1: APPOINTMENTS MANAGEMENT */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
            {/* Filter Toolbar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 max-w-md relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by patient, Ref ID (e.g. KADRI-), doctor, or phone..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600/30 focus:border-sky-600 bg-white"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={selectedDeptFilter}
                  onChange={(e) => setSelectedDeptFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.shortName}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {(searchQuery || selectedDeptFilter !== 'all' || statusFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDeptFilter('all');
                      setStatusFilter('all');
                    }}
                    className="text-xs text-sky-700 hover:text-sky-900 font-semibold cursor-pointer px-2"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Booking Ref</th>
                    <th className="px-5 py-3">Patient Details</th>
                    <th className="px-5 py-3">Department & Consultant</th>
                    <th className="px-5 py-3">Date & Slot</th>
                    <th className="px-5 py-3">Fee</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                        No appointments found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-sky-800">
                          {apt.id}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{apt.patientName}</div>
                          <div className="text-[11px] text-slate-500">
                            {apt.patientAge} Yrs · {apt.patientGender.toUpperCase()} · {apt.patientPhone}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-xs">
                            {apt.symptoms}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-800">{apt.doctorName}</div>
                          <div className="text-[11px] text-sky-700 font-medium">
                            {apt.departmentName.split('&')[0]}
                          </div>
                          <div className="text-[10px] text-slate-400">{apt.roomNumber}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-800">{apt.appointmentDate}</div>
                          <div className="text-emerald-700 font-semibold">{apt.appointmentTime}</div>
                          <div className="text-[10px] text-slate-400">{apt.appointmentType}</div>
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-slate-900">
                          ₹{apt.consultationFee.toLocaleString('en-IN')}
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={apt.status}
                            onChange={(e) =>
                              onUpdateAppointmentStatus(apt.id, e.target.value as any)
                            }
                            className={`text-xs font-semibold px-2.5 py-1 rounded-md border focus:outline-none cursor-pointer ${
                              apt.status === 'Confirmed'
                                ? 'bg-sky-50 text-sky-800 border-sky-200'
                                : apt.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right space-x-2">
                          <button
                            onClick={() => handlePrint(apt)}
                            className="p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                            title="Print Pass"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteAppointment(apt.id)}
                            className="p-1 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredAppointments.length} of {appointments.length} total records</span>
              <span className="font-mono">Auto-sync with hospital database active</span>
            </div>
          </div>
        )}

        {/* TAB 2: SPECIALIST ROSTERS */}
        {activeTab === 'doctors' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Kadri Hospitals Specialist Duty Roster
                </h3>
                <p className="text-xs text-slate-500">
                  Clinical consultant roster status, fees, and consultation room allocations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCTORS.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={doc.avatarUrl}
                      alt={doc.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                      <p className="text-xs text-sky-700 font-medium">{doc.departmentName.split('&')[0]}</p>
                      <span className="text-[11px] text-slate-400">{doc.roomNumber}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Consultation Fee:</span>
                      <span className="font-bold text-slate-900">₹{doc.consultationFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Clinical Experience:</span>
                      <span className="font-semibold">{doc.experienceYears} Years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Duty Days:</span>
                      <span className="font-medium text-slate-800">{doc.availableDays.length} Days/wk</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DEPARTMENTS & CENSUS */}
        {activeTab === 'departments' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Department Inpatient Capacity & Bed Census
              </h3>
              <p className="text-xs text-slate-500">
                Live monitoring of hospital bed capacities, modular OT allocations, and clinical leadership
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEPARTMENTS.map((dept) => {
                const docCount = DOCTORS.filter((d) => d.departmentId === dept.id).length;
                return (
                  <div
                    key={dept.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wide">
                          {dept.floor}
                        </span>
                        <h4 className="text-base font-bold text-slate-900">{dept.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Head: <strong className="text-slate-700">{dept.headOfDepartment}</strong>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-mono font-extrabold text-sky-800">
                          {dept.bedCount}
                        </span>
                        <span className="text-[10px] text-slate-500 block">Total Beds</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <div>
                        <span className="font-medium text-slate-700">Visiting Hours: </span>
                        <span>{dept.visitingHours}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Registered Specialists: </span>
                        <span>{docCount} full-time consultants</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
