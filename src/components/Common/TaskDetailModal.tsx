import { X, ExternalLink, FileText, Calendar, User, AlertCircle } from 'lucide-react';
import { ActionLogTask } from '../../types';
import { useData } from '../../contexts/DataContext';

interface TaskDetailModalProps {
  task: ActionLogTask;
  onClose: () => void;
  onViewDecision?: (decisionId: string) => void;
  onViewMeeting?: (meetingId: string) => void;
}

export default function TaskDetailModal({ task, onClose, onViewDecision, onViewMeeting }: TaskDetailModalProps) {
  const { decisions } = useData();

  const linkedDecision = task.linkedDecisionId
    ? decisions.find(d => d.decisionId === task.linkedDecisionId)
    : null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${import.meta.env.VITE_SPREADSHEET_ID}/edit#gid=0`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">
                  {task.taskId}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(task.status)} bg-white`}>
                  {task.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold">Task Details</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Description</h3>
              <p className="text-lg text-gray-900 font-medium leading-relaxed">
                {task.taskDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
                  <User size={12} />
                  Owner
                </h3>
                <p className="text-sm text-gray-900 font-medium">{task.owner || 'Unassigned'}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
                  <AlertCircle size={12} />
                  Priority
                </h3>
                <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
                  {task.priority || 'Not set'}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
                  <Calendar size={12} />
                  Due Date
                </h3>
                <p className="text-sm text-gray-900">
                  {task.dueDate || 'Not set'}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Sprint Week</h3>
                <p className="text-sm text-gray-900">{task.sprintWeek || 'Not assigned'}</p>
              </div>
            </div>

            {task.relatedSOWCategory && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">SOW Category</h3>
                <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                  {task.relatedSOWCategory}
                </p>
              </div>
            )}

            {task.source && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Source</h3>
                <p className="text-sm text-gray-900">{task.source}</p>
              </div>
            )}

            {task.notes && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Notes</h3>
                <p className="text-sm text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 px-3 py-2 rounded">
                  {task.notes}
                </p>
              </div>
            )}

            {task.sourceMeetingId && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Source Meeting</h3>
                <button
                  onClick={() => onViewMeeting?.(task.sourceMeetingId!)}
                  className="flex items-center gap-2 text-sm text-[#1A9CD7] hover:text-[#E98A24] font-semibold transition-colors"
                >
                  <Calendar size={14} />
                  <span>{task.sourceMeetingId}</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            )}

            {linkedDecision && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-blue-900 uppercase mb-2 flex items-center gap-1">
                  <FileText size={12} />
                  Linked Decision
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">
                      {linkedDecision.decisionId}
                    </span>
                    <span className="text-xs text-blue-700">
                      {linkedDecision.date}
                    </span>
                  </div>
                  <p className="text-sm text-blue-900 font-medium">
                    {linkedDecision.decisionSummary}
                  </p>
                  <button
                    onClick={() => {
                      onViewDecision?.(linkedDecision.decisionId);
                      onClose();
                    }}
                    className="text-sm text-[#1A9CD7] hover:text-[#E98A24] font-semibold flex items-center gap-1 transition-colors"
                  >
                    View Full Decision
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
          <a
            href={spreadsheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
          >
            <ExternalLink size={16} />
            Open in Google Sheets
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
