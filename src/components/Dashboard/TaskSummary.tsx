import { CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react';
import { tasks, currentUser } from '../../data/dummyData';

export default function TaskSummary() {
  const myTasks = tasks.filter(task => task.owner === currentUser);

  const stats = {
    notStarted: myTasks.filter(t => t.status === 'Not Started').length,
    inProgress: myTasks.filter(t => t.status === 'In Progress').length,
    blocked: myTasks.filter(t => t.status === 'Blocked').length,
    done: myTasks.filter(t => t.status === 'Done').length
  };

  const totalProgress = myTasks.reduce((sum, task) => sum + task.progress, 0) / myTasks.length;

  const statCards = [
    {
      label: 'Not Started',
      count: stats.notStarted,
      icon: Circle,
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      label: 'In Progress',
      count: stats.inProgress,
      icon: Clock,
      color: 'text-[#1A9CD7]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Blocked',
      count: stats.blocked,
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      label: 'Completed',
      count: stats.done,
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Tasks Overview</h2>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Progress</p>
            <p className="text-2xl font-bold text-[#E98A24]">{Math.round(totalProgress)}%</p>
          </div>
          <div className="w-16 h-16">
            <svg className="transform -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-gray-200"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-[#E98A24]"
                strokeWidth="3"
                strokeDasharray={`${totalProgress}, 100`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-xl p-6 transition-all hover:shadow-lg hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg bg-white/50`}>
                  <Icon size={24} />
                </div>
                <span className={`text-3xl font-bold ${stat.color}`}>
                  {stat.count}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
