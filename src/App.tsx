import React, { useState } from 'react';
import Triage from './components/Triage';
import Summarizer from './components/Summarizer';
import Pharmacy from './components/Pharmacy';
import { Stethoscope, FileText, Pill, Menu, X } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'triage' | 'summarizer' | 'pharmacy'>('triage');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'triage', label: 'Triage Assistant', icon: Stethoscope },
    { id: 'summarizer', label: 'Clinical Summarizer', icon: FileText },
    { id: 'pharmacy', label: 'Pharmacy Assistant', icon: Pill },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-700">
          <Stethoscope className="w-6 h-6" />
          MediBridge AI
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
        fixed md:sticky top-0 md:top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-10
      `}>
        <div className="p-6 hidden md:flex items-center gap-2 font-bold text-2xl text-blue-700 border-b border-gray-100">
          <Stethoscope className="w-8 h-8" />
          MediBridge AI
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">Modules</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium text-sm ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-800 font-medium">
              Built for Rural Health Workers.
              <br/>Data is simulated for demo.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'triage' && <Triage />}
          {activeTab === 'summarizer' && <Summarizer />}
          {activeTab === 'pharmacy' && <Pharmacy />}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
