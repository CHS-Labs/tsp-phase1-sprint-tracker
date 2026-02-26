import { useState, useEffect } from 'react';
import { MessageSquare, ExternalLink, Printer, FileText, Calendar, User } from 'lucide-react';
import { googleDriveService, DriveFile } from '../../services/googleDriveService';

const USER_FEEDBACK_FOLDER_ID = import.meta.env.VITE_USER_FEEDBACK_FOLDER_ID;

export default function UserFeedback() {
  const [reports, setReports] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const files = await googleDriveService.listFilesInFolder(USER_FEEDBACK_FOLDER_ID);
      setReports(files);
    } catch (err) {
      console.error('Error loading user feedback:', err);
      setError('Failed to load user feedback reports');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#E98A24] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading user feedback...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800">{error}</p>
        <button
          onClick={loadReports}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Feedback Reports</h2>
          <p className="text-sm text-gray-600 mt-1">User session feedback and insights</p>
        </div>
        <div className="flex items-center gap-4 no-print">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer size={18} />
            <span className="font-semibold">Print</span>
          </button>
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-gray-500" />
            <span className="text-sm text-gray-600">{reports.length} reports</span>
          </div>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No user feedback reports yet.</p>
          <p className="text-sm text-gray-500 mt-2">
            User session reports will appear here when available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const date = new Date(report.createdTime);
            return (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-[#E98A24] group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                      {report.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>
                        {date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-white" />
                  </div>
                </div>

                <a
                  href={report.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <FileText size={16} />
                  Open Report
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
