import React, { useState } from 'react';
import { X, Award, CheckCircle, Printer, Download, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function CertificateModal({ userState, isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundFX.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 space-y-6 shadow-2xl animate-fadeIn relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-extrabold text-slate-100">Official TechSetu Skill Certificate</h2>
          </div>
          <button 
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Card Content */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/40 p-8 rounded-3xl space-y-6 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative Corner Accents */}
          <div className="absolute top-2 left-2 text-amber-500/30 text-2xl font-serif">❖</div>
          <div className="absolute top-2 right-2 text-amber-500/30 text-2xl font-serif">❖</div>
          <div className="absolute bottom-2 left-2 text-amber-500/30 text-2xl font-serif">❖</div>
          <div className="absolute bottom-2 right-2 text-amber-500/30 text-2xl font-serif">❖</div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              SRTMUN Hackathon 2026-27 | Mass Skilling Platform
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 font-serif">
              Certificate of Skill Mastery
            </h1>
            <p className="text-xs text-slate-400">Issued by TechSetu Skilling Platform & Partner Colleges</p>
          </div>

          <div className="space-y-2 py-2">
            <p className="text-xs text-slate-400 uppercase tracking-wider">This is proudly presented to</p>
            <h2 className="text-2xl font-extrabold text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">
              Anu (Nanded Tech Learner)
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed pt-2">
              For successfully completing structured bite-sized micro-learning modules in 
              <strong className="text-cyan-300"> AI Tools, Python Coding, and Digital Literacy</strong> 
              with an outstanding achievement score of <strong className="text-amber-400">{userState.xp} XP</strong> and 
              an active <strong className="text-orange-400">{userState.streak}-Day Learning Streak</strong>.
            </p>
          </div>

          {/* Verification Badges Grid */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-b border-slate-800 py-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Level {userState.level}: {userState.levelTitle}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>MGM College CS & IT, Nanded</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>{userState.unlockedBadges.length} Badges Verified</span>
            </div>
          </div>

          {/* Signatures & Issue Date */}
          <div className="flex items-center justify-between text-left text-xs pt-4">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Issue Date</span>
              <span className="font-mono text-slate-300">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="text-center">
              <div className="w-24 h-0.5 bg-slate-700 mx-auto mb-1"></div>
              <span className="text-[10px] text-slate-400 block font-semibold">TechSetu Verification</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block uppercase">Certificate ID</span>
              <span className="font-mono text-cyan-400 font-bold">TS-2026-NND-8492</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
          <button
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="px-5 py-2.5 btn-duo-primary text-slate-950 font-extrabold text-xs rounded-xl cursor-pointer"
          >
            Back to Learning
          </button>
        </div>
      </div>
    </div>
  );
}
