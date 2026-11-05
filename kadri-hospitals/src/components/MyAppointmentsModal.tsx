import React, { useState } from 'react';
import { Appointment } from '../types/hospital';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Trash2, 
  Printer, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from 'lucide-react';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onBookNew,
}) => {
  const [selectedAppointmentForView, setSelectedAppointmentForView] = useState<Appointment | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePrint = (apt: Appointment) => {
    setSelectedAppointmentForView(apt);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">My Booked Consultations</h2>
              <p className="text-xs text-slate-400">
                Manage your appointments, download consultation vouchers, and check schedules
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No Appointments Booked Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't booked any doctor consultations. Choose a department and specialist to schedule your visit.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookNew();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Book an Appointment Now</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Showing {appointments.length} active booking{appointments.length > 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onBookNew();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Book Another</span>
                </button>
              </div>

              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-5 border border-slate-200 rounded-xl hover:border-slate-300 transition-all bg-white space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                          {apt.id}
                        </span>
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {apt.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{apt.doctorName}</h4>
                      <p className="text-xs text-slate-500">{apt.departmentName} · {apt.doctorSpecialty}</p>
                    </div>

                    <div className="text-right sm:border-l sm:pl-4 border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{apt.appointmentDate}</div>
                      <div className="text-xs text-emerald-700 font-semibold">{apt.appointmentTime}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{apt.roomNumber}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Patient Name</span>
                      <span className="font-semibold text-slate-800">{apt.patientName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Contact</span>
                      <span className="font-semibold text-slate-800">{apt.patientPhone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Consultation Fee</span>
                      <span className="font-semibold text-slate-800">₹{apt.consultationFee.toLocaleString('en-IN')} (at OPD Desk)</span>
                    </div>
                  </div>

                  {/* Actions for this appointment */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => handlePrint(apt)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Slip</span>
                    </button>

                    {cancellingId === apt.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-rose-600 font-medium">Cancel appointment?</span>
                        <button
                          onClick={() => {
                            onCancelAppointment(apt.id);
                            setCancellingId(null);
                          }}
                          className="px-2.5 py-1 text-xs bg-rose-600 hover:bg-rose-700 text-white font-medium rounded transition-colors cursor-pointer"
                        >
                          Yes, Cancel
                        </button>
                        <button
                          onClick={() => setCancellingId(null)}
                          className="px-2 py-1 text-xs text-slate-600 hover:text-slate-800 rounded transition-colors cursor-pointer"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setCancellingId(apt.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Need urgent assistance? Call our 24/7 OPD Helpdesk at 1800-419-KADRI
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
