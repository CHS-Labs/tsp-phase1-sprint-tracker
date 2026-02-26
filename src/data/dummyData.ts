export type TaskStatus = 'Not Started' | 'In Progress' | 'Blocked' | 'Done';
export type Priority = 'High' | 'Medium' | 'Low';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type ChangeOrderStatus = 'Proposed' | 'Under Review' | 'Approved' | 'Completed';

export interface Task {
  id: string;
  description: string;
  category: string;
  priority: Priority;
  status: TaskStatus;
  owner: string;
  dueDate: string;
  sprintWeek: number;
  progress: number;
  notes?: string;
}

export interface MeetingAgenda {
  id: string;
  date: string;
  weekNumber: number;
  title: string;
  highlights: string[];
  actionItems: number;
  decisionsCount: number;
  fathomLink: string;
  fullAgenda: string;
}

export interface Decision {
  id: string;
  summary: string;
  date: string;
  context: string;
  impact: 'Architecture' | 'Security' | 'Process' | 'Budget' | 'Timeline';
  reversalRisk: RiskLevel;
  approvalStatus: 'Approved' | 'Pending' | 'Rejected';
}

export interface Risk {
  id: string;
  description: string;
  probability: RiskLevel;
  impact: RiskLevel;
  mitigation: string;
  owner: string;
  status: 'Open' | 'Mitigated' | 'Closed';
}

export interface ValidationItem {
  id: string;
  deliverable: string;
  category: string;
  completed: boolean;
  progress: number;
  deficiencies: string[];
}

export interface ChangeOrder {
  id: string;
  description: string;
  requestedBy: string;
  date: string;
  status: ChangeOrderStatus;
  impact: string;
  estimatedCost?: string;
}

export const tasks: Task[] = [
  {
    id: 'T001',
    description: 'Complete architecture review documentation',
    category: 'Architecture',
    priority: 'High',
    status: 'In Progress',
    owner: 'Alex Rivera',
    dueDate: '2026-03-15',
    sprintWeek: 2,
    progress: 65,
    notes: 'Reviewing microservices patterns'
  },
  {
    id: 'T002',
    description: 'Security audit of authentication layer',
    category: 'Security',
    priority: 'High',
    status: 'Not Started',
    owner: 'Sarah Chen',
    dueDate: '2026-03-20',
    sprintWeek: 3,
    progress: 0
  },
  {
    id: 'T003',
    description: 'Database schema validation',
    category: 'Database',
    priority: 'Medium',
    status: 'Done',
    owner: 'Michael Torres',
    dueDate: '2026-03-10',
    sprintWeek: 1,
    progress: 100
  },
  {
    id: 'T004',
    description: 'API endpoint testing suite',
    category: 'Testing',
    priority: 'High',
    status: 'In Progress',
    owner: 'Alex Rivera',
    dueDate: '2026-03-25',
    sprintWeek: 4,
    progress: 40
  },
  {
    id: 'T005',
    description: 'Load balancer configuration review',
    category: 'Infrastructure',
    priority: 'Medium',
    status: 'Blocked',
    owner: 'Jordan Kim',
    dueDate: '2026-03-18',
    sprintWeek: 3,
    progress: 20,
    notes: 'Waiting on cloud provider response'
  },
  {
    id: 'T006',
    description: 'CI/CD pipeline hardening',
    category: 'DevOps',
    priority: 'High',
    status: 'In Progress',
    owner: 'Sarah Chen',
    dueDate: '2026-04-05',
    sprintWeek: 5,
    progress: 55
  },
  {
    id: 'T007',
    description: 'Documentation update for API changes',
    category: 'Documentation',
    priority: 'Low',
    status: 'Not Started',
    owner: 'Michael Torres',
    dueDate: '2026-04-15',
    sprintWeek: 7,
    progress: 0
  },
  {
    id: 'T008',
    description: 'Performance benchmarking',
    category: 'Testing',
    priority: 'Medium',
    status: 'In Progress',
    owner: 'Jordan Kim',
    dueDate: '2026-04-10',
    sprintWeek: 6,
    progress: 30
  }
];

