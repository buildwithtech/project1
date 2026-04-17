import React, { useState } from 'react';
import { simulatePharmacy } from '../utils/mockApi';
import { Pill, IndianRupee, ShieldCheck, ThermometerSnowflake, AlertCircle } from 'lucide-react';

export default function Pharmacy() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const response = await simulatePharmacy(data);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Pill className="text-teal-500" />
          Pharmacy Assistant
        </h2>
        <p className="text-gray-500 mb-6">Extract medicines from prescriptions and suggest affordable Jan Aushadhi generic alternatives.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prescription Details</label>
            <textarea name="prescription" required rows={4} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none" placeholder="Type or paste prescription text here..."></textarea>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-70">
            {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : 'Analyze Prescription'}
          </button>
        </form>
      </div>

      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Cost Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <IndianRupee className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Estimated Market Cost</p>
                <p className="text-2xl font-bold text-gray-800">₹{result.totalEstimatedCost}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-xl border border-teal-200 flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-teal-700 font-medium">Jan Aushadhi Savings</p>
                <p className="text-2xl font-bold text-teal-700">Save ~₹{result.janAushadhiSavings}</p>
              </div>
            </div>
          </div>

          {/* Warnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.urgentMedicines.length > 0 && (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-800">Urgent Medicines (Need Today)</h4>
                  <p className="text-sm text-amber-700 mt-1">{result.urgentMedicines.join(', ')}</p>
                </div>
              </div>
            )}
            {result.storageNote && (
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex items-start gap-3">
                <ThermometerSnowflake className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-blue-800">Storage Instructions</h4>
                  <p className="text-sm text-blue-700 mt-1">{result.storageNote}</p>
                </div>
              </div>
            )}
          </div>

          {/* Medicines List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-800">Prescribed Medicines & Alternatives</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {result.medicines.map((med: any, idx: number) => (
                <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-gray-900">{med.brandName}</h4>
                        {med.janAushadhiAvailable && (
                          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded-full font-medium border border-teal-200">
                            Jan Aushadhi Available
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Generic: <span className="font-medium text-gray-700">{med.genericName}</span></p>
                      
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="bg-gray-100 px-2 py-1 rounded text-gray-700"><strong>Dose:</strong> {med.dosage}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-gray-700"><strong>Duration:</strong> {med.duration}</span>
                      </div>
                    </div>
                    
                    <div className="md:text-right bg-teal-50 p-3 rounded-lg border border-teal-100 min-w-[200px]">
                      <p className="text-xs text-teal-800 font-semibold uppercase mb-1">Suggested Alternative</p>
                      <p className="font-medium text-teal-900">{med.genericAlternative}</p>
                      <p className="text-sm text-teal-700 mt-1">Est. Cost: ₹{med.estimatedCost}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
