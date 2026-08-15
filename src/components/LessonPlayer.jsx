import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Lightbulb, Play, RotateCcw, Award, Zap, Sparkles, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

export default function LessonPlayer({ moduleData, courseData, userState, onCompleteModule, onClose }) {
  const [screenIndex, setScreenIndex] = useState(0);
  const screens = moduleData.screens || [];
  const currentScreen = screens[screenIndex];
  
  // Interactive Quiz States
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Match Pairs State
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState({});

  // Fill Blanks State
  const [filledSequence, setFilledSequence] = useState([]);

  // Sandbox State
  const [sandboxInput, setSandboxInput] = useState(currentScreen?.initialPrompt || currentScreen?.initialCode || "");
  const [sandboxOutput, setSandboxOutput] = useState("");
  const [isRunningSandbox, setIsRunningSandbox] = useState(false);

  const progressPercent = Math.round(((screenIndex + 1) / screens.length) * 100);

  useEffect(() => {
    // Reset internal state per screen transition
    setSelectedOption(null);
    setQuizSubmitted(false);
    setIsCorrect(false);
    setSelectedLeft(null);
    setMatchedPairs({});
    setFilledSequence([]);

    if (currentScreen?.type === 'prompt-sandbox' || currentScreen?.type === 'code-sandbox') {
      setSandboxInput(currentScreen.initialPrompt || currentScreen.initialCode || "");
      setSandboxOutput("");
    }

    if (currentScreen?.type === 'mastery') {
      soundFX.playFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [screenIndex, currentScreen]);

  const handleNextScreen = () => {
    soundFX.playClick();
    if (screenIndex < screens.length - 1) {
      setScreenIndex(prev => prev + 1);
    } else {
      onCompleteModule(moduleData.id, moduleData.xp, moduleData.badgeUnlocked || courseData.badge);
    }
  };

  // Submit Quiz Choice
  const handleCheckQuiz = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentScreen.correctIndex;
    setIsCorrect(correct);
    setQuizSubmitted(true);

    if (correct) {
      soundFX.playCorrect();
    } else {
      soundFX.playIncorrect();
    }
  };

  // Match Pairs Logic
  const handleSelectLeft = (leftItem) => {
    soundFX.playClick();
    setSelectedLeft(leftItem);
  };

  const handleSelectRight = (rightItem) => {
    if (!selectedLeft) return;
    const pairObj = currentScreen.pairs.find(p => p.left === selectedLeft.left);
    if (pairObj && pairObj.right === rightItem.right) {
      soundFX.playCorrect();
      setMatchedPairs(prev => ({ ...prev, [selectedLeft.left]: rightItem.right }));
      setSelectedLeft(null);
    } else {
      soundFX.playIncorrect();
      setSelectedLeft(null);
    }
  };

  // Run Sandbox Simulation
  const handleRunSandbox = () => {
    soundFX.playClick();
    setIsRunningSandbox(true);
    setTimeout(() => {
      setIsRunningSandbox(false);
      soundFX.playCorrect();
      if (currentScreen.type === 'prompt-sandbox') {
        setSandboxOutput(currentScreen.sampleOutputs ? currentScreen.sampleOutputs[0] : "Prompt executed successfully with 98% accuracy.");
      } else {
        setSandboxOutput(`Output:\n> Welcome to TechSetu, Student!\n> Code executed successfully with zero errors.\n> Status: OK (0ms)`);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between overflow-y-auto">
      {/* Top Bar with Progress Bar & Close */}
      <div className="w-full max-w-4xl mx-auto px-4 py-4 flex items-center gap-4 border-b border-slate-800">
        <button 
          onClick={onClose} 
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Progress Bar */}
        <div className="flex-1 bg-slate-900 h-3.5 rounded-full overflow-hidden border border-slate-800 relative">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 font-bold text-xs">
          <Zap className="w-3.5 h-3.5 fill-amber-400" />
          <span>+{moduleData.xp} XP</span>
        </div>
      </div>

      {/* Main Interactive Screen Content */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 flex flex-col justify-center">
        {/* SCREEN 1: CONCEPT CARD */}
        {currentScreen?.type === 'concept' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {currentScreen.badge || "Lesson Concept"}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              {currentScreen.title}
            </h2>

            <p className="text-slate-300 text-base leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {currentScreen.content}
            </p>

            {/* Localized Guidance Helper (Hinglish & Marathi) */}
            {userState.language === 'hinglish' && currentScreen.hinglishTip && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-200 font-medium">
                  {currentScreen.hinglishTip}
                </p>
              </div>
            )}
            {userState.language === 'marathi' && (currentScreen.marathiTip || currentScreen.hinglishTip) && (
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-cyan-200 font-medium">
                  {currentScreen.marathiTip || `💡 टीप: ${currentScreen.hinglishTip}`}
                </p>
              </div>
            )}

            {/* Code Snippet Box */}
            {currentScreen.codeSnippet && (
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 font-mono text-sm text-cyan-300 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-sans mb-1">Code Example:</div>
                <pre className="whitespace-pre-wrap">{currentScreen.codeSnippet}</pre>
              </div>
            )}

            {/* Key Points Checklist */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Takeaways</h4>
              {currentScreen.keyPoints?.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 2: SINGLE CHOICE QUIZ */}
        {currentScreen?.type === 'quiz-single' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              Interactive Quiz
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
              {currentScreen.question}
            </h2>

            {/* Duolingo 3D Option Cards */}
            <div className="grid gap-3 pt-2">
              {currentScreen.options.map((opt, idx) => {
                let cardStyle = "quiz-option-card";
                if (selectedOption === idx) cardStyle += " selected";
                if (quizSubmitted) {
                  if (idx === currentScreen.correctIndex) cardStyle += " correct";
                  else if (selectedOption === idx) cardStyle += " incorrect";
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => { soundFX.playClick(); setSelectedOption(idx); }}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-semibold flex items-center justify-between ${cardStyle}`}
                  >
                    <span className="text-slate-200">{opt}</span>
                    <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0 ml-3">
                      {String.fromCharCode(65 + idx)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SCREEN 3: MATCH PAIRS */}
        {currentScreen?.type === 'match-pairs' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs uppercase tracking-wider">
              Match the Terms
            </div>
            <p className="text-xs text-slate-400">{currentScreen.instruction}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase">Term</h4>
                {currentScreen.pairs.map((p, idx) => {
                  const isMatched = matchedPairs[p.left];
                  const isSelected = selectedLeft?.left === p.left;
                  return (
                    <button
                      key={idx}
                      disabled={isMatched}
                      onClick={() => handleSelectLeft(p)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                        isMatched
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 opacity-60'
                          : isSelected
                          ? 'bg-purple-900/40 border-purple-400 text-purple-200 ring-2 ring-purple-500/50'
                          : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {p.left} {isMatched ? '✓' : ''}
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase">Definition</h4>
                {currentScreen.pairs.map((p, idx) => {
                  const isMatched = Object.values(matchedPairs).includes(p.right);
                  return (
                    <button
                      key={idx}
                      disabled={isMatched}
                      onClick={() => handleSelectRight(p)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                        isMatched
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 opacity-60'
                          : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {p.right} {isMatched ? '✓' : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3 (ALT): FILL IN THE BLANKS */}
        {currentScreen?.type === 'fill-blanks' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider">
              Fill in the Blanks
            </div>
            <p className="text-sm font-semibold text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-2xl border border-slate-800">
              {currentScreen.sentence}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {currentScreen.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFX.playClick();
                    if (filledSequence.length < currentScreen.correctSequence.length) {
                      setFilledSequence([...filledSequence, opt]);
                    }
                  }}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-cyan-300 hover:bg-slate-800 transition-colors"
                >
                  + {opt}
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span>Your Answer: <strong className="text-emerald-400">{filledSequence.join(' → ') || 'Select words above'}</strong></span>
              {filledSequence.length > 0 && (
                <button onClick={() => setFilledSequence([])} className="text-slate-500 hover:text-rose-400 text-xs">Reset</button>
              )}
            </div>
          </div>
        )}

        {/* SCREEN 4: LIVE SANDBOX / MINI TASK */}
        {(currentScreen?.type === 'prompt-sandbox' || currentScreen?.type === 'code-sandbox') && (
          <div className="space-y-4 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Play className="w-3.5 h-3.5" />
              Live Hands-On Task
            </div>

            <h3 className="text-lg font-bold text-slate-100">{currentScreen.title}</h3>
            <p className="text-xs text-slate-300">{currentScreen.instruction}</p>

            {/* Code / Prompt Editor Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
              <textarea
                value={sandboxInput}
                onChange={(e) => setSandboxInput(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 text-slate-100 font-mono text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 resize-none"
              />
              <button
                onClick={handleRunSandbox}
                disabled={isRunningSandbox}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                {isRunningSandbox ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-slate-950" />}
                {isRunningSandbox ? 'Running Task...' : 'Execute & Run Live'}
              </button>
            </div>

            {/* Sandbox Output Terminal */}
            {sandboxOutput && (
              <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 font-mono text-xs text-emerald-300 animate-fadeIn space-y-1">
                <div className="text-[10px] font-sans font-bold text-emerald-500 uppercase tracking-widest mb-1">
                  ✓ Output Terminal (Executed):
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">{sandboxOutput}</p>
              </div>
            )}
          </div>
        )}

        {/* SCREEN 5: MASTERY SCREEN */}
        {currentScreen?.type === 'mastery' && (
          <div className="text-center space-y-6 animate-fadeIn py-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-emerald-400 p-0.5 shadow-2xl glow-emerald animate-float">
              <div className="w-full h-full bg-slate-950 rounded-3xl flex items-center justify-center">
                <Award className="w-12 h-12 text-amber-400" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-slate-100">{currentScreen.title}</h2>
              <p className="text-slate-400 text-sm mt-1">{currentScreen.summary}</p><p className="text-emerald-400 text-sm font-semibold mt-2">
  Great job, {localStorage.getItem("techsetu_name")}! 🎉
</p>
            </div>

            <div className="flex items-center justify-center gap-4 max-w-sm mx-auto">
              <div className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 block">XP Earned</span>
                <span className="text-2xl font-extrabold text-amber-400">+{currentScreen.xpEarned} XP</span>
              </div>
              <div className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 block">Badge Unlocked</span>
                <span className="text-sm font-extrabold text-emerald-400">{currentScreen.badgeUnlocked}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Footer */}
      <div className="w-full bg-slate-950 border-t border-slate-800 p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          {/* Feedback bar for single quiz */}
          {currentScreen?.type === 'quiz-single' && quizSubmitted ? (
            <div className="flex items-center gap-3 flex-1">
              {isCorrect ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{currentScreen.explanation}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-400 text-sm font-bold">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Not quite right. Try again or check the correct option!</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-medium">
              Screen {screenIndex + 1} of {screens.length}
            </div>
          )}

          {/* Action Button */}
          {currentScreen?.type === 'quiz-single' && !quizSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleCheckQuiz}
              className={`px-8 py-3 rounded-2xl font-extrabold text-sm transition-all ${
                selectedOption !== null 
                  ? 'btn-duo-primary text-slate-950 cursor-pointer' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextScreen}
              className="px-8 py-3 btn-duo-primary text-slate-950 font-extrabold text-sm rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <span>{screenIndex === screens.length - 1 ? 'Finish Module' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
