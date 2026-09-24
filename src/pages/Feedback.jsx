import React, { useState } from 'react';
import { MessageSquare, Check, AlertCircle, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function Feedback() {
  const { currentUser } = useAuth();
  const { addFeedback } = useData();

  const [userName, setUserName] = useState(currentUser?.name || '');
  const [userEmail, setUserEmail] = useState(currentUser?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('feature');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!userName.trim()) errs.userName = 'Name is required';
    if (!userEmail.trim() || !/\S+@\S+\.\S+/.test(userEmail)) {
      errs.userEmail = 'Valid email is required';
    }
    if (!subject.trim()) errs.subject = 'Subject line is required';
    if (!message.trim() || message.length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addFeedback({
      userName,
      userEmail,
      subject,
      message,
      type
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSubject('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Community Voice</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Feedback & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Support</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium">
          Have an idea for a new fandom realm, noticed an issue, or want to suggest an event? Send your thoughts directly to our development team.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 rounded-3xl bg-[#0c101d] border border-emerald-500/30 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center gap-3 text-emerald-400">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">Thank You for Your Feedback!</h3>
              <p className="text-xs text-zinc-400">
                Your message has been logged in our system and assigned to the community team.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="mt-4 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-md shadow-blue-500/20"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-[#0c101d] border border-white/[0.08] space-y-5 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              />
              {errors.userName && <p className="text-xs text-rose-400 mt-1">{errors.userName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
              />
              {errors.userEmail && <p className="text-xs text-rose-400 mt-1">{errors.userEmail}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Feedback Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'feature', label: 'Feature Request' },
                { id: 'bug', label: 'Report Bug' },
                { id: 'general', label: 'General Praise' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setType(item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    type === item.id
                      ? 'bg-blue-600/30 text-blue-400 border-blue-500/50'
                      : 'bg-black/40 text-zinc-400 border-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Subject Line *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Please add Discord community sync"
              className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
            {errors.subject && <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Detailed Message *
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you would love to see or what can be improved..."
              className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
            {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Send Community Feedback</span>
          </button>
        </form>
      )}
    </div>
  );
}