export const meetingAgendas: MeetingAgenda[] = [
  {
    id: 'MA001',
    date: '2026-03-03',
    weekNumber: 1,
    title: 'Sprint Kickoff',
    highlights: [
      'Sprint objectives review',
      'Team roles and responsibilities',
      'Initial risk assessment',
      'Communication protocols established'
    ],
    actionItems: 5,
    decisionsCount: 3,
    fathomLink: 'https://app.fathom.video/call/placeholder-1',
    fullAgenda: `SPRINT KICKOFF MEETING
Date: March 3, 2026
Duration: 2 hours

OBJECTIVES:
- Align team on sprint goals
- Establish communication cadence
- Review architecture baseline

ATTENDEES:
- Alex Rivera (Lead Architect)
- Sarah Chen (Security Lead)
- Michael Torres (Database Architect)
- Jordan Kim (DevOps Engineer)

AGENDA:
1. Welcome & Sprint Overview (15 min)
2. SOW Deep Dive (30 min)
3. Risk Assessment (30 min)
4. Action Item Assignment (30 min)
5. Next Steps & Q&A (15 min)

ACTION ITEMS:
- Complete baseline documentation review by EOW
- Set up project tracking tools
- Schedule security audit kickoff`
  },
  {
    id: 'MA002',
    date: '2026-03-10',
    weekNumber: 2,
    title: 'Architecture Review',
    highlights: [
      'Microservices architecture patterns discussed',
      'Database scaling strategy approved',
      'API versioning approach finalized',
      'Security requirements clarified'
    ],
    actionItems: 8,
    decisionsCount: 5,
    fathomLink: 'https://app.fathom.video/call/placeholder-2',
    fullAgenda: `ARCHITECTURE REVIEW MEETING
Date: March 10, 2026
Duration: 90 minutes

KEY TOPICS:
- Service mesh implementation
- Data consistency patterns
- API gateway configuration
- Monitoring and observability

DECISIONS MADE:
- Adopt event-driven architecture for async operations
- Implement CQRS pattern for high-traffic services
- Use GraphQL for client-facing APIs

ACTION ITEMS:
- Document service boundaries
- Create sequence diagrams for critical flows
- Prototype API gateway setup`
  },
  {
    id: 'MA003',
    date: '2026-03-17',
    weekNumber: 3,
    title: 'Security Audit Progress',
    highlights: [
      'Authentication layer review completed',
      'Penetration testing scheduled',
      'Compliance requirements reviewed',
      'Incident response plan drafted'
    ],
    actionItems: 6,
    decisionsCount: 4,
    fathomLink: 'https://app.fathom.video/call/placeholder-3',
    fullAgenda: `SECURITY AUDIT PROGRESS MEETING
Date: March 17, 2026
Duration: 2 hours

SECURITY REVIEW:
- OAuth 2.0 implementation validated
- Rate limiting configured
- SQL injection prevention verified
- CORS policies reviewed

FINDINGS:
- 3 high-priority vulnerabilities identified
- 7 medium-priority improvements recommended
- Zero critical issues found

NEXT STEPS:
- Remediate high-priority items by March 24
- Schedule follow-up audit`
  },
  {
    id: 'MA004',
    date: '2026-03-24',
    weekNumber: 4,
    title: 'Mid-Sprint Checkpoint',
    highlights: [
      'Progress tracking: 45% complete',
      'Blockers identified and escalated',
      'Budget review and variance analysis',
      'Scope adjustment proposal'
    ],
    actionItems: 10,
    decisionsCount: 6,
    fathomLink: 'https://app.fathom.video/call/placeholder-4',
    fullAgenda: `MID-SPRINT CHECKPOINT
Date: March 24, 2026
Duration: 90 minutes

PROGRESS SUMMARY:
- Architecture hardening: 50% complete
- Security validation: 40% complete
- Performance testing: 30% complete
- Documentation: 25% complete

BLOCKERS:
- Cloud provider API changes
- Third-party library compatibility issues

DECISIONS:
- Extend security audit by 1 week
- Add additional load testing scenarios`
  }
];

export const decisions: Decision[] = [
  {
    id: 'D001',
    summary: 'Adopt event-driven architecture for async operations',
    date: '2026-03-10',
    context: 'To improve system resilience and scalability, we need asynchronous processing for non-critical operations.',
    impact: 'Architecture',
    reversalRisk: 'High',
    approvalStatus: 'Approved'
  },
  {
    id: 'D002',
    summary: 'Implement CQRS pattern for high-traffic services',
    date: '2026-03-10',
    context: 'Separate read and write operations to optimize performance and scalability for services with high query volumes.',
    impact: 'Architecture',
    reversalRisk: 'High',
    approvalStatus: 'Approved'
  },
  {
    id: 'D003',
    summary: 'Use GraphQL for client-facing APIs',
    date: '2026-03-10',
    context: 'Provide flexible data querying capabilities and reduce over-fetching for mobile and web clients.',
    impact: 'Architecture',
    reversalRisk: 'Medium',
    approvalStatus: 'Approved'
  },
  {
    id: 'D004',
    summary: 'Extend security audit timeline by 1 week',
    date: '2026-03-24',
    context: 'Additional vulnerabilities discovered require thorough remediation and validation.',
    impact: 'Timeline',
    reversalRisk: 'Low',
    approvalStatus: 'Approved'
  },
  {
    id: 'D005',
    summary: 'Implement rate limiting at API gateway level',
    date: '2026-03-17',
    context: 'Protect backend services from DDoS attacks and ensure fair resource allocation.',
    impact: 'Security',
    reversalRisk: 'Low',
    approvalStatus: 'Approved'
  },
  {
    id: 'D006',
    summary: 'Add chaos engineering to validation phase',
    date: '2026-03-24',
    context: 'Test system resilience under failure conditions before production deployment.',
    impact: 'Process',
    reversalRisk: 'Low',
    approvalStatus: 'Pending'
  }
];

