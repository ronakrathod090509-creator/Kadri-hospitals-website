import React, { useState, useMemo } from 'react';
import { PageId, Doctor } from '../types/hospital';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import { 
  Search, 
  Calendar, 
  UserCheck, 
  Star, 
  Clock, 
  MapPin, 
  Filter, 
  ArrowUpDown, 
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface DoctorsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (departmentId?: string, doctorId?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectDoctor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee-asc' | 'fee-desc'>('rating');

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Filtered & Sorted Doctors
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Search
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        doc.name.toLowerCase().includes(query) ||
        doc.specialty.toLowerCase().includes(query) ||
        doc.departmentName.toLowerCase().includes(query) ||
        doc.qualifications.toLowerCase().includes(query);

      // Department filter
      const matchesDept = selectedDepartment === 'all' || doc.departmentId === selectedDepartment;

      // Day filter
      const matchesDay = selectedDay === 'all' || doc.availableDays.includes(selectedDay);

      return matchesSearch && matchesDept && matchesDay;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'fee-asc') return a.consultationFee - b.consultationFee;
      if (sortBy === 'fee-desc') return b.consultationFee - a.consultationFee;
      return 0;
    });
  }, [searchQuery, selectedDepartment, selectedDay, sortBy]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-14 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block">
              Medical Directory
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Consult With Our Specialists
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Browse our directory of board-certified consultants across all clinical departments. Each department features multiple experienced specialists with verified credentials and dedicated consultation hours.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor by name, specialty (e.g. bypass, robotic, cancer)..."
              className="w-full pl-12 pr-10 py-3 text-sm rounded-xl bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter & Results Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 mb-8">
          {/* Department Filter Tabs (Interactive Segmented Buttons) */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Filter by Clinical Department
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedDepartment('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDepartment === 'all'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Departments ({DOCTORS.length})
              </button>
              {DEPARTMENTS.map((dept) => {
                const count = DOCTORS.filter((d) => d.departmentId === dept.id).length;
                const isSelected = selectedDepartment === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-sky-700 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {dept.shortName} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Controls: Day Filter & Sorting */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Day Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-600">Available on:</span>
              <button
                type="button"
                onClick={() => setSelectedDay('all')}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                  selectedDay === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Any Day
              </button>
              {daysList.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                    selectedDay === day ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold text-slate-600">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="rating">Highest Rating</option>
                <option value="experience">Most Experienced</option>
                <option value="fee-asc">Consultation Fee: Low to High</option>
                <option value="fee-desc">Consultation Fee: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>
            Showing <strong className="text-slate-800">{filteredDoctors.length}</strong> matching specialist{filteredDoctors.length > 1 ? 's' : ''}
          </span>
          {(selectedDepartment !== 'all' || selectedDay !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDepartment('all');
                setSelectedDay('all');
                setSearchQuery('');
              }}
              className="text-sky-700 hover:text-sky-900 font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Doctor Cards Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
            <UserCheck className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Specialists Match Your Criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, selecting another day, or clearing filters to view all doctors.
            </p>
            <button
              onClick={() => {
                setSelectedDepartment('all');
                setSelectedDay('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs cursor-pointer"
            >
              View All Doctors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Doctor Card Top Banner */}
                  <div className="p-5 pb-3 flex items-start gap-4">
                    <img
                      src={doc.avatarUrl}
                      alt={doc.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wide">
                          {doc.departmentName.split('&')[0].trim()}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {doc.qualifications}
                      </p>
                      <div className="flex items-center gap-2 text-xs pt-1">
                        <span className="text-amber-500 font-bold flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          {doc.rating}
                        </span>
                        <span className="text-slate-400 text-[11px]">({doc.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="px-5 py-2 space-y-2.5 text-xs text-slate-600">
                    <p className="text-slate-700 font-medium line-clamp-2">
                      {doc.specialty}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Experience:</span>
                        <span className="font-semibold text-slate-800">{doc.experienceYears} Years</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Consultation Fee:</span>
                        <span className="font-bold text-slate-900">₹{doc.consultationFee.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Clinic:</span>
                        <span className="text-slate-700 font-medium">{doc.roomNumber}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-1">
                      <span className="font-semibold text-slate-700">Days: </span>
                      {doc.availableDays.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onOpenBooking(doc.departmentId, doc.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                  <button
                    onClick={() => onSelectDoctor(doc)}
                    className="w-full py-1 text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer text-center"
                  >
                    View Doctor Profile & Schedule →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
