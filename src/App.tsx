import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import HeroSection from './components/Layout/HeroSection';
import Dashboard from './components/Dashboard/Dashboard';
import AllTasks from './components/AllTasks/AllTasks';
import MeetingFlow from './components/MeetingFlow/MeetingFlow';
import MeetingAgendas from './components/MeetingAgendas/MeetingAgendas';
import MeetingSummaries from './components/MeetingSummaries/MeetingSummaries';
import DecisionsAndLogs from './components/Decisions/DecisionsAndLogs';
import Analytics from './components/Analytics/Analytics';
import ParkingLot from './components/ParkingLot/ParkingLot';
import UserFeedback from './components/UserFeedback/UserFeedback';
import Settings from './components/Settings/Settings';
import FloatingActionButton from './components/Common/FloatingActionButton';
import TaskDetailModal from './components/Common/TaskDetailModal';
import { useData } from './contexts/DataContext';
import { ActionLogTask } from './types';

type View = 'dashboard' | 'all-tasks' | 'meeting-flow' | 'agendas' | 'meeting-summaries' | 'decisions' | 'analytics' | 'parking-lot' | 'user-feedback' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showHero, setShowHero] = useState(true);
  const [selectedTask, setSelectedTask] = useState<ActionLogTask | null>(null);
  const { tasks } = useData();

  const handleSearch = (_query: string) => {
    // Search functionality to be implemented
  };

  const handleViewTask = (taskId: string) => {
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  const handleViewDecision = (_decisionId: string) => {
    setCurrentView('decisions');
  };

  const handleViewMeeting = (_meetingId: string) => {
    setCurrentView('meeting-flow');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard
          onNavigateToMeetingFlow={() => setCurrentView('meeting-flow')}
          onViewTask={handleViewTask}
        />;
      case 'all-tasks':
        return <AllTasks onViewTask={handleViewTask} />;
      case 'meeting-flow':
        return <MeetingFlow
          onViewDecision={handleViewDecision}
          onViewTask={handleViewTask}
        />;
      case 'agendas':
        return <MeetingAgendas />;
      case 'meeting-summaries':
        return <MeetingSummaries />;
      case 'decisions':
        return <DecisionsAndLogs />;
      case 'analytics':
        return <Analytics />;
      case 'parking-lot':
        return <ParkingLot />;
      case 'user-feedback':
        return <UserFeedback />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard
          onNavigateToMeetingFlow={() => setCurrentView('meeting-flow')}
          onViewTask={handleViewTask}
        />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 flex flex-col">
        <Header onSearch={handleSearch} />

        <main className="flex-1">
          {showHero && currentView === 'dashboard' && (
            <div className="relative">
              <HeroSection />
              <button
                onClick={() => setShowHero(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white text-sm bg-black/30 px-3 py-1 rounded transition-colors"
              >
                Hide Banner
              </button>
            </div>
          )}

          <div className="p-8">
            {renderView()}
          </div>
        </main>
      </div>

      <FloatingActionButton />

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onViewDecision={handleViewDecision}
          onViewMeeting={handleViewMeeting}
        />
      )}
    </div>
  );
}

export default App;
