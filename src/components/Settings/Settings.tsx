import { FileText, Users, Calendar, Shield, Mail, Phone, User, Printer } from 'lucide-react';
import { teamMembers } from '../../data/teamData';

export default function Settings() {
  return (
    <div className="space-y-6 print-full-width">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Sprint Information</h2>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors no-print"
        >
          <Printer size={18} />
          <span className="font-semibold">Print</span>
        </button>
      </div>

      <div className="bg-[#E98A24] rounded-xl shadow-lg p-8 text-white">
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
              <p className="font-semibold">Team Size</p>
            </div>
            <p className="text-2xl font-bold">4 Members</p>
            <p className="text-sm opacity-90">Cross-functional team</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={20} />
              <p className="font-semibold">Focus Areas</p>
            </div>
            <p className="text-2xl font-bold">6 Categories</p>
            <p className="text-sm opacity-90">Architecture, Security, DevOps</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Mission Statement</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our mission is to strengthen and validate the system architecture through comprehensive
          hardening processes, security audits, and rigorous testing protocols. We aim to build
          resilient, secure, and scalable systems that meet enterprise-grade standards while
          maintaining operational excellence.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This 60-day sprint focuses on identifying vulnerabilities, implementing best practices,
          and establishing robust validation frameworks that will serve as the foundation for
          future development phases.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sprint Objectives</h3>
        <div className="space-y-3">
          {[
            'Complete comprehensive architecture review and documentation',
            'Execute security audits across all system layers',
            'Implement and validate performance benchmarking protocols',
            'Harden CI/CD pipeline with security best practices',
            'Establish risk mitigation strategies for identified vulnerabilities',
            'Create validation checklists for all deliverables'
          ].map((objective, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E98A24] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-gray-700 flex-1">{objective}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users size={20} />
          Team Directory
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{member.name}</h4>
                    {member.status && (
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
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                  <div className="space-y-1.5">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#1A9CD7] transition-colors"
                    >
                      <Mail size={14} />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#1A9CD7] transition-colors"
                    >
                      <Phone size={14} />
                      <span>{member.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Deliverables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Architecture Documentation',
              description: 'Complete system architecture diagrams and technical specifications'
            },
            {
              title: 'Security Audit Report',
              description: 'Comprehensive security assessment with remediation plans'
            },
            {
              title: 'Performance Benchmarks',
              description: 'Load testing results and optimization recommendations'
            },
            {
              title: 'Validation Checklist',
              description: 'Quality gates and acceptance criteria for all components'
            },
            {
              title: 'Risk Register',
              description: 'Documented risks with mitigation strategies and ownership'
            },
            {
              title: 'CI/CD Pipeline',
              description: 'Hardened deployment pipeline with automated security checks'
            }
          ].map((deliverable, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">{deliverable.title}</h4>
              <p className="text-sm text-gray-600">{deliverable.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          <FileText size={20} className="inline mr-2" />
          Resources & Documentation
        </h3>
        <div className="space-y-2">
          <a
            href="#"
            className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <p className="font-semibold text-gray-900">Statement of Work (SOW)</p>
            <p className="text-sm text-gray-600">Complete project scope and requirements</p>
          </a>
          <a
            href="#"
            className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <p className="font-semibold text-gray-900">Architecture Guidelines</p>
            <p className="text-sm text-gray-600">Best practices and design patterns</p>
          </a>
          <a
            href="#"
            className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <p className="font-semibold text-gray-900">Security Standards</p>
            <p className="text-sm text-gray-600">Compliance requirements and security protocols</p>
          </a>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
        <p className="text-sm text-gray-500 italic">
          This is a wireframe preview. Future integrations will include Google Sheets API
          for live data synchronization, Fathom transcript ingestion, and OAuth authentication.
        </p>
      </div>
    </div>
  );
}
