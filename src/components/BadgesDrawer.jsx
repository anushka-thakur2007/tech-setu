import React from 'react';
import { X, Award, Zap, Flame, Shield, CheckCircle, Lock, Trophy, Star, GraduationCap } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function BadgesDrawer({ userState, isOpen, onClose }) {
  if (!isOpen) return null;

  const badgesList = [
    { name: "AI Starter", desc: "Completed 1st AI Micro-Lesson", icon: "🤖", reqXP: 50 },
    { name: "Prompt Architect", desc: "Mastered the CRO Prompt Formula", icon: "🏛️", reqXP: 100 },
    { name: "Python Starter", desc: "Executed your first Python script", icon: "🐍", reqXP: 150 },
    { name: "Logic Master", desc: "Mastered If-Else conditional logic", icon: "🧙‍♂️", reqXP: 200 },
    { name: "Web Builder", desc: "Built your first HTML web component", icon: "🌐", reqXP: 250 },
    { name: "Cyber Shield", desc: "Mastered scam & phishing detection", icon: "🛡️", reqXP: 300 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-6 shadow-2xl animate-fadeIn relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-extrabold text-slate-100">Student Achievement Hall</h2>
          </div>
          <button 
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Progression Progress Bar */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-400">Level {userState.level}: {userState.levelTitle}</span>
            <span className="text-amber-400">{userState.xp} / 300 XP</span>
          </div>
          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.round((userState.xp / 300) * 100))}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Earn +50 XP per completed 5-minute micro-lesson to unlock higher tech levels!
          </p>
        </div>

        {/* Badges Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Unlocked & Upcoming Badges ({userState.unlockedBadges.length} / {badgesList.length})
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {badgesList.map((b, i) => {
              const isUnlocked = userState.unlockedBadges.includes(b.name) || userState.xp >= b.reqXP;

              return (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-slate-950 border-emerald-500/40 glow-emerald'
                      : 'bg-slate-950/40 border-slate-800 opacity-50'
                  }`}
                >
                  <div className="text-2xl">{b.icon}</div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-slate-100">{b.name}</span>
                      {isUnlocked ? (
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Lock className="w-3 h-3 text-slate-600" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">{b.desc}</p>
                    <span className="text-[9px] font-bold text-amber-400 block pt-1">{b.reqXP} XP Required</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nanded College Placement Cell Note */}
        <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-cyan-400 shrink-0" />
          <p className="text-xs text-cyan-200 leading-relaxed">
            <strong>Placement Cell Integration:</strong> Student badges and streak scores can be verified by MGM College Training & Placement Cell to highlight consistent learners during campus recruitment drives.
          </p>
        </div>
      </div>
    </div>
  );
}
