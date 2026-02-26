import { useState } from 'react';
import { Plus, X, ListTodo, FileText, GitBranch } from 'lucide-react';

type ActionType = 'task' | 'decision' | 'change' | null;

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState<ActionType>(null);

  const actions = [
    { id: 'task' as ActionType, label: 'New Task', icon: ListTodo, color: 'bg-[#E98A24]' },
    { id: 'decision' as ActionType, label: 'Log Decision', icon: FileText, color: 'bg-gray-700' },
    { id: 'change' as ActionType, label: 'Change Order', icon: GitBranch, color: 'bg-gray-600' }
  ];

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          {isOpen && (
            <div className="absolute bottom-20 right-0 space-y-3 mb-2 animate-fade-in">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => {
                      setShowModal(action.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 ${action.color} text-white px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                    style={{
                      animation: `slideUp 0.3s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <Icon size={20} />
                    <span className="font-semibold whitespace-nowrap">{action.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 rounded-full bg-[#E98A24] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center ${
              isOpen ? 'rotate-45' : ''
            }`}
          >
            {isOpen ? <X size={28} /> : <Plus size={28} />}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {showModal === 'task' && 'Create New Task'}
                {showModal === 'decision' && 'Log Decision'}
                {showModal === 'change' && 'Submit Change Order'}
              </h3>
              <button
                onClick={() => setShowModal(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4">
              {showModal === 'task' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Task Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                      rows={3}
                      placeholder="Describe the task..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]">
                      <option>Architecture</option>
                      <option>Security</option>
                      <option>Testing</option>
                      <option>DevOps</option>
                      <option>Database</option>
                      <option>Documentation</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Priority
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Due Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                      />
                    </div>
                  </div>
                </>
              )}

              {showModal === 'decision' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Decision Summary
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                      placeholder="Brief summary..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Context & Rationale
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                      rows={4}
                      placeholder="Explain the context and reasoning..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Impact Category
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]">
                        <option>Architecture</option>
                        <option>Security</option>
                        <option>Process</option>
                        <option>Budget</option>
                        <option>Timeline</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Reversal Risk
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {showModal === 'change' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Change Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                      rows={3}
                      placeholder="Describe the proposed change..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Impact Assessment
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                      rows={2}
                      placeholder="What will be affected by this change?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estimated Cost (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                      placeholder="$0"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(null);
                  }}
                  className="px-6 py-2 bg-[#E98A24] text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
