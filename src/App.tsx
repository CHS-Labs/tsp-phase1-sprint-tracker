import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import HeroSection from './components/Layout/HeroSection';
import Dashboard from './components/Dashboard/Dashboard';
import AllTasks from './components/AllTasks/AllTasks';
import MeetingAgendas from './components/MeetingAgendas/MeetingAgendas';
import DecisionsAndLogs from './components/Decisions/DecisionsAndLogs';
import Analytics from './components/Analytics/Analytics';
import ParkingLot from './components/ParkingLot/ParkingLot';
import Settings from './components/Settings/Settings';
import FloatingActionButton from './components/Common/FloatingActionButton';

type View = 'dashboard' | 'all-tasks' | 'agendas' | 'decisions' | 'analytics' | 'parking-lot' | 'settings';

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHero, setShowHero] = useState(true);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'all-tasks':
        return <AllTasks />;
      case 'agendas':
        return <MeetingAgendas />;
      case 'decisions':
        return <DecisionsAndLogs />;
      case 'analytics':
        return <Analytics />;
      case 'parking-lot':
        return <ParkingLot />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
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
    </div>
  );
}

export default App;
