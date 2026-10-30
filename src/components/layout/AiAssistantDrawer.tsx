import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Code,
  Briefcase,
  Brain,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';
import { sendChatMessageToAI } from '../../services/api';

export const AiAssistantDrawer: React.FC = () => {
  const { isAiDrawerOpen, setIsAiDrawerOpen, user } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      content: `Hello there! I am your real-time AI Career & Engineering Mentor. Ask me any technical coding questions (e.g., closures, React, JWT, DSA), ask about your skill gaps, or let me help you prepare for ${user.targetRole} interviews!`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<
    'Career Mentor' | 'DSA Tutor' | 'Aptitude Tutor' | 'Resume Coach' | 'Interview Coach'
  >('Career Mentor');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiDrawerOpen) {
      scrollToBottom();
    }
  }, [messages, isAiDrawerOpen]);

  if (!isAiDrawerOpen) return null;

  const suggestedQuestions = [
    'What skills am I missing for my target role?',
    'Explain closures in JavaScript with an example',
    'How does JWT authentication work?',
    'Give me a DSA problem to practice',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: 'Just now',
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessageToAI(
        newMessages,
        {
          targetRole: user.targetRole,
          readinessScore: user.readinessScore,
          weaknesses: 'Binary Search, MongoDB Indexing, System Design',
        },
        selectedMode
      );

      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        content: response.reply,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_err_${Date.now()}`,
          sender: 'assistant',
          content: 'CareerAI service is momentarily unavailable. Please check your connection and try again.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg_welcome',
        sender: 'assistant',
        content: `Hello there! I am your real-time AI Career & Engineering Mentor. Ask me any technical coding questions (e.g., closures, React, JWT, DSA), ask about your skill gaps, or let me help you prepare for ${user.targetRole} interviews!`,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] md:w-[500px] bg-white shadow-2xl border-l border-slate-200 flex flex-col font-sans animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 bg-[#0b1120] text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              CareerAI Mentor
            </h3>
            <p className="text-[11px] text-indigo-300 font-medium">Context: {user.targetRole}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            title="Clear Chat"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAiDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex gap-1.5 overflow-x-auto text-[11px] font-semibold text-slate-600 scrollbar-none">
        {(
          [
            'Career Mentor',
            'DSA Tutor',
            'Aptitude Tutor',
            'Resume Coach',
            'Interview Coach',
          ] as const
        ).map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              selectedMode === mode
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`group relative max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white font-medium rounded-tr-none shadow-md shadow-indigo-600/20'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-xs'
                }`}
              >
                {!isUser && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title="Copy text"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:p-3 prose-pre:text-xs">
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs shadow-xs">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions (exact replica of Screenshot 2e7bdda4) */}
      <div className="p-3.5 bg-white border-t border-slate-200/80">
        <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">
          Suggested Questions:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] font-medium text-slate-700 hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 px-3 py-1.5 rounded-full text-left transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={`Ask anything about ${user.targetRole}, React, DSA, or your resume...`}
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || isLoading}
          className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
