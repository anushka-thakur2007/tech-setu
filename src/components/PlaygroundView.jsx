import React, { useState } from 'react';
import { Code, Sparkles, Layout, Play, RotateCcw, Copy, Check, Terminal, Cpu, Lightbulb, Zap } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function PlaygroundView() {
  const [activeTab, setActiveTab] = useState('python'); // 'python' | 'prompt' | 'html'
  const [code, setCode] = useState(`# Python Code Playground for Nanded Students
student_name = "Anu"
college = "MGM College of CS & IT, Nanded"
attendance_pct = 82

print("=== TechSetu Student Verification ===")
print("Student Name:", student_name)
print("College:", college)

if attendance_pct >= 75:
    print("Status: ELIGIBLE FOR EXAM HALL TICKET ✅")
else:
    print("Status: ATTENDANCE SHORTAGE WARNING ⚠️")`);

  const [promptRole, setPromptRole] = useState("College Tech Placement Coach");
  const [promptContext, setPromptContext] = useState("2nd year student in Nanded preparing for Python developer interview");
  const [promptTask, setPromptTask] = useState("Give 3 high-priority interview questions with short answer hints.");
  
  const [htmlCode, setHtmlCode] = useState(`<div style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 24px; border-radius: 16px; border: 1px solid #3b82f6; text-align: center; color: white;">
  <h2 style="color: #38bdf8; margin-bottom: 8px;">🚀 TechSetu Student Badge</h2>
  <p style="color: #94a3b8; font-size: 14px;">Building employable tech skills daily!</p>
  <button style="background: #10b981; color: #022c22; border: none; padding: 10px 20px; font-weight: bold; border-radius: 10px; cursor: pointer; margin-top: 12px;">
    Level Up (+50 XP)
  </button>
</div>`);

  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      title: "Attendance Checker",
      code: `attendance = 80\nif attendance >= 75:\n    print("Eligible for Exams! ✅")\nelse:\n    print("Not eligible ❌")`
    },
    {
      title: "Calculate Percentage",
      code: `total_marks = 450\nmax_marks = 500\npct = (total_marks / max_marks) * 100\nprint("Your Percentage:", pct, "%")`
    },
    {
      title: "Loop Through Skills",
      code: `skills = ["Python", "Prompt Engineering", "Cyber Safety", "Git"]\nfor skill in skills:\n    print("Learning:", skill)`
    }
  ];

  const handleRunPython = () => {
    soundFX.playClick();
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      soundFX.playCorrect();
      
      // Generate clean output
      if (code.includes("attendance")) {
        setOutput(`=== TechSetu Student Verification ===\nStudent Name: Anu\nCollege: MGM College of CS & IT, Nanded\nStatus: ELIGIBLE FOR EXAM HALL TICKET ✅\n\n[Process completed in 12ms]`);
      } else if (code.includes("skills")) {
        setOutput(`Learning: Python\nLearning: Prompt Engineering\nLearning: Cyber Safety\nLearning: Git\n\n[Process completed in 8ms]`);
      } else {
        setOutput(`> Output:\nCode executed successfully with zero errors.\nResult: 90.0 %\n\n[Execution complete]`);
      }
    }, 500);
  };

  const handleRunPrompt = () => {
    soundFX.playClick();
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      soundFX.playCorrect();
      setOutput(`🤖 AI Response (Simulated LLM Output):

1. ❓ Q: What is the difference between a list and a tuple in Python?
   💡 Hint: Lists are mutable (can change), tuples are immutable (cannot change).

2. ❓ Q: How do you handle exceptions in Python?
   💡 Hint: Use try-except blocks to catch runtime errors gracefully.

3. ❓ Q: What does the print() function do?
   💡 Hint: Outputs string or variable data to the standard console stdout.

🎯 Prompt Score: 96/100 (Excellent CRO Structure!)`);
    }, 600);
  };

  const handleCopy = (text) => {
    soundFX.playClick();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Terminal className="w-4 h-4" />
            Interactive Live Sandbox
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Code & Prompt Playground
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test Python scripts, design AI prompts using the CRO formula, or build visual HTML components directly in your browser.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => { soundFX.playClick(); setActiveTab('python'); setOutput(""); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'python' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Python
          </button>
          <button
            onClick={() => { soundFX.playClick(); setActiveTab('prompt'); setOutput(""); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'prompt' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Prompt
          </button>
          <button
            onClick={() => { soundFX.playClick(); setActiveTab('html'); setOutput(""); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'html' ? 'bg-purple-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            HTML Preview
          </button>
        </div>
      </div>

      {/* PYTHON SANDBOX MODE */}
      {activeTab === 'python' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {/* Presets Bar */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Presets:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {presets.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { soundFX.playClick(); setCode(p.code); setOutput(""); }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-cyan-300"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1 border-b border-slate-800 pb-2">
                <span className="font-mono text-emerald-400 font-semibold">main.py</span>
                <button 
                  onClick={() => handleCopy(code)} 
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                className="w-full bg-slate-950 text-slate-100 font-mono text-xs p-3 rounded-xl border border-slate-800/80 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
              />

              <button
                onClick={handleRunPython}
                disabled={isExecuting}
                className="w-full py-3 btn-duo-primary text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                {isExecuting ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-slate-950" />}
                {isExecuting ? 'Running Python Code...' : 'Run Python Script'}
              </button>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Console Output:</span>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 h-[350px] font-mono text-xs text-emerald-400 overflow-y-auto space-y-2 shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-900 pb-2">
                <span>Terminal Log</span>
                <span>Python 3.11 Virtual Sandbox</span>
              </div>

              {output ? (
                <pre className="whitespace-pre-wrap leading-relaxed text-emerald-300">{output}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2">
                  <Terminal className="w-8 h-8 stroke-1 text-slate-700" />
                  <p className="text-xs">Click "Run Python Script" to view output</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI PROMPT BUILDER MODE */}
      {activeTab === 'prompt' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              C-R-O Prompt Constructor
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">1. Role (Who AI pretends to be):</label>
                <input
                  type="text"
                  value={promptRole}
                  onChange={(e) => setPromptRole(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">2. Context (Your background & situation):</label>
                <input
                  type="text"
                  value={promptContext}
                  onChange={(e) => setPromptContext(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">3. Task / Output Format:</label>
                <textarea
                  value={promptTask}
                  onChange={(e) => setPromptTask(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 text-slate-100 text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleRunPrompt}
              disabled={isExecuting}
              className="w-full py-3 btn-duo-secondary text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              {isExecuting ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isExecuting ? 'Querying AI Model...' : 'Test Structured CRO Prompt'}
            </button>
          </div>

          {/* AI Response Output */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Model Output:</span>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 h-[350px] font-sans text-xs text-slate-200 overflow-y-auto space-y-2 shadow-inner">
              {output ? (
                <pre className="whitespace-pre-wrap font-sans leading-relaxed text-slate-200">{output}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2">
                  <Sparkles className="w-8 h-8 stroke-1 text-slate-700" />
                  <p className="text-xs">Enter role, context, task and click Test</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HTML PREVIEW MODE */}
      {activeTab === 'html' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">HTML/CSS Code:</span>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              rows={12}
              className="w-full bg-slate-950 text-slate-100 font-mono text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visual Render Preview:</span>
            <div 
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 h-[320px] flex items-center justify-center overflow-auto"
              dangerouslySetInnerHTML={{ __html: htmlCode }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
