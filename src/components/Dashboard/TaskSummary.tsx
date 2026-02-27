import { CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useMemo } from 'react';

/*
 * Updated TaskSummary
 *
 * This component calculates task statistics and overall progress based on
 * the tasks assigned to the currently logged in user. Instead of
 * referencing dummy data, it uses the DataContext to access the
 * Action Log and AuthContext to determine the user’s email. A helper
 * assigns a synthetic progress value from the task’s status until
 * real progress data is available from the backend.
 */

export default function TaskSummary() {
  const { tasks } = useData();

  const getTaskProgress = (status: string): number => {
    switch (status) {
      case 'Done':
        return 100;
      case 'In Progress':
        return 50;
      case 'Blocked':
        return 10;
      default:
        return 0;
    }
  };

  const myTasks = useMemo(() => {
    // Show ALL tasks since owner column is empty and there's no real authentication
    return tasks.map((task) => {
      const status = task.status || (task as any).status;
      return {
        status,
        progress: getTaskProgress(status),
      };
    });
  }, [tasks]);

  const stats = {
    notStarted: myTasks.filter((t) => t.status === 'Not Started').length,
    inProgress: myTasks.filter((t) => t.status === 'In Progress').length,
    blocked: myTasks.filter((t) => t.status === 'Blocked').length,
    done: myTasks.filter((t) => t.status === 'Done').length,
  };

  const totalProgress =
    myTasks.length > 0
      ? myTasks.reduce((sum, task) => sum + task.progress, 0) / myTasks.length
      : 0;

  const statCards = [
    {
      label: 'Not Started',
      count: stats.notStarted,
      icon: Circle,
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    },
    {
      label: 'In Progress',
      count: stats.inProgress,
      icon: Clock,
      color: 'text-[#1A9CD7]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Blocked',
      count: stats.blocked,
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      label: 'Completed',
      count: stats.done,
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Tasks Overview</h2>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Progress</p>
            <p className="text-2xl font-bold text-[#E98A24]">
              {Math.round(totalProgress)}%
            </p>
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
              <p className="text-sm font-semibold text-gray-700">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}