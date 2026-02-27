export interface MeetingSection {
  sectionNumber: number;
  sectionTitle: string;
  discussionSummary: string;
  keyPoints: string[];
  relatedDecisionIds: string[];
  relatedTaskIds: string[];
}

export interface Meeting {
  meetingId: string;
  meetingDate: string;
  meetingType: string;
  fathomLink: string;
  summaryLink: string;
  sections: MeetingSection[];
  decisionsCount: number;
  tasksCount: number;
  parkingLotCount: number;
  status: 'Recorded' | 'Extracted' | 'Reviewed' | 'Committed';
}

const mockMeetings: Meeting[] = [
  {
    meetingId: '2026-03-05-01',
    meetingDate: '2026-03-05',
    meetingType: 'Phase 1 Punch List Review',
    fathomLink: '#',
    summaryLink: '#',
    decisionsCount: 2,
    tasksCount: 8,
    parkingLotCount: 3,
    status: 'Committed',
    sections: [
      {
        sectionNumber: 1,
        sectionTitle: 'Opening + Intent',
        discussionSummary: 'Discussed unified understanding of phased process and importance of defining goals.',
        keyPoints: [
          'Agreement critical for tech to move ahead',
          'No brainstorming during hardening'
        ],
        relatedDecisionIds: ['D-2026-03-05-01', 'D-2026-03-05-02'],
        relatedTaskIds: []
      },
      {
        sectionNumber: 2,
        sectionTitle: 'SOW Deliverables Review',
        discussionSummary: 'Reviewed current deliverables and identified gaps in documentation.',
        keyPoints: [
          'Documentation must be production-ready',
          'All APIs need validation'
        ],
        relatedDecisionIds: [],
        relatedTaskIds: ['1.1', '1.2']
      }
    ]
  },
  {
    meetingId: '2026-02-27-01',
    meetingDate: '2026-02-27',
    meetingType: 'Hardening Kickoff',
    fathomLink: '#',
    summaryLink: '#',
    decisionsCount: 4,
    tasksCount: 5,
    parkingLotCount: 0,
    status: 'Committed',
    sections: [
      {
        sectionNumber: 1,
        sectionTitle: 'Sprint Overview',
        discussionSummary: 'Established goals for 60-day hardening sprint.',
        keyPoints: [
          'Focus on architecture validation',
          'Security review priority'
        ],
        relatedDecisionIds: [],
        relatedTaskIds: []
      }
    ]
  },
  {
    meetingId: '2026-02-20-01',
    meetingDate: '2026-02-20',
    meetingType: 'SOW Final Review',
    fathomLink: '#',
    summaryLink: '#',
    decisionsCount: 2,
    tasksCount: 0,
    parkingLotCount: 1,
    status: 'Committed',
    sections: []
  }
];

export const meetingService = {
  async getRecentMeetings(limit: number = 5): Promise<Meeting[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMeetings.slice(0, limit));
      }, 300);
    });
  },

  async getMeetingById(meetingId: string): Promise<Meeting | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const meeting = mockMeetings.find(m => m.meetingId === meetingId);
        resolve(meeting || null);
      }, 200);
    });
  }
};
