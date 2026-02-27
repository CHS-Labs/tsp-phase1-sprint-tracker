import TaskSummary from './TaskSummary';
import MyTasksTable from './MyTasksTable';
import TeamWidget from './TeamWidget';
import RecentMeetings from './RecentMeetings';

interface DashboardProps {
  onNavigateToMeetingFlow?: () => void;
  onViewTask?: (taskId: string) => void;
}

export default function Dashboard({ onNavigateToMeetingFlow, onViewTask: _onViewTask }: DashboardProps) {
  return (
    <div className="space-y-8">
      <TaskSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MyTasksTable />
        </div>
        <div className="space-y-6">
          <RecentMeetings onNavigateToMeetingFlow={onNavigateToMeetingFlow} />
          <TeamWidget />
        </div>
      </div>
    </div>
  );
}
