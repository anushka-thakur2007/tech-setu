export const COURSES = [
  {
    id: "ai-prompting",
    title: "AI Tools & Prompt Engineering",
    subtitle: "Learn to prompt AI like a pro for study, coding, and work",
    icon: "Sparkles",
    color: "from-cyan-500 to-blue-600",
    glowColor: "cyan",
    badge: "AI Explorer",
    modules: [
      {
        id: "ai-mod-1",
        title: "1. What is AI & ChatGPT?",
        desc: "Understand LLMs without technical jargon",
        duration: "5 mins",
        xp: 50,
        screens: [
          {
            type: "concept",
            title: "What is a Large Language Model (LLM)?",
            badge: "Concept 1/5",
            content: "Think of AI like a super-smart digital assistant that has read millions of books and code repositories. It doesn't 'think' like a human; instead, it predicts the next most helpful words based on your prompt!",
            hinglishTip: "💡 Tip: ChatGPT ko ek bohot padhe-likhe dost ki tarah samjho jo tumhare diye gaye text ko aage complete karta hai.",
            keyPoints: [
              "Prompts are the instructions you give to the AI",
              "Better prompts = 10x better & faster answers",
              "AI makes mistakes (called hallucinations) - always verify key facts!"
            ]
          },
          {
            type: "quiz-single",
            title: "Quick Check",
            question: "What is the primary role of a 'Prompt' when interacting with AI?",
            options: [
              "A password required to login to ChatGPT",
              "The instructions/questions you give to direct the AI's response",
              "A software update for your smartphone",
              "A programming language like C++"
            ],
            correctIndex: 1,
            explanation: "Spot on! A prompt is the input instruction you give to an AI model to guide what output it generates."
          },
          {
            type: "match-pairs",
            title: "Match the AI Terms",
            instruction: "Tap an item on the left and match it with its correct definition on the right!",
            pairs: [
              { left: "Prompt", right: "The input query or instruction given to AI" },
              { left: "LLM", right: "Large Language Model trained on vast text data" },
              { left: "Hallucination", right: "When AI generates incorrect or made-up facts" }
            ]
          },
          {
            type: "prompt-sandbox",
            title: "Live Mini-Task: Try Your First Prompt",
            instruction: "Modify the prompt below to ask AI to explain 'Photosynthesis' for a 10-year-old student, then hit Run!",
            initialPrompt: "Act as a science tutor. Explain Photosynthesis in 2 simple sentences using an easy daily life analogy.",
            expectedKeyword: "analogy",
            sampleOutputs: [
              "🌱 Imagine plants are little master chefs! They use sunlight like an oven, water from the soil like secret soup broth, and carbon dioxide from the air to cook up delicious sugar food for themselves while releasing fresh oxygen for us to breathe!"
            ]
          },
          {
            type: "mastery",
            title: "Module Complete! 🎉",
            xpEarned: 50,
            badgeUnlocked: "AI Starter",
            summary: "You mastered the basics of AI and created your first structured prompt!"
          }
        ]
      },
      {
        id: "ai-mod-2",
        title: "2. The C-R-O Prompt Formula",
        desc: "Context + Role + Output format = Perfect responses",
        duration: "5 mins",
        xp: 60,
        screens: [
          {
            type: "concept",
            title: "The Golden CRO Formula",
            badge: "Concept 1/5",
            content: "Instead of writing vague prompts like 'write a resume', use the C-R-O formula to get exact, professional results every single time:",
            hinglishTip: "💡 Rule: Jab bhi AI se kaam karwana ho, usko Role aur Context pehle batao!",
            keyPoints: [
              "C = Context (Who you are & what you are working on)",
              "R = Role (Who the AI should pretend to be, e.g. Senior Tech Interviewer)",
              "O = Output Format (Bullet points, table, short paragraph)"
            ]
          },
          {
            type: "quiz-single",
            title: "Spot the Best Prompt",
            question: "Which of the following prompts uses the C-R-O Formula best?",
            options: [
              "Help me write code for my college project.",
              "Act as a Python Expert. I am a 2nd year student in Nanded building a student dashboard. Write 5 clean Python functions with comments.",
              "What is Python and why is it used?",
              "Generate a document for my placement drive."
            ],
            correctIndex: 1,
            explanation: "Excellent! Option 2 clearly specifies the Role (Python Expert), Context (2nd year Nanded student project), and Output Format (5 functions with comments)."
          },
          {
            type: "fill-blanks",
            title: "Complete the Formula",
            sentence: "In the C-R-O formula, 'C' stands for _______, 'R' stands for _______, and 'O' stands for _______.",
            options: ["Context", "Role", "Output Format", "Code", "Robot"],
            correctSequence: ["Context", "Role", "Output Format"]
          },
          {
            type: "prompt-sandbox",
            title: "Hands-on CRO Prompt Tester",
            instruction: "Test the C-R-O formula! Specify a role and context in the input box below.",
            initialPrompt: "Role: College Placement Mentor. Context: Final year B.Sc CS student preparing for campus interview. Task: Give 3 top tips for cracking technical HR rounds in a bulleted list.",
            expectedKeyword: "tips",
            sampleOutputs: [
              "1. 🎯 Structure your project explanation using STAR method (Situation, Task, Action, Result).\n2. 💡 Be honest about what you know—if you don't know a syntax, explain your logic clearly.\n3. 🚀 Highlight practical hands-on projects rather than just theoretical marks!"
            ]
          },
          {
            type: "mastery",
            title: "Prompt Architect Badge Earned! 🏆",
            xpEarned: 60,
            badgeUnlocked: "Prompt Architect",
            summary: "You learned how to structure high-impact prompts for any task!"
          }
        ]
      }
    ]
  },
  {
    id: "python-coding",
    title: "Python & Coding Fundamentals",
    subtitle: "Zero-prior-knowledge coding in 5-minute interactive bites",
    icon: "Code",
    color: "from-emerald-500 to-teal-600",
    glowColor: "emerald",
    badge: "Code Ninja",
    modules: [
      {
        id: "py-mod-1",
        title: "1. Variables & Print Statements",
        desc: "Store data and output messages in Python",
        duration: "5 mins",
        xp: 50,
        screens: [
          {
            type: "concept",
            title: "Variables are Named Storage Boxes",
            badge: "Concept 1/5",
            content: "In Python, a variable is like a labeled container where you keep information so you can use it later in your program.",
            hinglishTip: "💡 Socho ek box hai jiske upar name tag 'student_name' laga hai aur andar 'Anu' rakha hai.",
            codeSnippet: `student_name = "Anu"\nage = 20\nprint("Hello,", student_name)`,
            keyPoints: [
              "Use = to assign a value to a variable",
              "Use print(...) to display output on screen",
              "Text values (strings) go inside quotes like \"Hello\""
            ]
          },
          {
            type: "quiz-single",
            title: "Python Output Quiz",
            question: "What will `print('Tech' + 'Setu')` output in Python?",
            options: [
              "Tech Setu (with space)",
              "TechSetu (without space)",
              "Error",
              "'Tech' + 'Setu'"
            ],
            correctIndex: 1,
            explanation: "Great job! Combining two string values with + joins them directly together without extra spaces."
          },
          {
            type: "fill-blanks",
            title: "Assemble the Code",
            sentence: "Create a variable named `city` with value 'Nanded' and print it: _______ = 'Nanded'; _______(city)",
            options: ["city", "print", "var", "output"],
            correctSequence: ["city", "print"]
          },
          {
            type: "code-sandbox",
            title: "Live Code Playground",
            instruction: "Edit the Python code below to change the student name to your name, then click Run Code!",
            initialCode: `# TechSetu Python Playground
name = "Student from Nanded"
score = 100

print("Welcome to TechSetu,", name)
print("Your starting score is:", score, "XP")`,
            language: "python"
          },
          {
            type: "mastery",
            title: "First Lines of Code! ⚡",
            xpEarned: 50,
            badgeUnlocked: "Python Starter",
            summary: "You wrote and executed real Python code!"
          }
        ]
      },
      {
        id: "py-mod-2",
        title: "2. Control Flow: If-Else Logic",
        desc: "Teach your program how to make smart decisions",
        duration: "5 mins",
        xp: 60,
        screens: [
          {
            type: "concept",
            title: "If-Else Decision Making",
            badge: "Concept 1/5",
            content: "Conditional logic lets your app decide which path to take based on user input or marks scored.",
            hinglishTip: "💡 Jaise agar college gate open hai toh andar jao, else ghar jao!",
            codeSnippet: `marks = 85\nif marks >= 40:\n    print("Passed!")\nelse:\n    print("Try Again")`,
            keyPoints: [
              "if checks if a condition is True",
              "else runs when the condition is False",
              "Indentation (4 spaces) is required in Python!"
            ]
          },
          {
            type: "quiz-single",
            title: "Logic Predictor",
            question: "Given `score = 50`, what prints for `if score > 60: print('A') else: print('B')`?",
            options: [
              "A",
              "B",
              "Both A and B",
              "Nothing"
            ],
            correctIndex: 1,
            explanation: "Correct! Since 50 is NOT greater than 60, the condition is False, so the else branch prints 'B'."
          },
          {
            type: "match-pairs",
            title: "Match Comparison Operators",
            instruction: "Match each Python operator to its meaning!",
            pairs: [
              { left: "==", right: "Is equal to" },
              { left: ">=", right: "Greater than or equal to" },
              { left: "!=", right: "Not equal to" }
            ]
          },
          {
            type: "code-sandbox",
            title: "Live Code Task: Grade Calculator",
            instruction: "Test the grade checker! Try changing attendance to 80 to see the output change.",
            initialCode: `attendance = 65

if attendance >= 75:
    print("Eligible for Exams! ✅")
else:
    print("Warning: Attendance below 75% ⚠️")`,
            language: "python"
          },
          {
            type: "mastery",
            title: "Logic Wizard Badge Unlocked! 🧙‍♂️",
            xpEarned: 60,
            badgeUnlocked: "Logic Master",
            summary: "You mastered conditional decision logic in programming."
          }
        ]
      }
    ]
  },
  {
    id: "web-dev",
    title: "Web Development & HTML/CSS",
    subtitle: "Build real visual web components in minutes",
    icon: "Layout",
    color: "from-purple-500 to-pink-600",
    glowColor: "purple",
    badge: "Web Creator",
    modules: [
      {
        id: "web-mod-1",
        title: "1. HTML Foundations: Tags & Elements",
        desc: "The skeleton structure of every website on Earth",
        duration: "5 mins",
        xp: 50,
        screens: [
          {
            type: "concept",
            title: "Web Pages are Built with HTML Tags",
            badge: "Concept 1/5",
            content: "HTML uses tags wrapped in angle brackets `<tag>content</tag>` to define headings, paragraphs, buttons, and images.",
            hinglishTip: "💡 Heading ke liye <h1>, text ke liye <p>, button ke liye <button>!",
            codeSnippet: `<h1>Welcome to Nanded Tech Hub</h1>\n<p>Learning web dev step by step!</p>\n<button>Get Started</button>`,
            keyPoints: [
              "<h1> to <h6> define headings of different sizes",
              "<p> creates a text paragraph",
              "<button> creates an interactive clickable button"
            ]
          },
          {
            type: "quiz-single",
            title: "HTML Tag Test",
            question: "Which tag is used for the largest main heading on a webpage?",
            options: [
              "<h6>",
              "<heading>",
              "<h1>",
              "<text>"
            ],
            correctIndex: 2,
            explanation: "Spot on! <h1> is the top-level main heading element."
          },
          {
            type: "fill-blanks",
            title: "Build a Web Button",
            sentence: "Fill in the missing tags to create a clickable button: <_______> Click Me </_______>",
            options: ["button", "btn", "link", "p"],
            correctSequence: ["button", "button"]
          },
          {
            type: "code-sandbox",
            title: "Live Web Card Builder",
            instruction: "Customize your web card heading and button text below!",
            initialCode: `<div style="background: #1e293b; padding: 20px; border-radius: 12px; border: 2px solid #3b82f6;">
  <h2 style="color: #60a5fa; margin-top: 0;">🚀 My Tech Profile</h2>
  <p style="color: #cbd5e1;">B.Sc Computer Science Student at MGM College, Nanded.</p>
  <button style="background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Connect with Me</button>
</div>`,
            language: "html"
          },
          {
            type: "mastery",
            title: "Web Creator Badge Earned! 🌐",
            xpEarned: 50,
            badgeUnlocked: "Web Builder",
            summary: "You created your first interactive HTML card component!"
          }
        ]
      }
    ]
  },
  {
    id: "digital-literacy",
    title: "Digital Safety & Workplace Tech",
    subtitle: "Essential skills for internships, jobs, and daily tech safety",
    icon: "ShieldCheck",
    color: "from-amber-500 to-orange-600",
    glowColor: "amber",
    badge: "Digital Defender",
    modules: [
      {
        id: "digi-mod-1",
        title: "1. Cyber Safety & Scam Detection",
        desc: "Protect yourself from fake job offers, OTP scams & phishing",
        duration: "5 mins",
        xp: 50,
        screens: [
          {
            type: "concept",
            title: "Spotting Phishing & Fake Job Offers",
            badge: "Concept 1/5",
            content: "Cyber scammers target college students with fake 'Work From Home' job emails asking for registration fees or personal bank OTPs.",
            hinglishTip: "💡 Golden Rule: Koi bhi genuine company placement ya interview ke liye PAISE nahi maangti!",
            keyPoints: [
              "Never share Bank OTPs or passwords with anyone",
              "Check email addresses carefully (e.g. @gmail.com vs official @company.com)",
              "Legitimate employers never ask for upfront payment for job training"
            ]
          },
          {
            type: "quiz-single",
            title: "Safety Check",
            question: "You receive an SMS: 'Congratulations! Selected for MNC job. Pay Rs. 500 registration fee immediately to claim seat.' What should you do?",
            options: [
              "Pay Rs. 500 immediately to reserve the job seat",
              "Ignore, block, and report the message as a scam",
              "Share your Aadhar and Bank OTP",
              "Forward it to all your college friends"
            ],
            correctIndex: 1,
            explanation: "100% Correct! Real companies NEVER demand money to offer a job."
          },
          {
            type: "match-pairs",
            title: "Identify Safe vs Unsafe",
            instruction: "Match each scenario with whether it is Safe or a Cyber Scam!",
            pairs: [
              { left: "Bank asks for OTP over phone call", right: "Dangerous Cyber Scam" },
              { left: "Official college email from mgm.ac.in", right: "Safe Trusted Source" },
              { left: "Free iPhone link sent on WhatsApp group", right: "Malware / Phishing Link" }
            ]
          },
          {
            type: "prompt-sandbox",
            title: "Interactive Scam Detector Tool",
            instruction: "Paste suspicious message text below to analyze security risk!",
            initialPrompt: "Suspicious message: 'Dear student, your scholarship of Rs. 25,000 is approved. Click bit.ly/claim-25k to enter UPI PIN.'",
            expectedKeyword: "UPI",
            sampleOutputs: [
              "⚠️ SECURITY ALERT: 99% CHANCE OF FRAUD!\n\nRed Flags Detected:\n1. 🚨 Never enter your UPI PIN to RECEIVE money. Entering UPI PIN deducts money from your account.\n2. 🔗 Shortened suspicious link (bit.ly)\n3. 🛑 Urgent emotional language."
            ]
          },
          {
            type: "mastery",
            title: "Digital Defender Badge Unlocked! 🛡️",
            xpEarned: 50,
            badgeUnlocked: "Cyber Shield",
            summary: "You learned how to spot online scams and protect your digital privacy."
          }
        ]
      }
    ]
  }
];

export const INITIAL_USER_STATE = {
  xp: 0,
  streak: 0, // Starts at 0, becomes 1 on completing 1st lesson today
  lastCompletedDate: null,
  completedModules: [],
  unlockedBadges: [],
  dailyGoal: { target: 3, completed: 0 },
  language: "hinglish", // 'hinglish' | 'english' | 'marathi'
  level: 1,
  levelTitle: "Byte Starter"
};
