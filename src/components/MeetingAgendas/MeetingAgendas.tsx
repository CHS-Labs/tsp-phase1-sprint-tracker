import { useState } from 'react';
import { Calendar, FileText, CheckSquare, MessageSquare, ExternalLink, Printer, X } from 'lucide-react';
import { meetingAgendas, MeetingAgenda } from '../../data/dummyData';

export default function MeetingAgendas() {
  const [selectedAgenda, setSelectedAgenda] = useState<MeetingAgenda | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Meeting Agendas</h2>
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gray-500" />
          <span className="text-sm text-gray-600">{meetingAgendas.length} meetings</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />

        <div className="space-y-8">
          {meetingAgendas.map((agenda, index) => (
            <div key={agenda.id} className="relative pl-20 group">
              <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-[#E98A24] flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                W{agenda.weekNumber}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-[#E98A24]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{agenda.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(agenda.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <CheckSquare size={16} className="text-[#1A9CD7]" />
                      <span className="text-gray-600">{agenda.actionItems} actions</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MessageSquare size={16} className="text-[#E98A24]" />
                      <span className="text-gray-600">{agenda.decisionsCount} decisions</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {agenda.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E98A24] mt-2" />
                      <p className="text-sm text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedAgenda(agenda)}
                    className="px-4 py-2 bg-[#E98A24] text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold"
                  >
                    <FileText size={16} className="inline mr-2" />
                    View Full Agenda
                  </button>
                  <a
                    href={agenda.fathomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
                  >
                    <ExternalLink size={16} className="inline mr-2" />
                    Fathom Transcript
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAgenda && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedAgenda.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(selectedAgenda.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 text-gray-600 hover:text-[#E98A24] transition-colors"
                  title="Print"
                >
                  <Printer size={20} />
                </button>
                <button
                  onClick={() => setSelectedAgenda(null)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                  {selectedAgenda.fullAgenda}
                </pre>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Personal Notes</h4>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24] text-sm"
                  rows={4}
                  placeholder="Add your notes about this meeting..."
                />
                <button className="mt-3 px-4 py-2 bg-[#E98A24] text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold">
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
