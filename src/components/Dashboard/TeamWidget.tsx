import { Users } from 'lucide-react';
import { teamMembers } from '../../data/teamData';

export default function TeamWidget() {
  const activeMembers = teamMembers.filter(m => m.status === 'active').length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Users size={20} className="text-[#1A9CD7]" />
          Team
        </h3>
        <span className="text-sm text-gray-600">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1" />
          {activeMembers} active
        </span>
      </div>

      <div className="space-y-3">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {member.name}
                </p>
                <div
                  className={`w-2 h-2 rounded-full ${
                    member.status === 'active'
                      ? 'bg-green-500'
                      : member.status === 'away'
                      ? 'bg-yellow-500'
                      : 'bg-gray-400'
                  }`}
                  title={member.status}
                />
              </div>
              <p className="text-xs text-gray-600 truncate">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
