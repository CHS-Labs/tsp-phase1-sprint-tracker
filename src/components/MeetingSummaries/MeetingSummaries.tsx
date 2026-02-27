import { Calendar, FileText, Video } from 'lucide-react';

export default function MeetingSummaries() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Meeting Summaries</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={18} />
          <span>0 meetings</span>
        </div>
      </div>

      {/* Empty State - Explains what will appear here */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Video size={64} className="text-[#E98A24]" />
            <FileText size={64} className="text-[#1A9CD7]" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Meeting Summaries Yet</h3>

          <p className="text-gray-600 mb-6">
            After your meetings, the meeting processor will create detailed summaries and save them
            to your Google Drive Meeting Summaries folder.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 text-left">
            <h4 className="font-bold text-gray-900 mb-3">What You'll See Here:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Timeline View:</strong> Chronological list of all processed meetings with dates and status</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Meeting Sections:</strong> Six-section breakdown (Opening, SOW Review, Action Log, Decisions, Parking Lot, Risks)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Discussion Summaries:</strong> AI-extracted key points from each section</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Linked Decisions & Tasks:</strong> Direct links to related items in your Action Log and Decision Log</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Fathom Transcript Links:</strong> Quick access to original Fathom recordings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E98A24] mt-1">•</span>
                <span><strong>Google Doc Summaries:</strong> Formatted documents automatically saved to your Drive folder</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Next Steps:</strong> After your next meeting, run the{' '}
              <code className="bg-blue-100 px-2 py-1 rounded">/meeting-processor</code> command
              to extract decisions, tasks, and discussion notes. Meeting summaries will appear here
              automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
