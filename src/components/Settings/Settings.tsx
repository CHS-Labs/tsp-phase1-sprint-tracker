import { Calendar, Users, Shield, Printer } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function Settings() {
  const { team } = useData();

  return (
    <div className="space-y-6 print-full-width">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Sprint Information</h2>
        <button
          onClick={() => window.print()}
          className="text-gray-400 hover:text-[#E98A24] transition-colors no-print"
          aria-label="Print this page"
        >
          <Printer size={20} />
        </button>
      </div>

      {/* Sprint Overview */}
      <div className="bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">
          The Simple Plan – Phase 1 Extension
        </h3>
        <p className="text-lg mb-6">Architecture Hardening & Validation Sprint</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} />
              <p className="font-semibold">Duration</p>
            </div>
            <p className="text-2xl font-bold">60 Days</p>
            <p className="text-sm opacity-90">March 1 – April 30, 2026</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users size={20} />
              <p className="font-semibold">Team</p>
            </div>
            <p className="text-2xl font-bold">{team.length} Members</p>
            <p className="text-sm opacity-90">Cross-functional collaboration</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={20} />
              <p className="font-semibold">Goal</p>
            </div>
            <p className="text-sm opacity-90">Building resilient, secure, and scalable systems</p>
          </div>
        </div>
      </div>

      {/* Team Directory - Name and Role Only */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users size={20} />
          Team Directory
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-5 border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                  {member.status && (
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          member.status === 'active'
                            ? 'bg-green-500'
                            : member.status === 'away'
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                        }`}
                      />
                      <span className="text-xs text-gray-500 capitalize">{member.status}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 italic">
          Contact information available in Google Sheets Team Directory
        </p>
      </div>

      {/* Sprint Focus */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sprint Focus</h3>
        <p className="text-gray-700 leading-relaxed">
          This 60-day sprint focuses on strengthening and validating system architecture through
          comprehensive hardening processes, security audits, and rigorous testing protocols.
          We're building resilient, secure, and scalable systems that meet enterprise-grade standards.
        </p>
      </div>

      {/* Quick Links - Minimal */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
        <div className="space-y-2">
          <div className="px-4 py-3 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900">Google Sheet Control Center</p>
            <p className="text-sm text-gray-600">View in Settings tab of Google Sheets</p>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900">Meeting Agendas & Summaries</p>
            <p className="text-sm text-gray-600">Access via Meeting Flow and Meeting Summaries views</p>
          </div>
        </div>
      </div>
    </div>
  );
}
