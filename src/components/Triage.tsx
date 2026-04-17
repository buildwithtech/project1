import React, { useState } from 'react';
import { simulateTriage } from '../utils/mockApi';
import { AlertTriangle, HeartPulse, Activity, AlertCircle, Info } from 'lucide-react';

export default function Triage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const response = await simulateTriage(data);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <HeartPulse className="text-rose-500" />
          Medical Triage Assistant
        </h2>
        <p className="text-gray-500 mb-6">Analyze patient symptoms to determine urgency and potential diagnoses.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Age</label>
              <input name="age" type="number" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., 45" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select name="gender" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms (comma separated)</label>
            <input name="symptoms" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., chest pain, breathlessness, fever" />
            <p className="text-xs text-gray-500 mt-1">Note: Chest pain + breathlessness will always trigger an emergency triage.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input name="duration" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., 2 days, 3 hours" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <input name="extra_notes" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Any other observations..." />
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-70">
            {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : 'Analyze Symptoms'}
          </button>
        </form>
      </div>

      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Triage Level Banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-4 ${
            result.triage === 'emergency' ? 'bg-rose-50 border-rose-200 text-rose-800' : 
            result.triage === 'urgent' ? 'bg-amber-50 border-amber-200 text-amber-800' : 
            'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <AlertTriangle className={`w-8 h-8 shrink-0 ${result.triage === 'emergency' ? 'text-rose-600' : result.triage === 'urgent' ? 'text-amber-600' : 'text-emerald-600'}`} />
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider">{result.triage}</h3>
              <p className="mt-1 font-medium">{result.immediateAction}</p>
              <p className="mt-2 text-sm opacity-90">{result.triageReason}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Diagnoses */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-blue-500" />
                Top Diagnoses (Probabilities)
              </h4>
              <div className="space-y-4">
                {result.topDiagnoses.map((diag: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{diag.name}</span>
                      <span className="text-gray-500">{diag.probability}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${diag.probability}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flags & Notes */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  Red Flags to Watch
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {result.redFlags.map((flag: string, idx: number) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              </div>

              {result.ayushmanNote && (
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5" />
                    Ayushman Bharat Note
                  </h4>
                  <p className="text-sm text-blue-700">{result.ayushmanNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
