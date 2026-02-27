import { useState } from 'react';
import { Calendar, Users, FileText, CheckCircle, Lightbulb, AlertTriangle, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function MeetingFlow() {
  const { meetings, isLoading } = useData();
  const [expandedMeeting, setExpandedMeeting] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<{ [key: string]: number | null }>({});

  const toggleMeeting = (meetingId: string) => {
    setExpandedMeeting(expandedMeeting === meetingId ? null : meetingId);
  };

  const toggleSection = (meetingId: string, sectionNum: number) => {
    setExpandedSection(prev => ({
      ...prev,
      [meetingId]: prev[meetingId] === sectionNum ? null : sectionNum
    }));
  };

  const sections = [
    { num: 1, title: 'Opening + Intent', icon: FileText },
    { num: 2, title: 'Review SOW Deliverables', icon: CheckCircle },
    { num: 3, title: 'Review Action Log', icon: FileText },
    { num: 4, title: 'Decision Confirmations', icon: CheckCircle },
    { num: 5, title: 'Parking Lot', icon: Lightbulb },
    { num: 6, title: 'Risks / Blockers', icon: AlertTriangle }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#E98A24] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading meetings...</p>
        </div>
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Meeting Flow</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg font-semibold mb-2">No meetings processed yet</p>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            After your next meeting, run <code className="bg-gray-200 px-2 py-1 rounded">/meeting-processor</code> to extract decisions, tasks, and discussion notes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Meeting Flow</h2>
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gray-500" />
          <span className="text-sm text-gray-600">{meetings.length} meetings</span>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E98A24] via-[#1A9CD7] to-gray-300" />

        <div className="space-y-8">
          {meetings.map((meeting, index) => {
            const meetingDate = meeting.meetingDate ? new Date(meeting.meetingDate) : new Date();
            const isExpanded = expandedMeeting === meeting.meetingDate;

            // Mock data for stats (will come from sheets once columns added)
            const stats = {
              decisions: 0,
              tasks: 0,
              parkingLot: 0,
              risks: 0
            };

            return (
              <div key={meeting.meetingDate || index} className="relative pl-20">
                {/* Date badge */}
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] flex items-center justify-center text-white font-bold shadow-lg">
                  <div className="text-center text-xs leading-tight">
                    <div>{meetingDate.toLocaleDateString('en-US', { month: 'short' })}</div>
                    <div className="text-lg">{meetingDate.getDate()}</div>
                  </div>
                </div>

                {/* Meeting card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Header */}
                  <button
                    onClick={() => toggleMeeting(meeting.meetingDate)}
                    className="w-full p-6 flex items-start justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {meeting.meetingType || 'Weekly Sprint Review'}
                        </h3>
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {meeting.processed?.toLowerCase() === 'yes' ? 'Committed' : 'Extracted'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            {meetingDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1 text-purple-600">
                          <CheckCircle size={14} />
                          <span className="font-semibold">{stats.decisions}</span>
                          <span className="text-gray-500">decisions</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-600">
                          <FileText size={14} />
                          <span className="font-semibold">{stats.tasks}</span>
                          <span className="text-gray-500">tasks</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Lightbulb size={14} />
                          <span className="font-semibold">{stats.parkingLot}</span>
                          <span className="text-gray-500">parking lot</span>
                        </div>
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertTriangle size={14} />
                          <span className="font-semibold">{stats.risks}</span>
                          <span className="text-gray-500">risks</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      {isExpanded ? (
                        <ChevronDown size={24} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={24} className="text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      <div className="p-6 space-y-4">
                        {/* Meeting metadata */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 font-semibold">Summary:</span>
                              <p className="text-gray-700 mt-1">{meeting.summary || 'No summary provided'}</p>
                            </div>
                            {meeting.fathomTranscriptLink && (
                              <div>
                                <span className="text-gray-500 font-semibold">Transcript:</span>
                                <a
                                  href={meeting.fathomTranscriptLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-1"
                                >
                                  <ExternalLink size={14} />
                                  <span>View in Fathom</span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-700 uppercase">Meeting Sections</h4>
                          {sections.map((section) => {
                            const isSectionExpanded = expandedSection[meeting.meetingDate] === section.num;
                            const Icon = section.icon;

                            return (
                              <div key={section.num} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <button
                                  onClick={() => toggleSection(meeting.meetingDate, section.num)}
                                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] flex items-center justify-center text-white text-sm font-bold">
                                      {section.num}
                                    </div>
                                    <Icon size={18} className="text-gray-500" />
                                    <span className="font-semibold text-gray-900">{section.title}</span>
                                  </div>
                                  {isSectionExpanded ? (
                                    <ChevronDown size={20} className="text-gray-400" />
                                  ) : (
                                    <ChevronRight size={20} className="text-gray-400" />
                                  )}
                                </button>

                                {isSectionExpanded && (
                                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                                    <div className="text-sm text-gray-600 italic">
                                      Section details will appear here once Meeting Discussion Notes tab is populated in Google Sheets.
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
