import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { googleSheetsService } from '../services/googleSheetsService';
import {
  SOWDeliverable,
  ActionLogTask,
  WeeklyMeeting,
  Decision,
  ParkingLotIdea,
  ValidationItem,
  AnalyticsBaseline,
  Risk,
  ChangeOrder,
  TeamMember,
} from '../types';

interface DataContextType {
  // Data
  sowDeliverables: SOWDeliverable[];
  tasks: ActionLogTask[];
  meetings: WeeklyMeeting[];
  decisions: Decision[];
  parkingLot: ParkingLotIdea[];
  validationChecklist: ValidationItem[];
  analytics: AnalyticsBaseline[];
  risks: Risk[];
  changeOrders: ChangeOrder[];
  team: TeamMember[];

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Refresh function
  refreshData: () => Promise<void>;

  // Update functions
  updateTaskStatus: (taskId: string, status: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [sowDeliverables, setSOWDeliverables] = useState<SOWDeliverable[]>([]);
  const [tasks, setTasks] = useState<ActionLogTask[]>([]);
  const [meetings, setMeetings] = useState<WeeklyMeeting[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [parkingLot, setParkingLot] = useState<ParkingLotIdea[]>([]);
  const [validationChecklist, setValidationChecklist] = useState<ValidationItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsBaseline[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [changeOrders, setChangeOrders] = useState<ChangeOrder[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    // Note: Google Sheets API uses API key (read-only), no auth required
    // Google Drive API also uses API key for public/shared folders

    console.log('[DataContext] Starting data fetch...');
    console.log('[DataContext] API Key:', import.meta.env.VITE_GOOGLE_API_KEY ? 'Present' : 'MISSING');
    console.log('[DataContext] Spreadsheet ID:', import.meta.env.VITE_SPREADSHEET_ID ? 'Present' : 'MISSING');

    setIsLoading(true);
    setError(null);

    try {
      const [
        sowData,
        tasksData,
        meetingsData,
        decisionsData,
        parkingData,
        validationData,
        analyticsData,
        risksData,
        changeOrdersData,
        teamData,
      ] = await Promise.all([
        googleSheetsService.getSOWDeliverables(),
        googleSheetsService.getActionLog(),
        googleSheetsService.getMeetingLog(),
        googleSheetsService.getDecisions(),
        googleSheetsService.getParkingLot(),
        googleSheetsService.getValidationChecklist(),
        googleSheetsService.getAnalytics(),
        googleSheetsService.getRiskRegister(),
        googleSheetsService.getChangeOrders(),
        googleSheetsService.getTeam(),
      ]);

      console.log('[DataContext] Data fetched successfully!');
      console.log('[DataContext] Tasks count:', tasksData.length);
      console.log('[DataContext] Team count:', teamData.length);
      console.log('[DataContext] Sample task:', tasksData[0]);

      setSOWDeliverables(sowData);
      setTasks(tasksData);
      setMeetings(meetingsData);
      setDecisions(decisionsData);
      setParkingLot(parkingData);
      setValidationChecklist(validationData);
      setAnalytics(analyticsData);
      setRisks(risksData);
      setChangeOrders(changeOrdersData);
      setTeam(teamData);
    } catch (err) {
      console.error('[DataContext] ERROR fetching data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      // Don't block rendering - set empty arrays so UI can still display
      setSOWDeliverables([]);
      setTasks([]);
      setMeetings([]);
      setDecisions([]);
      setParkingLot([]);
      setValidationChecklist([]);
      setAnalytics([]);
      setRisks([]);
      setChangeOrders([]);
      setTeam([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    await googleSheetsService.updateTaskStatus(taskId, status);
    await refreshData(); // Refresh to get updated data
  };

  useEffect(() => {
    // Load data immediately on mount - no auth required for read-only API key access
    refreshData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        sowDeliverables,
        tasks,
        meetings,
        decisions,
        parkingLot,
        validationChecklist,
        analytics,
        risks,
        changeOrders,
        team,
        isLoading,
        error,
        refreshData,
        updateTaskStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
