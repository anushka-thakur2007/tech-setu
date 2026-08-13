import React, { useState } from 'react';
import { Flame, Zap, Award, Globe, Volume2, VolumeX, RotateCcw, Sparkles, BookOpen, GraduationCap, FileCheck } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function Header({ userState, setUserState, activeTab, setActiveTab, onOpenBadges, onOpenCertificate, onOpenPlacement }) {
  const [muted, setMuted] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);

  const toggleSound = () => {
    soundFX.muted = !muted;
    setMuted(!muted);
    if (muted) soundFX.playClick();
  };

  const toggleLanguage = () => {
    soundFX.playClick();
    const langs = ['hinglish', 'english', 'marathi'];
    const nextIdx = (langs.indexOf(userState.language) + 1) % langs.length;
    setUserState(prev => ({ ...prev, language: langs[nextIdx] }));
  };

  const handleResetProgress = () => {
    if (window.confirm("Reset all lesson progress and streaks back to initial state?")) {
      soundFX.playClick();
      localStorage.removeItem('techsetu_user_state');
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('courses')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  TechSetu
                </span>
                <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Nanded EdTech
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Duolingo for Mass Tech Skilling
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 ml-4 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { soundFX.playClick(); setActiveTab('courses'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'courses' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Learning Path
            </button>
            <button
              onClick={() => { soundFX.playClick(); setActiveTab('playground'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'playground' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Code & AI Sandbox
            </button>
          </nav>
        </div>

        {/* Gamification Status Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Placement Cell Dashboard View */}
          <button
            onClick={() => { soundFX.playClick(); onOpenPlacement(); }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer text-xs font-bold"
            title="College Placement Cell Analytics"
          >
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline">Placement Hub</span>
          </button>

          {/* Skill Certificate View */}
          <button
            onClick={() => { soundFX.playClick(); onOpenCertificate(); }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer text-xs font-bold"
            title="View Verifiable Skill Certificate"
          >
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Certificate</span>
          </button>

          {/* Daily Streak */}
          <button 
            onClick={() => { soundFX.playClick(); setShowStreakModal(!showStreakModal); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-all cursor-pointer relative"
            title="Daily Learning Streak"
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse-subtle" />
            <span className="font-extrabold text-sm">{userState.streak}</span>
            <span className="text-[10px] font-bold uppercase hidden sm:inline">Days</span>
          </button>

          {/* XP & Level */}
          <button 
            onClick={() => { soundFX.playClick(); onOpenBadges(); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
            title="Total XP Points & Level"
          >
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-extrabold text-sm">{userState.xp}</span>
            <span className="text-[10px] font-semibold text-amber-400/70 hidden sm:inline">XP</span>
          </button>

          {/* Badges Drawer Button */}
          <button
            onClick={() => { soundFX.playClick(); onOpenBadges(); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all cursor-pointer"
            title="Unlocked Badges"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-xs hidden sm:inline">Lvl {userState.level}</span>
          </button>

          {/* Quick Utility Toggles */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-1.5">
            <button
              onClick={toggleLanguage}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors relative"
              title="Toggle Language (Hinglish / English / Marathi)"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="absolute -bottom-1 right-0 text-[8px] font-extrabold text-cyan-300 uppercase">
                {userState.language === 'marathi' ? 'मरा' : userState.language.slice(0, 2)}
              </span>
            </button>

            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              title={muted ? "Unmute Audio Feedback" : "Mute Audio Feedback"}
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={handleResetProgress}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Reset Demo Progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Streak Info Popup Modal */}
      {showStreakModal && (
        <div className="absolute right-4 top-16 z-50 w-72 bg-slate-900 border border-orange-500/30 rounded-2xl p-4 shadow-2xl glow-amber">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
              <Flame className="w-5 h-5 fill-orange-500" />
              <span>{userState.streak} Day Learning Streak!</span>
            </div>
            <button onClick={() => setShowStreakModal(false)} className="text-slate-400 hover:text-slate-100 text-xs">✕</button>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Complete at least 1 bite-sized lesson every day to build an unbroken technology learning streak!
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs mb-3">
            <span className="text-slate-400">Daily Goal:</span>
            <span className="font-bold text-emerald-400">
              {userState.dailyGoal.completed} / {userState.dailyGoal.target} Lessons Done Today
            </span>
          </div>
          <button 
            onClick={() => { setShowStreakModal(false); setActiveTab('courses'); }}
            className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:opacity-90 transition-opacity"
          >
            Keep Streak Alive (+50 XP)
          </button>
        </div>
      )}
    </header>
  );
}
