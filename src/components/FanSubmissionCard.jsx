import React from 'react';
import { User, Calendar, CheckCircle2, Heart } from 'lucide-react';

export default function FanSubmissionCard({ submission }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-[#0c101d] border border-white/[0.08] hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
          <img
            src={submission.image}
            alt={submission.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-transparent to-black/30" />

          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10">
              {submission.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
              <CheckCircle2 className="w-2.5 h-2.5" />
              Verified
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h4 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-blue-400 transition-colors font-display">
            {submission.title}
          </h4>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {submission.description}
          </p>

          {submission.content && (
            <p className="text-xs text-zinc-400 line-clamp-2 italic bg-black/40 p-3 rounded-2xl border border-white/[0.05]">
              "{submission.content}"
            </p>
          )}
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-zinc-200">{submission.creator}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{submission.submissionDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