export const risks: Risk[] = [
  {
    id: 'R001',
    description: 'Database migration complexity may cause delays',
    probability: 'Medium',
    impact: 'High',
    mitigation: 'Create detailed rollback plan, perform dry runs in staging environment',
    owner: 'Michael Torres',
    status: 'Open'
  },
  {
    id: 'R002',
    description: 'Third-party API dependency changes',
    probability: 'Low',
    impact: 'Medium',
    mitigation: 'Implement adapter pattern, maintain version locks',
    owner: 'Alex Rivera',
    status: 'Mitigated'
  },
  {
    id: 'R003',
    description: 'Security vulnerabilities in legacy code',
    probability: 'High',
    impact: 'Critical',
    mitigation: 'Comprehensive security audit, automated vulnerability scanning',
    owner: 'Sarah Chen',
    status: 'Open'
  },
  {
    id: 'R004',
    description: 'Load testing reveals performance bottlenecks',
    probability: 'Medium',
    impact: 'High',
    mitigation: 'Early performance testing, caching strategy, database optimization',
    owner: 'Jordan Kim',
    status: 'Open'
  },
  {
    id: 'R005',
    description: 'Incomplete documentation affects knowledge transfer',
    probability: 'Medium',
    impact: 'Medium',
    mitigation: 'Dedicated documentation sprints, peer review process',
    owner: 'Michael Torres',
    status: 'Mitigated'
  }
];

export const validationItems: ValidationItem[] = [
  {
    id: 'V001',
    deliverable: 'Architecture documentation',
    category: 'Documentation',
    completed: true,
    progress: 100,
    deficiencies: []
  },
  {
    id: 'V002',
    deliverable: 'Security audit report',
    category: 'Security',
    completed: false,
    progress: 70,
    deficiencies: ['Penetration testing incomplete', 'Compliance checklist pending']
  },
  {
    id: 'V003',
    deliverable: 'Performance benchmarks',
    category: 'Testing',
    completed: false,
    progress: 45,
    deficiencies: ['Load testing under peak conditions', 'Stress testing scenarios']
  },
  {
    id: 'V004',
    deliverable: 'API documentation',
    category: 'Documentation',
    completed: false,
    progress: 60,
    deficiencies: ['GraphQL schema documentation', 'Error response examples']
  },
  {
    id: 'V005',
    deliverable: 'Database schema validation',
    category: 'Database',
    completed: true,
    progress: 100,
    deficiencies: []
  },
  {
    id: 'V006',
    deliverable: 'CI/CD pipeline configuration',
    category: 'DevOps',
    completed: false,
    progress: 80,
    deficiencies: ['Production deployment automation']
  }
];

export const changeOrders: ChangeOrder[] = [
  {
    id: 'CO001',
    description: 'Add chaos engineering to validation phase',
    requestedBy: 'Sarah Chen',
    date: '2026-03-24',
    status: 'Under Review',
    impact: 'Extends testing timeline by 5 days, increases confidence in system resilience',
    estimatedCost: '$8,500'
  },
  {
    id: 'CO002',
    description: 'Implement GraphQL instead of REST for client APIs',
    requestedBy: 'Alex Rivera',
    date: '2026-03-10',
    status: 'Approved',
    impact: 'Better client flexibility, 2-week development extension',
    estimatedCost: '$15,000'
  },
  {
    id: 'CO003',
    description: 'Add real-time monitoring dashboard',
    requestedBy: 'Jordan Kim',
    date: '2026-03-20',
    status: 'Proposed',
    impact: 'Improved observability, requires additional tooling',
    estimatedCost: '$12,000'
  },
  {
    id: 'CO004',
    description: 'Extend security audit scope to include mobile apps',
    requestedBy: 'Sarah Chen',
    date: '2026-03-15',
    status: 'Completed',
    impact: 'Comprehensive security coverage',
    estimatedCost: '$10,000'
  }
];

export const currentUser = 'Alex Rivera';
