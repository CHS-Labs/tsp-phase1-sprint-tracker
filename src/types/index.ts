// Type definitions for all Google Sheet tabs

export interface SOWDeliverable {
  category: string;
  refinementItem: string;
  includedInSOW: string;
  owner: string;
  status: string;
  acceptanceConfirmed: string;
  notes: string;
}

export interface ActionLogTask {
  taskId: string;
  taskDescription: string;
  relatedSOWCategory: string;
  owner: string;
  source: string;
  priority: string;
  status: string;
  dueDate: string;
  sprintWeek: string;
  notes: string;
  linkedDecisionId: string;
}

export interface WeeklyMeeting {
  meetingDate: string;
  meetingType: string;
  zoomLink: string;
  fathomTranscriptLink: string;
  summary: string;
  actionItemsExtracted: string;
  decisionsIdentified: string;
  processed: string;
}

export interface Decision {
  decisionId: string;
  date: string;
  decisionSummary: string;
  context: string;
  approvedBy: string;
  relatedSOWSection: string;
  impact: string;
  reversalRisk: string;
  notes: string;
}

export interface ParkingLotIdea {
  idea: string;
  raisedBy: string;
  date: string;
  relatedTo: string;
  impactCategory: string;
  suggestedPhase: string;
  reviewed: string;
}

export interface ValidationItem {
  deliverable: string;
  delivered: string;
  dateDelivered: string;
  reviewedBy: string;
  accepted: string;
  deficiencyIdentified: string;
  cureCompleted: string;
}

export interface AnalyticsBaseline {
  metric: string;
  baseline: string;
  current: string;
  trend: string;
  notes: string;
}

export interface Risk {
  risk: string;
  probability: string;
  impact: string;
  owner: string;
  mitigation: string;
}

export interface ChangeOrder {
  proposedChange: string;
  date: string;
  requiresWrittenChangeOrder: string;
  status: string;
}

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  phone: string;
  status?: 'active' | 'away' | 'offline';
}

export interface User {
  email: string;
  name: string;
  picture: string;
  accessToken: string;
}

// Sheet names mapping
export const SHEET_NAMES = {
  SOW_DELIVERABLES: 'SOW Master Deliverables',
  ACTION_LOG: 'Action Log',
  MEETING_LOG: 'Weekly Meeting Log',
  DECISIONS: 'Decisions Log',
  PARKING_LOT: 'Parking Lot',
  VALIDATION: 'Validation Checklist',
  ANALYTICS: 'Analytics Baseline',
  RISK_REGISTER: 'Risk Register',
  CHANGE_ORDERS: 'Change Order Tracker',
  TEAM: 'Team',
} as const;
