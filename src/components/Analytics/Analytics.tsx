import { TrendingUp, PieChart, BarChart3, Activity, Printer } from 'lucide-react';

export default function Analytics() {
  const weeklyData = [
    { week: 1, completed: 12, open: 28 },
    { week: 2, completed: 18, open: 22 },
    { week: 3, completed: 25, open: 15 },
    { week: 4, completed: 30, open: 10 }
  ];

  const riskDistribution = [
    { level: 'Low', count: 2, color: '#10b981' },
    { level: 'Medium', count: 2, color: '#f59e0b' },
    { level: 'High', count: 1, color: '#ef4444' }
  ];

  const categoryProgress = [
    { category: 'Architecture', progress: 65, color: '#E98A24' },
    { category: 'Security', progress: 55, color: '#1A9CD7' },
    { category: 'Testing', progress: 40, color: '#10b981' },
    { category: 'DevOps', progress: 70, color: '#8b5cf6' },
    { category: 'Database', progress: 85, color: '#f59e0b' },
    { category: 'Documentation', progress: 30, color: '#6D6E71' }
  ];

  return (
    <div className="space-y-6 print-full-width">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center gap-4 no-print">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer size={18} />
            <span className="font-semibold">Print</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Activity size={18} />
            <span>Real-time sprint metrics</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">Sprint Velocity</h3>
            <TrendingUp size={18} className="text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">8.5</div>
          <p className="text-sm text-gray-600">tasks per week</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }} />
            </div>
            <span className="text-xs text-green-600 font-semibold">+15%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">On-Time Delivery</h3>
            <BarChart3 size={18} className="text-[#1A9CD7]" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">87%</div>
          <p className="text-sm text-gray-600">of tasks completed on time</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-[#1A9CD7] h-full rounded-full" style={{ width: '87%' }} />
            </div>
            <span className="text-xs text-[#1A9CD7] font-semibold">+3%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">Team Utilization</h3>
            <PieChart size={18} className="text-[#E98A24]" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">92%</div>
          <p className="text-sm text-gray-600">active capacity</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-[#E98A24] h-full rounded-full" style={{ width: '92%' }} />
            </div>
            <span className="text-xs text-[#E98A24] font-semibold">Optimal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Task Completion</h3>
          <div className="relative h-64">
            <svg className="w-full h-full">
              <g transform="translate(40, 10)">
                {[0, 10, 20, 30, 40].map((value, i) => (
                  <g key={value}>
                    <line
                      x1="0"
                      y1={220 - i * 55}
                      x2="100%"
                      y2={220 - i * 55}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <text
                      x="-10"
                      y={220 - i * 55 + 5}
                      fontSize="12"
                      fill="#6b7280"
                      textAnchor="end"
                    >
                      {value}
                    </text>
                  </g>
                ))}

                {weeklyData.map((data, i) => {
                  const x = 50 + i * 120;
                  const completedHeight = (data.completed / 40) * 220;
                  const openHeight = (data.open / 40) * 220;
                  return (
                    <g key={data.week}>
                      <rect
                        x={x}
                        y={220 - completedHeight}
                        width="40"
                        height={completedHeight}
                        fill="#E98A24"
                        rx="4"
                      />
                      <rect
                        x={x + 50}
                        y={220 - openHeight}
                        width="40"
                        height={openHeight}
                        fill="#d1d5db"
                        rx="4"
                      />
                      <text
                        x={x + 45}
                        y="240"
                        fontSize="12"
                        fill="#6b7280"
                        textAnchor="middle"
                      >
                        Week {data.week}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#E98A24] rounded" />
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-sm text-gray-600">Open</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Risk Distribution</h3>
          <div className="flex items-center justify-center h-64">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {(() => {
                let currentAngle = 0;
                const total = riskDistribution.reduce((sum, item) => sum + item.count, 0);
                return riskDistribution.map((item, i) => {
                  const percentage = (item.count / total) * 100;
                  const angle = (percentage / 100) * 360;
                  const startAngle = currentAngle;
                  const endAngle = currentAngle + angle;
                  currentAngle += angle;

                  const startRad = (startAngle - 90) * (Math.PI / 180);
                  const endRad = (endAngle - 90) * (Math.PI / 180);

                  const x1 = 100 + 80 * Math.cos(startRad);
                  const y1 = 100 + 80 * Math.sin(startRad);
                  const x2 = 100 + 80 * Math.cos(endRad);
                  const y2 = 100 + 80 * Math.sin(endRad);

                  const largeArc = angle > 180 ? 1 : 0;

                  return (
                    <g key={item.level}>
                      <path
                        d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                        stroke="white"
                        strokeWidth="2"
                      />
                    </g>
                  );
                });
              })()}
              <circle cx="100" cy="100" r="50" fill="white" />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill="#1f2937"
              >
                {riskDistribution.reduce((sum, item) => sum + item.count, 0)}
              </text>
              <text
                x="100"
                y="110"
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                Total Risks
              </text>
            </svg>
          </div>
          <div className="space-y-2 mt-4">
            {riskDistribution.map((item) => (
              <div key={item.level} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.level}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Progress by Category</h3>
        <div className="space-y-4">
          {categoryProgress.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">{cat.category}</span>
                <span className="text-sm font-bold" style={{ color: cat.color }}>
                  {cat.progress}%
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${cat.progress}%`,
                    backgroundColor: cat.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
