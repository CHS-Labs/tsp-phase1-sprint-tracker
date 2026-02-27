import TaskSummary from './TaskSummary';
import MyTasksTable from './MyTasksTable';
import TeamWidget from './TeamWidget';
import RecentMeetings from './RecentMeetings';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <TaskSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MyTasksTable />
        </div>
        <div className="space-y-6">
          <RecentMeetings />
          <TeamWidget />
        </div>
      </div>
    </div>
  );
}
