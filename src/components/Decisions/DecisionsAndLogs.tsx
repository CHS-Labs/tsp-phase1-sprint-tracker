import { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, GitBranch, Calendar, User, TrendingUp, Printer } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

type Tab = 'decisions' | 'risks' | 'validation' | 'changes';
type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
type ChangeOrderStatus = 'Proposed' | 'Under Review' | 'Approved' | 'Completed';

export default function DecisionsAndLogs() {
  const { decisions, risks, validationChecklist, changeOrders, isLoading } = useData();
  const [activeTab, setActiveTab] = useState<Tab>('decisions');

  const tabs = [
    { id: 'decisions' as Tab, label: 'Decisions Log', icon: FileText, count: decisions.length },
    { id: 'risks' as Tab, label: 'Risk Register', icon: AlertTriangle, count: risks.length },
    { id: 'validation' as Tab, label: 'Validation Checklist', icon: CheckCircle, count: validationChecklist.length },
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

  const getChangeOrderStatusColor = (status: string) => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#E98A24] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 print-full-width">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Decisions & Logs</h2>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors no-print"
        >
          <Printer size={18} />
          <span className="font-semibold">Print</span>
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
              {decisions.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No decisions recorded yet.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Decision records will appear here from your Google Sheet.
                  </p>
                </div>
              ) : (
                decisions.map((decision) => (
                  <div
                    key={decision.decisionId}
                    className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#E98A24] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono text-gray-500">{decision.decisionId}</span>
                          {decision.impact && (
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getImpactColor(
                                decision.impact
                              )}`}
                            >
                              {decision.impact}
                            </span>
                          )}
                          {decision.reversalRisk && (
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(decision.reversalRisk as RiskLevel)}`}>
                              Reversal Risk: {decision.reversalRisk}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{decision.decisionSummary}</h3>
                        <p className="text-sm text-gray-700">{decision.context}</p>
                      </div>
                      {decision.approvedBy && (
                        <div className="ml-4">
                          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-green-100 text-green-700">
                            Approved by {decision.approvedBy}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar size={12} />
                      <span>{decision.date ? new Date(decision.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-4">
              {risks.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                  <AlertTriangle size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No risks identified yet.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Risk register items will appear here from your Google Sheet.
                  </p>
                </div>
              ) : (
                risks.map((risk, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#1A9CD7] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex gap-2">
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">Probability</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(risk.probability as RiskLevel)}`}>
                            {risk.probability}
                          </span>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">Impact</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(risk.impact as RiskLevel)}`}>
                            {risk.impact}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900 mb-2">{risk.risk}</h3>
                      </div>
                    </div>
                    {risk.mitigation && (
                      <div className="bg-white rounded p-4 mb-3">
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Mitigation Strategy</p>
                        <p className="text-sm text-gray-700">{risk.mitigation}</p>
                      </div>
                    )}
                    {risk.owner && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <User size={12} />
                        <span>Owner: {risk.owner}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="space-y-4">
              {validationChecklist.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                  <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No validation items yet.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Validation checklist items will appear here from your Google Sheet.
                  </p>
                </div>
              ) : (
                validationChecklist.map((item, index) => {
                  const isDelivered = item.delivered?.toLowerCase() === 'yes';
                  const isAccepted = item.accepted?.toLowerCase() === 'yes';
                  const hasCured = item.cureCompleted?.toLowerCase() === 'yes';
                  const hasDeficiency = item.deficiencyIdentified && item.deficiencyIdentified.toLowerCase() !== 'no' && item.deficiencyIdentified.trim() !== '';

                  let progress = 0;
                  if (isDelivered) progress = 50;
                  if (isAccepted) progress = 100;
                  if (hasDeficiency && !hasCured) progress = 75;

                  const completed = isAccepted && (!hasDeficiency || hasCured);

                  return (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {completed && (
                              <CheckCircle size={18} className="text-green-600" />
                            )}
                            {item.reviewedBy && (
                              <span className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                                Reviewed by: {item.reviewedBy}
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-gray-900 mb-3">{item.deliverable}</h3>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div
                                className={`h-full transition-all ${
                                  completed
                                    ? 'bg-green-500'
                                    : 'bg-gradient-to-r from-[#E98A24] to-[#1A9CD7]'
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-gray-700">{progress}%</span>
                          </div>
                          {item.dateDelivered && (
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                              <Calendar size={12} />
                              <span>Delivered: {item.dateDelivered}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {hasDeficiency && !hasCured && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                          <p className="text-xs font-semibold text-yellow-800 uppercase mb-2">
                            Outstanding Deficiency
                          </p>
                          <p className="text-sm text-yellow-900">{item.deficiencyIdentified}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'changes' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {(['Proposed', 'Under Review', 'Approved', 'Completed'] as ChangeOrderStatus[]).map((status) => {
                const statusOrders = changeOrders.filter((co) => co.status === status);
                return (
                  <div key={status} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getChangeOrderStatusColor(status)}`} />
                      {status} ({statusOrders.length})
                    </h3>
                    <div className="space-y-3">
                      {statusOrders.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">No {status.toLowerCase()} change orders</p>
                      ) : (
                        statusOrders.map((co, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <p className="text-sm font-semibold text-gray-900 mb-2">{co.proposedChange}</p>
                            {co.date && (
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <Calendar size={10} />
                                <span>{co.date}</span>
                              </div>
                            )}
                            {co.requiresWrittenChangeOrder && co.requiresWrittenChangeOrder.toLowerCase() === 'yes' && (
                              <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                                Written CO Required
                              </span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
