import { useState, useEffect } from 'react';
import { Calendar, FileText, ChevronDown, ChevronUp, ExternalLink, CheckCircle, ListTodo, MessageSquare, Link as LinkIcon } from 'lucide-react';
import { meetingService, Meeting, MeetingSection } from '../../services/meetingService';

type View = 'timeline' | 'linkage';

export default function MeetingSummaries() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [activeView, setActiveView] = useState<View>('timeline');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    setIsLoading(true);
    const data = await meetingService.getRecentMeetings(5);
    setMeetings(data);
    setIsLoading(false);
  };

  const handleMeetingClick = async (meetingId: string) => {
    const meeting = await meetingService.getMeetingById(meetingId);
    setSelectedMeeting(meeting);
    if (meeting && meeting.sections.length > 0) {
      setExpandedSections(new Set([meeting.sections[0].sectionNumber]));
    }
  };

  const toggleSection = (sectionNumber: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionNumber)) {
      newExpanded.delete(sectionNumber);
    } else {
      newExpanded.add(sectionNumber);
    }
    setExpandedSections(newExpanded);
  };

  const toggleAllSections = () => {
    if (!selectedMeeting) return;
    if (expandedSections.size === selectedMeeting.sections.length) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(selectedMeeting.sections.map(s => s.sectionNumber)));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Committed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Reviewed':
        return <CheckCircle size={16} className="text-blue-600" />;
      case 'Extracted':
        return <FileText size={16} className="text-yellow-600" />;
      default:
        return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Committed':
        return 'bg-green-100 text-green-700';
      case 'Reviewed':
        return 'bg-blue-100 text-blue-700';
      case 'Extracted':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Meeting Summaries</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('timeline')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeView === 'timeline'
                ? 'bg-[#E98A24] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Timeline View
          </button>
          <button
            onClick={() => setActiveView('linkage')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeView === 'linkage'
                ? 'bg-[#E98A24] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Decision-Task Map
          </button>
        </div>
      </div>

      {activeView === 'timeline' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
                <Calendar size={18} />
                Recent Meetings
              </h3>
              <div className="space-y-3">
                {meetings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar size={40} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500">No meetings recorded yet</p>
                  </div>
                ) : (
                  meetings.map((meeting) => (
                    <button
                      key={meeting.meetingId}
                      onClick={() => handleMeetingClick(meeting.meetingId)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedMeeting?.meetingId === meeting.meetingId
                          ? 'border-[#E98A24] bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">
                            {new Date(meeting.meetingDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-sm font-bold text-gray-900 mb-2">
                            {meeting.meetingType}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(meeting.status)}
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mb-2 ${getStatusColor(meeting.status)}`}>
                        {meeting.status}
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <ListTodo size={12} />
                          <span>{meeting.tasksCount} tasks created</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText size={12} />
                          <span>{meeting.decisionsCount} decisions made</span>
                        </div>
                        {meeting.parkingLotCount > 0 && (
                          <div className="flex items-center gap-2">
                            <MessageSquare size={12} />
                            <span>{meeting.parkingLotCount} parking lot items</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedMeeting ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{selectedMeeting.meetingType}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>
                            {new Date(selectedMeeting.meetingDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="h-4 w-px bg-white/30" />
                        <span className="font-mono text-xs">{selectedMeeting.meetingId}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusColor(selectedMeeting.status)}`}>
                      {selectedMeeting.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href={selectedMeeting.fathomLink}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Fathom Transcript</span>
                    </a>
                    <a
                      href={selectedMeeting.summaryLink}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                    >
                      <FileText size={14} />
                      <span>Meeting Summary</span>
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  {selectedMeeting.sections.length > 0 && (
                    <div className="mb-4">
                      <button
                        onClick={toggleAllSections}
                        className="text-sm text-[#E98A24] hover:text-[#1A9CD7] font-semibold transition-colors"
                      >
                        {expandedSections.size === selectedMeeting.sections.length ? 'Collapse All' : 'Expand All'} Sections
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {selectedMeeting.sections.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <FileText size={40} className="mx-auto mb-3 text-gray-400" />
                        <p>No sections available for this meeting</p>
                      </div>
                    ) : (
                      selectedMeeting.sections.map((section) => (
                        <MeetingSectionCard
                          key={section.sectionNumber}
                          section={section}
                          isExpanded={expandedSections.has(section.sectionNumber)}
                          onToggle={() => toggleSection(section.sectionNumber)}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Meeting</h3>
                <p className="text-gray-600">
                  Choose a meeting from the list to view its details and sections
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === 'linkage' && (
        <DecisionTaskLinkage />
      )}
    </div>
  );
}

function MeetingSectionCard({ section, isExpanded, onToggle }: {
  section: MeetingSection;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-500">Section {section.sectionNumber}</span>
          <h4 className="font-bold text-gray-900">{section.sectionTitle}</h4>
        </div>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isExpanded && (
        <div className="p-4 bg-white space-y-4">
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">{section.discussionSummary}</p>
          </div>

          {section.keyPoints.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Key Points</p>
              <ul className="space-y-1">
                {section.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-[#E98A24] mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-start gap-6 text-xs">
            {section.relatedDecisionIds.length > 0 && (
              <div>
                <p className="font-semibold text-gray-600 uppercase mb-2">Decisions</p>
                <div className="flex flex-wrap gap-2">
                  {section.relatedDecisionIds.map((id) => (
                    <button
                      key={id}
                      className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full font-mono hover:bg-blue-200 transition-colors"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {section.relatedTaskIds.length > 0 && (
              <div>
                <p className="font-semibold text-gray-600 uppercase mb-2">Tasks</p>
                <div className="flex flex-wrap gap-2">
                  {section.relatedTaskIds.map((id) => (
                    <button
                      key={id}
                      className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-mono hover:bg-green-200 transition-colors"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {section.relatedDecisionIds.length === 0 && section.relatedTaskIds.length === 0 && (
              <p className="text-gray-500 italic">No linked decisions or tasks from this section</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DecisionTaskLinkage() {
  const mockDecisions = [
    {
      decisionId: 'D-2026-03-05-01',
      summary: 'No brainstorming during hardening sprint',
      meetingId: '2026-03-05-01',
      meetingSection: 1,
      approvedBy: 'Ed, Glen',
      impact: 'High - Governs Phase 1 changes',
      relatedTasks: []
    },
    {
      decisionId: 'D-2026-03-05-02',
      summary: 'Ken avatar must be invitational, not gatekeeping',
      meetingId: '2026-03-05-01',
      meetingSection: 1,
      approvedBy: 'Team consensus',
      impact: 'Medium',
      relatedTasks: [
        { taskId: '1.2', description: 'Position Ken Avatar', status: 'In Progress' },
        { taskId: '2.1', description: 'Video visibility', status: 'Not Started' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <LinkIcon size={24} className="text-[#E98A24]" />
        <h3 className="text-xl font-bold text-gray-900">Decision Impact Map</h3>
      </div>

      <div className="space-y-6">
        {mockDecisions.map((decision) => (
          <div key={decision.decisionId} className="border-l-4 border-[#E98A24] pl-6 pb-6">
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <span className="text-xs font-mono text-gray-500">{decision.decisionId}</span>
                  <h4 className="text-lg font-bold text-gray-900 mt-1">{decision.summary}</h4>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-start gap-2">
                <Calendar size={14} className="text-gray-400 mt-0.5" />
                <div>
                  <span className="text-gray-600">From: </span>
                  <button className="text-[#1A9CD7] hover:underline font-semibold">
                    March 5, 2026 Meeting (Section {decision.meetingSection})
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={14} className="text-gray-400 mt-0.5" />
                <div>
                  <span className="text-gray-600">Approved By: </span>
                  <span className="font-semibold text-gray-900">{decision.approvedBy}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileText size={14} className="text-gray-400 mt-0.5" />
                <div>
                  <span className="text-gray-600">Impact: </span>
                  <span className="font-semibold text-gray-900">{decision.impact}</span>
                </div>
              </div>
            </div>

            {decision.relatedTasks.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Spawned Tasks</p>
                <div className="space-y-2">
                  {decision.relatedTasks.map((task) => (
                    <div
                      key={task.taskId}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-xs font-mono text-gray-500">{task.taskId}</span>
                      <span className="flex-1 text-sm text-gray-900">{task.description}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {decision.relatedTasks.length === 0 && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500 italic">No related tasks</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
