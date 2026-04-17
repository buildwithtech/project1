import React, { useState } from 'react';
import { simulateSummarizer } from '../utils/mockApi';
import { FileText, AlertOctagon, Activity, Stethoscope, ClipboardList } from 'lucide-react';

export default function Summarizer() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const response = await simulateSummarizer(data);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <FileText className="text-indigo-500" />
          Clinical Summarizer
        </h2>
        <p className="text-gray-500 mb-6">Generate a concise clinical summary from raw patient records for the attending doctor.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input name="age" type="number" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g., 60" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <input name="blood_group" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g., O+" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Known Allergies</label>
              <input name="allergies" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g., Penicillin" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Raw Medical Records (JSON/Text)</label>
            <textarea name="records" required rows={4} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Paste previous visit notes, lab results, or blockchain record array here..."></textarea>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-70">
            {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : 'Generate Summary'}
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header Snapshot */}
          <div className="bg-indigo-50 p-5 border-b border-indigo-100">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Patient Snapshot</h3>
            <p className="text-indigo-950 font-medium text-lg">{result.patientSnapshot}</p>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Alerts */}
              {result.criticalAlerts.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <AlertOctagon className="w-4 h-4 text-rose-500" /> Critical Alerts
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.criticalAlerts.map((alert: string, i: number) => (
                      <span key={i} className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-md text-sm font-medium">{alert}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditions & Meds */}
              <div>
                <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-500" /> Chronic Conditions
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {result.chronicConditions.map((c: string, i: number) => <li key={i}>{c}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <ClipboardList className="w-4 h-4 text-teal-500" /> Current Medications
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {result.currentMedications.map((m: string, i: number) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {/* Doctor Note */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-2">
                  <Stethoscope className="w-4 h-4" /> Doctor's Note
                </h4>
                <p className="text-sm text-amber-900 font-medium">{result.doctorNote}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wider">Last Visit</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border">{result.lastVisitSummary}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wider">Recommended Tests</h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedTests.map((test: string, i: number) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-sm border">{test}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
