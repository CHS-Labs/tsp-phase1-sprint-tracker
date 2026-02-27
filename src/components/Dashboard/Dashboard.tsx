import TaskSummary from './TaskSummary';
import RecentMeetings from './RecentMeetings';
import MyTasksTable from './MyTasksTable';
import TeamWidget from './TeamWidget';

interface DashboardProps {
  onNavigateToMeetingFlow: () => void;
  onViewTask?: (taskId: string) => void;
}

export default function Dashboard({ onNavigateToMeetingFlow, onViewTask: _onViewTask }: DashboardProps) {
  return (
    <div className="space-y-8">
      <TaskSummary />

      <RecentMeetings onNavigateToMeetingFlow={onNavigateToMeetingFlow} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MyTasksTable />
        </div>
        <div>
          <TeamWidget />
        </div>
      </div>
    </div>
  );
}
