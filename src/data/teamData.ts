export interface TeamMember {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar?: string;
  status?: 'active' | 'away' | 'offline';
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Alex Rivera',
    role: 'Lead Architect',
    email: 'alex.rivera@example.com',
    phone: '(555) 123-4567',
    status: 'active'
  },
  {
    name: 'Sarah Chen',
    role: 'Security Lead',
    email: 'sarah.chen@example.com',
    phone: '(555) 234-5678',
    status: 'active'
  },
  {
    name: 'Michael Torres',
    role: 'Database Architect',
    email: 'michael.torres@example.com',
    phone: '(555) 345-6789',
    status: 'away'
  },
  {
    name: 'Jordan Kim',
    role: 'DevOps Engineer',
    email: 'jordan.kim@example.com',
    phone: '(555) 456-7890',
    status: 'active'
  }
];
