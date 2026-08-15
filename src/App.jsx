import React, { useState, useEffect } from 'react';
import NameGate from "./components/NameGate";
import Header from './components/Header';
import CourseCatalog from './components/CourseCatalog';
import PlaygroundView from './components/PlaygroundView';
import LessonPlayer from './components/LessonPlayer';
import BadgesDrawer from './components/BadgesDrawer';
import CertificateModal from './components/CertificateModal';
import PlacementDashboardModal from './components/PlacementDashboardModal';
import { INITIAL_USER_STATE } from './data/courses';
import { soundFX } from './utils/audio';
import { Sparkles, Heart, ShieldCheck, MapPin } from 'lucide-react';

export default function App() {
  // Load state from localStorage or initial defaults
  const [userState, setUserState] = useState(() => {
    const saved = localStorage.getItem('techsetu_user_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER_STATE;
      }
    }
    return INITIAL_USER_STATE;
  });

  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'playground'
  const [activeModule, setActiveModule] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isPlacementOpen, setIsPlacementOpen] = useState(false);

  // Save userState changes to localStorage
  useEffect(() => {
    localStorage.setItem('techsetu_user_state', JSON.stringify(userState));
  }, [userState]);

  // Handle module completion with real calendar streak calculation
  const handleCompleteModule = (moduleId, xpAward, badgeUnlocked) => {
    setUserState(prev => {
      const alreadyCompleted = prev.completedModules.includes(moduleId);
      const newXP = alreadyCompleted ? prev.xp : prev.xp + xpAward;
      const newCompleted = alreadyCompleted ? prev.completedModules : [...prev.completedModules, moduleId];
      const newBadges = (badgeUnlocked && !prev.unlockedBadges.includes(badgeUnlocked))
        ? [...prev.unlockedBadges, badgeUnlocked]
        : prev.unlockedBadges;

      const todayStr = new Date().toISOString().split('T')[0];
      let newStreak = prev.streak;

      if (!alreadyCompleted) {
        if (!prev.lastCompletedDate) {
          // First lesson ever completed
          newStreak = 1;
        } else if (prev.lastCompletedDate === todayStr) {
          // Already completed a lesson today, keep streak active
          newStreak = prev.streak === 0 ? 1 : prev.streak;
        } else {
          // Check if last completion was yesterday
          const lastDate = new Date(prev.lastCompletedDate);
          const todayDate = new Date(todayStr);
          const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            newStreak = prev.streak + 1; // Consecutive day streak!
          } else {
            newStreak = 1; // Missed days, reset streak to 1
          }
        }
      }

      const newDailyCompleted = Math.min(prev.dailyGoal.target, prev.dailyGoal.completed + 1);

      let newLevel = prev.level;
      let newLevelTitle = prev.levelTitle;
      if (newXP >= 250) {
        newLevel = 4;
        newLevelTitle = "Tech Virtuoso";
      } else if (newXP >= 180) {
        newLevel = 3;
        newLevelTitle = "Byte Ninja";
      } else if (newXP >= 100) {
        newLevel = 2;
        newLevelTitle = "Byte Explorer";
      }

      return {
        ...prev,
        xp: newXP,
        streak: newStreak,
        lastCompletedDate: todayStr,
        completedModules: newCompleted,
        unlockedBadges: newBadges,
        dailyGoal: { ...prev.dailyGoal, completed: newDailyCompleted },
        level: newLevel,
        levelTitle: newLevelTitle
      };
    });

    setActiveModule(null);
    setActiveCourse(null);
    soundFX.playFanfare();
  };

  const handleStartLesson = (module, course) => {
    setActiveModule(module);
    setActiveCourse(course);
  };

  return (
    <NameGate>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/30">
      <div style={{ padding: "12px 20px", color: "#10b981", fontWeight: "600" }}>
  Hi, {localStorage.getItem("techsetu_name")} 👋
</div>
      {/* Top Navigation & Gamification Header */}
      <Header
        userState={userState}
        setUserState={setUserState}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenPlacement={() => setIsPlacementOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'courses' && (
          <CourseCatalog
            userState={userState}
            onStartLesson={handleStartLesson}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'playground' && (
          <PlaygroundView />
        )}
      </main>

      {/* Interactive Duolingo 5-Screen Lesson Player Overlay */}
      {activeModule && (
        <LessonPlayer
          moduleData={activeModule}
          courseData={activeCourse}
          userState={userState}
          onCompleteModule={handleCompleteModule}
          onClose={() => { setActiveModule(null); setActiveCourse(null); }}
        />
      )}

      {/* Achievements & Badges Modal Drawer */}
      <BadgesDrawer
        userState={userState}
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
      />

      {/* Verifiable Skill Certificate Modal */}
      <CertificateModal
        userState={userState}
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />

      {/* Placement Cell Coordinator Dashboard */}
      <PlacementDashboardModal
        isOpen={isPlacementOpen}
        onClose={() => setIsPlacementOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xs">
              ⚡
            </div>
            <span className="font-extrabold text-slate-200">TechSetu</span>
            <span className="text-slate-500">•  Hackathon 2026-27 </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              MGM College of CS & IT, Nanded
            </span>
            <span>•</span>
            <span>Designed for Tier-2/3 Mass Tech Skilling</span>
          </div>
        </div>
      </footer>
    </div>
    </NameGate>
  );
}
