import { TrendingUp, PieChart, BarChart3, Activity } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Activity size={18} />
          <span>Real-time sprint metrics</span>
        </div>
      </div>

      {/* Coming Soon - Will show real data from meetings and tasks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <TrendingUp size={64} className="text-[#E98A24]" />
            <BarChart3 size={64} className="text-[#1A9CD7]" />
            <PieChart size={64} className="text-gray-400" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Analytics Coming Soon</h3>

          <p className="text-gray-600 mb-6">
            Sprint analytics will automatically populate as you process meetings and complete tasks.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 text-left">
            <h4 className="font-bold text-gray-900 mb-3">Planned Metrics:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Sprint Velocity:</strong> Tasks completed per week based on status changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>On-Time Delivery:</strong> Percentage of tasks completed by due date</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Progress by Category:</strong> Completion rates across SOW categories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Risk Distribution:</strong> Tracked risks by severity level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Decision Impact:</strong> Tasks spawned from meeting decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Meeting Cadence:</strong> Frequency and outcomes of sprint reviews</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 mt-6 italic">
            Data will be calculated from your Google Sheets Action Log and Meeting Discussion Notes
          </p>
        </div>
      </div>
    </div>
  );
}
