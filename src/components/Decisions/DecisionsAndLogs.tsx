import { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, GitBranch, Calendar, User, TrendingUp, Printer } from 'lucide-react';
import {
  decisions,
  risks,
  validationItems,
  changeOrders,
  RiskLevel,
  ChangeOrderStatus
} from '../../data/dummyData';

type Tab = 'decisions' | 'risks' | 'validation' | 'changes';

export default function DecisionsAndLogs() {
  const [activeTab, setActiveTab] = useState<Tab>('decisions');

  const tabs = [
    { id: 'decisions' as Tab, label: 'Decisions Log', icon: FileText, count: decisions.length },
    { id: 'risks' as Tab, label: 'Risk Register', icon: AlertTriangle, count: risks.length },
    { id: 'validation' as Tab, label: 'Validation Checklist', icon: CheckCircle, count: validationItems.length },
    { id: 'changes' as Tab, label: 'Change Orders', icon: GitBranch, count: changeOrders.length }
  ];

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-600 text-white';
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getImpactColor = (impact: string) => {
    const colors: Record<string, string> = {
      'Architecture': 'bg-purple-100 text-purple-700 border-purple-300',
      'Security': 'bg-red-100 text-red-700 border-red-300',
      'Process': 'bg-blue-100 text-blue-700 border-blue-300',
      'Budget': 'bg-green-100 text-green-700 border-green-300',
      'Timeline': 'bg-yellow-100 text-yellow-700 border-yellow-300'
    };
    return colors[impact] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getChangeOrderStatusColor = (status: ChangeOrderStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Approved':
        return 'bg-blue-100 text-blue-700';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700';
      case 'Proposed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 print-full-width">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Decisions & Logs</h2>
        <button
          onClick={() => window.print()}
          className="text-gray-400 hover:text-[#E98A24] transition-colors no-print"
          aria-label="Print this page"
        >
          <Printer size={20} />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50 no-print">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 flex items-center justify-center gap-3 transition-all ${
                  activeTab === tab.id
                    ? 'bg-white border-b-2 border-[#E98A24] text-[#E98A24]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-semibold">{tab.label}</span>
                <span className="px-2 py-1 bg-gray-200 rounded-full text-xs font-bold">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'decisions' && (
            <div className="space-y-4">
              {decisions.map((decision) => (
                <div
                  key={decision.id}
                  className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#E98A24] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-gray-500">{decision.id}</span>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getImpactColor(
                            decision.impact
                          )}`}
                        >
                          {decision.impact}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(decision.reversalRisk)}`}>
                          Reversal Risk: {decision.reversalRisk}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{decision.summary}</h3>
                      <p className="text-sm text-gray-700">{decision.context}</p>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          decision.approvalStatus === 'Approved'
                            ? 'bg-green-100 text-green-700'
                            : decision.approvalStatus === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {decision.approvalStatus}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar size={12} />
                    <span>{new Date(decision.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-4">
              {risks.map((risk) => (
                <div
                  key={risk.id}
                  className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#1A9CD7] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex gap-2">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Probability</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(risk.probability)}`}>
                          {risk.probability}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Impact</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(risk.impact)}`}>
                          {risk.impact}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-gray-500">{risk.id}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            risk.status === 'Mitigated'
                              ? 'bg-green-100 text-green-700'
                              : risk.status === 'Closed'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {risk.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2">{risk.description}</h3>
                    </div>
                  </div>
                  <div className="bg-white rounded p-4 mb-3">
                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Mitigation Strategy</p>
                    <p className="text-sm text-gray-700">{risk.mitigation}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <User size={12} />
                    <span>Owner: {risk.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="space-y-4">
              {validationItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-gray-500">{item.id}</span>
                        <span className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                          {item.category}
                        </span>
                        {item.completed && (
                          <CheckCircle size={18} className="text-green-600" />
                        )}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-3">{item.deliverable}</h3>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              item.completed
                                ? 'bg-green-500'
                                : 'bg-[#E98A24]'
                            }`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{item.progress}%</span>
                      </div>
                    </div>
                  </div>
                  {item.deficiencies.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-xs font-semibold text-yellow-800 uppercase mb-2">
                        Outstanding Deficiencies ({item.deficiencies.length})
                      </p>
                      <ul className="space-y-1">
                        {item.deficiencies.map((def, i) => (
                          <li key={i} className="text-sm text-yellow-900 flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            <span>{def}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'changes' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {(['Proposed', 'Under Review', 'Approved', 'Completed'] as ChangeOrderStatus[]).map((status) => (
                <div key={status} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getChangeOrderStatusColor(status)}`} />
                    {status}
                  </h3>
                  <div className="space-y-3">
                    {changeOrders
                      .filter((co) => co.status === status)
                      .map((co) => (
                        <div
                          key={co.id}
                          className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-mono text-gray-500">{co.id}</span>
                            {co.estimatedCost && (
                              <span className="text-xs font-bold text-[#E98A24]">{co.estimatedCost}</span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">{co.description}</p>
                          <p className="text-xs text-gray-600 mb-2">{co.impact}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <User size={10} />
                            <span>{co.requestedBy}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
