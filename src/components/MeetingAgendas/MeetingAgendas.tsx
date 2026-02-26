import { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Printer, X, FileText } from 'lucide-react';
import { googleDriveService, DriveFile } from '../../services/googleDriveService';

const MEETING_FOLDER_ID = import.meta.env.VITE_MEETING_FOLDER_ID;

export default function MeetingAgendas() {
  const [agendas, setAgendas] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAgendas();
  }, []);

  const loadAgendas = async () => {
    try {
      setIsLoading(true);
      const files = await googleDriveService.listFilesInFolder(MEETING_FOLDER_ID);
      setAgendas(files);
    } catch (err) {
      console.error('Error loading agendas:', err);
      setError('Failed to load meeting agendas');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#E98A24] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading meeting agendas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800">{error}</p>
        <button
          onClick={loadAgendas}
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
        <h2 className="text-2xl font-bold text-gray-900">Meeting Agendas</h2>
        <div className="flex items-center gap-4 no-print">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer size={18} />
            <span className="font-semibold">Print</span>
          </button>
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-500" />
            <span className="text-sm text-gray-600">{agendas.length} meetings</span>
          </div>
        </div>
      </div>

      {agendas.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No meeting agendas found.</p>
          <p className="text-sm text-gray-500 mt-2">
            Add agendas to your Google Drive folder to see them here.
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E98A24] via-[#1A9CD7] to-gray-300" />

          <div className="space-y-8">
            {agendas.map((agenda, index) => {
              const date = new Date(agenda.createdTime);
              return (
                <div key={agenda.id} className="relative pl-20 group">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).split(' ').map(s => s.substring(0, 3)).join('\n')}
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-[#E98A24]">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{agenda.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar size={14} className="text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {date.toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={agenda.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold"
                      >
                        <FileText size={16} className="inline mr-2" />
                        Open Agenda
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
