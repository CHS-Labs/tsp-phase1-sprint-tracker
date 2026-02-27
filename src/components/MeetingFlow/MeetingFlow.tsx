import { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronRight, ExternalLink, ListTodo, FileText, Lightbulb, AlertTriangle, Users } from 'lucide-react';
import { meetingService, Meeting, MeetingSection } from '../../services/meetingService';
import { useData } from '../../contexts/DataContext';

interface MeetingFlowProps {
  onViewDecision?: (decisionId: string) => void;
  onViewTask?: (taskId: string) => void;
}

const sectionIcons: { [key: number]: any } = {
  1: Users,
  2: FileText,
  3: ListTodo,
  4: FileText,
  5: Lightbulb,
  6: AlertTriangle,
};

export default function MeetingFlow({ onViewDecision, onViewTask }: MeetingFlowProps) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMeetings, setExpandedMeetings] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const { decisions, tasks } = useData();

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    setIsLoading(true);
    const data = await meetingService.getRecentMeetings(10);
    setMeetings(data);
    if (data.length > 0) {
      setExpandedMeetings(new Set([data[0].meetingId]));
    }
    setIsLoading(false);
  };

  const toggleMeeting = (meetingId: string) => {
    const newExpanded = new Set(expandedMeetings);
    if (newExpanded.has(meetingId)) {
      newExpanded.delete(meetingId);
    } else {
      newExpanded.add(meetingId);
    }
    setExpandedMeetings(newExpanded);
  };

  const toggleSection = (key: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedSections(newExpanded);
  };

  const getDecisionSummary = (decisionId: string) => {
    const decision = decisions.find(d => d.decisionId === decisionId);
    return decision ? decision.decisionSummary : decisionId;
  };

  const getTaskDescription = (taskId: string) => {
    const task = tasks.find(t => t.taskId === taskId);
    return task ? task.taskDescription : taskId;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#E98A24] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading meeting flow...</p>
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

      {meetings.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No meetings processed yet.</p>
          <p className="text-sm text-gray-500 mt-2">
            Run /meeting-processor after your next meeting.
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E98A24] via-[#1A9CD7] to-gray-300" />

          <div className="space-y-8">
            {meetings.map((meeting) => {
              const date = new Date(meeting.meetingDate);
              const isExpanded = expandedMeetings.has(meeting.meetingId);

              return (
                <div key={meeting.meetingId} className="relative pl-20 group">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform text-center text-xs leading-tight">
                    <div>
                      <div>{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                      <div className="text-xl">{date.getDate()}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:border-[#E98A24]">
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleMeeting(meeting.meetingId)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                            <h3 className="text-lg font-bold text-gray-900">{meeting.meetingType}</h3>
                          </div>
                          <div className="flex items-center gap-2 ml-8">
                            <Calendar size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {date.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            meeting.status === 'Committed' ? 'bg-green-100 text-green-800' :
                            meeting.status === 'Extracted' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {meeting.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm ml-8">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <FileText size={14} className="text-[#E98A24]" />
                          <span className="font-semibold">{meeting.decisionsCount}</span>
                          <span>decisions</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <ListTodo size={14} className="text-[#1A9CD7]" />
                          <span className="font-semibold">{meeting.tasksCount}</span>
                          <span>tasks</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Lightbulb size={14} className="text-yellow-500" />
                          <span className="font-semibold">{meeting.parkingLotCount}</span>
                          <span>parking lot</span>
                        </div>
                      </div>

                      {meeting.fathomLink && meeting.fathomLink !== '#' && (
                        <div className="mt-4 ml-8">
                          <a
                            href={meeting.fathomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[#1A9CD7] hover:text-[#E98A24] font-semibold transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={14} />
                            View Fathom Transcript
                          </a>
                        </div>
                      )}
                    </div>

                    {isExpanded && meeting.sections.length > 0 && (
                      <div className="border-t border-gray-200 bg-gray-50">
                        <div className="p-6 space-y-4">
                          {meeting.sections.map((section) => {
                            const sectionKey = `${meeting.meetingId}-${section.sectionNumber}`;
                            const isSectionExpanded = expandedSections.has(sectionKey);
                            const SectionIcon = sectionIcons[section.sectionNumber] || FileText;

                            return (
                              <div key={sectionKey} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div
                                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                  onClick={() => toggleSection(sectionKey)}
                                >
                                  <div className="flex items-center gap-3">
                                    {isSectionExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                    <SectionIcon size={18} className="text-[#E98A24]" />
                                    <h4 className="font-bold text-gray-900">{section.sectionTitle}</h4>
                                  </div>
                                </div>

                                {isSectionExpanded && (
                                  <div className="px-4 pb-4 space-y-4">
                                    <div>
                                      <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Discussion Summary</h5>
                                      <p className="text-sm text-gray-700">{section.discussionSummary}</p>
                                    </div>

                                    {section.keyPoints.length > 0 && (
                                      <div>
                                        <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Points</h5>
                                        <ul className="space-y-1">
                                          {section.keyPoints.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                              <span className="text-[#E98A24] mt-1">•</span>
                                              <span>{point}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {section.relatedDecisionIds.length > 0 && (
                                      <div>
                                        <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Related Decisions</h5>
                                        <div className="space-y-1">
                                          {section.relatedDecisionIds.map((decisionId) => (
                                            <button
                                              key={decisionId}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                onViewDecision?.(decisionId);
                                              }}
                                              className="flex items-center gap-2 text-sm text-[#1A9CD7] hover:text-[#E98A24] font-medium transition-colors"
                                            >
                                              <FileText size={12} />
                                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{decisionId}</span>
                                              <span className="truncate">{getDecisionSummary(decisionId)}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {section.relatedTaskIds.length > 0 && (
                                      <div>
                                        <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Related Tasks</h5>
                                        <div className="space-y-1">
                                          {section.relatedTaskIds.map((taskId) => (
                                            <button
                                              key={taskId}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                onViewTask?.(taskId);
                                              }}
                                              className="flex items-center gap-2 text-sm text-[#1A9CD7] hover:text-[#E98A24] font-medium transition-colors"
                                            >
                                              <ListTodo size={12} />
                                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{taskId}</span>
                                              <span className="truncate">{getTaskDescription(taskId)}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
