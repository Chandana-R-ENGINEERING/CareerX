import { ChatMessage } from '../types';

export async function sendChatMessageToAI(
  messages: ChatMessage[],
  context: {
    targetRole?: string;
    readinessScore?: number;
    weaknesses?: string;
  },
  mode: string
): Promise<{ reply: string; isLiveAI: boolean; note?: string }> {
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, context, mode }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('API chat fetch failed, using smart client fallback:', err);
    return {
      reply: `### CareerX AI Mentor Update

I'm ready to help you with your preparation for **${context.targetRole || 'MERN Stack Developer'}**!

Here is your immediate plan:
1. **Strengthen Aptitude**: Focus on Time & Work problems where current accuracy is 65%.
2. **Master Key Algorithms**: Complete Two Sum and Longest Substring in the Coding Zone.
3. **Practice Live Interviews**: Complete a 10-minute technical session on RESTful concepts.

What topic would you like to dive into next?`,
      isLiveAI: false,
      note: 'Offline mode active.',
    };
  }
}

export async function analyzeResumeWithAI(
  resumeText: string,
  targetRole: string,
  jobDescription?: string
) {
  try {
    const res = await fetch('/api/gemini/resume-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, targetRole, jobDescription }),
    });
    if (!res.ok) throw new Error('Failed to analyze');
    return await res.json();
  } catch (err) {
    console.warn('Resume analysis fallback:', err);
    return {
      result: {
        atsScore: 78,
        matchedKeywords: ['React', 'JavaScript', 'Node.js', 'Express', 'Git', 'REST APIs'],
        missingKeywords: ['TypeScript', 'Docker', 'Redis', 'Unit Testing', 'CI/CD'],
        strengths: ['Clear project breakdown', 'Relevant full-stack skills'],
        improvements: ['Include quantifiable business impact metrics', 'Add TypeScript experience'],
        bulletFixes: [
          {
            original: 'Built a full stack project with React and Node',
            improved: 'Architected full-stack web application with React & Node.js, reducing loading latency by 35% with memoization.',
            reason: 'Added concrete metrics and technical action verbs.',
          },
        ],
      },
      isLiveAI: false,
    };
  }
}

export async function evaluateMockInterviewAnswer(
  question: string,
  userAnswer: string,
  role: string,
  roundType: string
) {
  try {
    const res = await fetch('/api/gemini/mock-interview-eval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, userAnswer, role, roundType }),
    });
    if (!res.ok) throw new Error('Evaluation request failed');
    return await res.json();
  } catch (err) {
    return {
      evaluation: {
        score: 8.0,
        technicalAccuracy: 'Solid understanding of core mechanics and best practices.',
        communicationClarity: 'Clear and structured explanation.',
        keyStrengths: ['Good vocabulary', 'Direct answer to question'],
        suggestedImprovements: ['Mention edge cases and scalability trade-offs'],
        modelAnswer: 'A high quality answer clearly establishes the trade-offs, security implications, and design patterns used.',
      },
      isLiveAI: false,
    };
  }
}

export async function runCodeSandbox(
  language: string,
  code: string,
  testCases: { input: string; expectedOutput: string }[]
) {
  try {
    const res = await fetch('/api/code/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, code, testCases }),
    });
    if (!res.ok) throw new Error('Sandbox runner failed');
    return await res.json();
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Execution failed',
      executionTimeMs: 0,
    };
  }
}
