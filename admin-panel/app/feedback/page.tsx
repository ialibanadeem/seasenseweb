'use client';

import React from 'react';
import { Send, Star } from 'lucide-react';

export default function FeedbackPage() {
    return (
        <div className="flex w-full h-full p-8 gap-8 bg-[#fafbfc]">
            <div className="flex-1 flex flex-col max-w-[800px] w-full mx-auto">
                <div className="flex justify-between items-start mb-8 text-center pt-8">
                    <div className="w-full">
                        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">We value your feedback</h1>
                        <p className="text-[15px] font-medium text-slate-500 mt-2">Help us improve the Modulix platform by sharing your thoughts.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-slate-900">How would you rate your experience with the new Dashboard?</label>
                        <div className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button key={star} className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-200 transition-colors group">
                                    <Star size={24} className={star <= 4 ? "text-amber-400 fill-amber-400" : ""} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-slate-900">What do you think we could improve?</label>
                        <textarea 
                            rows={5} 
                            placeholder="Tell us what you love, what you hate, and what you'd like to see..." 
                            className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-[14px] focus:outline-none focus:border-slate-400 focus:bg-white transition-colors resize-none"
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-slate-900">Feature Requests (Optional)</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Dark Mode, CSV Exports, More Integrations" 
                            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-[14px] focus:outline-none focus:border-slate-400 focus:bg-white transition-colors" 
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button className="px-6 py-3 rounded-xl bg-slate-900 text-white text-[14px] font-bold hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
                            Submit Feedback <Send size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
