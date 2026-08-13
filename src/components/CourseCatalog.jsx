import React, { useState } from 'react';
import { COURSES } from '../data/courses';
import { Sparkles, Code, Layout, ShieldCheck, Play, CheckCircle2, Lock, Zap, Clock, Star, BookOpen, GraduationCap, MapPin } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function CourseCatalog({ userState, onStartLesson, setActiveTab }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Tracks", icon: BookOpen },
    { id: "ai-prompting", label: "AI & Prompting", icon: Sparkles },
    { id: "python-coding", label: "Python Coding", icon: Code },
    { id: "web-dev", label: "Web Dev", icon: Layout },
    { id: "digital-literacy", label: "Digital Safety", icon: ShieldCheck },
  ];

  const filteredCourses = selectedCategory === "all"
    ? COURSES
    : COURSES.filter(c => c.id === selectedCategory);

  const iconMap = {
    Sparkles,
    Code,
    Layout,
    ShieldCheck
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* SRTMUN Hackathon & Nanded Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 glow-emerald">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Nanded Tech Initiative
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              SRTMUN Hackathon 2026-27 Proposal
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Bite-Sized Tech Skilling for <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Tier-2 & Tier-3</span> Learners
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            No 2-hour boring video lectures! Master practical AI tools, Python coding, and digital safety in 
            <strong className="text-emerald-400"> 5-minute interactive micro-lessons </strong> with instant feedback and live code runners.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <div className="text-xl font-extrabold text-emerald-400">5 Mins</div>
              <div className="text-[11px] text-slate-400">Micro-Lessons</div>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <div className="text-xl font-extrabold text-cyan-400">Zero Prior</div>
              <div className="text-[11px] text-slate-400">Exposure Needed</div>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <div className="text-xl font-extrabold text-amber-400">Live Code</div>
              <div className="text-[11px] text-slate-400">Interactive Sandbox</div>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <div className="text-xl font-extrabold text-purple-400">Hinglish</div>
              <div className="text-[11px] text-slate-400">Localized Guidance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { soundFX.playClick(); setSelectedCategory(cat.id); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Learning Path Catalog Grid */}
      <div className="space-y-10">
        {filteredCourses.map((course) => {
          const IconComp = iconMap[course.icon] || BookOpen;

          return (
            <div key={course.id} className="space-y-4">
              {/* Track Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${course.color} flex items-center justify-center text-slate-950 shadow-lg`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-extrabold text-slate-100">{course.title}</h2>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300">
                        {course.modules.length} Modules
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{course.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => { soundFX.playClick(); setActiveTab('playground'); }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-cyan-300 font-bold text-xs border border-slate-700/60 flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Open Live Sandbox
                </button>
              </div>

              {/* Module Path Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {course.modules.map((mod, idx) => {
                  const isCompleted = userState.completedModules.includes(mod.id);

                  return (
                    <div
                      key={mod.id}
                      className={`relative p-5 rounded-2xl border transition-all space-y-3 ${
                        isCompleted
                          ? 'bg-slate-900/60 border-emerald-500/30'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Module {idx + 1}
                          </span>
                          <h3 className="text-base font-bold text-slate-100 leading-snug">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {mod.desc}
                          </p>
                        </div>

                        {isCompleted && (
                          <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                      </div>

                      {/* Module Footer Info */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                        <div className="flex items-center gap-3 text-slate-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            {mod.duration}
                          </span>
                          <span className="flex items-center gap-1 text-amber-400 font-bold">
                            <Zap className="w-3.5 h-3.5 fill-amber-400" />
                            +{mod.xp} XP
                          </span>
                        </div>

                        <button
                          onClick={() => { soundFX.playClick(); onStartLesson(mod, course); }}
                          className={`px-4 py-2 rounded-xl font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                            isCompleted
                              ? 'bg-slate-800 text-emerald-300 hover:bg-slate-700 border border-slate-700'
                              : 'btn-duo-primary text-slate-950'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isCompleted ? 'Review' : 'Start 5-Min Lesson'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
