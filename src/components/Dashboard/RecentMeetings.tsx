import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ListTodo, FileText, Lightbulb } from 'lucide-react';
import { meetingService, Meeting } from '../../services/meetingService';

interface RecentMeetingsProps {
  onNavigateToMeetingFlow?: () => void;
}

export default function RecentMeetings({ onNavigateToMeetingFlow }: RecentMeetingsProps) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    setIsLoading(true);
    const data = await meetingService.getRecentMeetings(3);
    setMeetings(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar size={20} className="text-[#E98A24]" />
          <h3 className="text-lg font-bold text-gray-900">Recent Meetings</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-3 border-[#E98A24] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Calendar size={20} className="text-[#E98A24]" />
        <h3 className="text-lg font-bold text-gray-900">Recent Meetings</h3>
      </div>

      <div className="space-y-3">
        {meetings.length === 0 ? (
          <div className="text-center py-6">
            <Calendar size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">No meetings processed yet</p>
            <p className="text-xs text-gray-400 mt-1">Run /meeting-processor after your next meeting</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div
              key={meeting.meetingId}
              onClick={onNavigateToMeetingFlow}
              className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg hover:shadow-md transition-all cursor-pointer border border-gray-200 hover:border-[#E98A24]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {new Date(meeting.meetingDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm font-semibold text-gray-700">
                    {meeting.meetingType}
                  </div>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    meeting.status === 'Committed' ? 'bg-green-100 text-green-800' :
                    meeting.status === 'Extracted' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {meeting.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-1.5">
                  <FileText size={14} className="text-[#E98A24]" />
                  <span className="font-semibold">{meeting.decisionsCount}</span>
                  <span>decisions</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1.5">
                  <ListTodo size={14} className="text-[#1A9CD7]" />
                  <span className="font-semibold">{meeting.tasksCount}</span>
                  <span>tasks</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-yellow-500" />
                  <span className="font-semibold">{meeting.parkingLotCount}</span>
                  <span>parking lot</span>
                </div>
              </div>
              <button className="text-xs text-[#1A9CD7] hover:text-[#E98A24] font-semibold flex items-center gap-1 transition-colors">
                <span>View Details</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
