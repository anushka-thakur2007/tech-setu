import React from 'react';
import { X, GraduationCap, Users, TrendingUp, Award, BarChart3, CheckCircle, MapPin, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function PlacementDashboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl p-6 space-y-6 shadow-2xl animate-fadeIn relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-100">College Placement Cell Dashboard</h2>
              <p className="text-xs text-slate-400">MGM's College of CS & IT, Nanded • SRTMUN Skilling Analytics</p>
            </div>
          </div>
          <button 
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Enrolled Students</span>
            <div className="text-2xl font-extrabold text-slate-100">142</div>
            <span className="text-[10px] text-emerald-400 font-bold">B.Sc CS & BCA Batches</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Active Streaks</span>
            <div className="text-2xl font-extrabold text-orange-400">89%</div>
            <span className="text-[10px] text-orange-400 font-bold">Daily Habit Retention</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Micro-Lessons Completed</span>
            <div className="text-2xl font-extrabold text-cyan-400">1,240</div>
            <span className="text-[10px] text-cyan-400 font-bold">5-Min Bites</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Job Readiness Score</span>
            <div className="text-2xl font-extrabold text-emerald-400">84/100</div>
            <span className="text-[10px] text-emerald-400 font-bold">Campus Drive Ready</span>
          </div>
        </div>

        {/* Skill Matrix Breakdown */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Class Skill Track Completion Rates (Nanded Pilot Group)
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">AI Tools & Prompt Engineering</span>
                <span className="text-cyan-400">92% Completion</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Python & Coding Fundamentals</span>
                <span className="text-emerald-400">78% Completion</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Digital Safety & Scam Prevention</span>
                <span className="text-amber-400">95% Completion</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>Faculty Coordinator: MGM College Nanded</span>
          <button
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="px-5 py-2 btn-duo-accent text-white font-extrabold text-xs rounded-xl cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
