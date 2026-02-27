import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ListTodo, FileText } from 'lucide-react';
import { meetingService, Meeting } from '../../services/meetingService';

export default function RecentMeetings() {
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
            <p className="text-sm text-gray-500">No meetings recorded</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div
              key={meeting.meetingId}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">
                    {new Date(meeting.meetingDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {meeting.meetingType}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <ListTodo size={12} />
                  <span>{meeting.tasksCount} tasks</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText size={12} />
                  <span>{meeting.decisionsCount} decisions</span>
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
