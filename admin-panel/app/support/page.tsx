'use client';

import React from 'react';
import { HelpCircle, Search, MessageSquare, Book, FileText, ChevronRight } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="flex w-full h-full p-8 gap-8 bg-[#fafbfc]">
            <div className="flex-1 flex flex-col max-w-[1000px] w-full mx-auto">
                <div className="flex flex-col items-center mb-12 text-center mt-8">
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">How can we help you today?</h1>
                    <div className="bg-white rounded-full flex items-center px-6 h-14 shadow-md border border-slate-100 w-full max-w-2xl">
                        <Search className="text-slate-400 mr-4" size={20} />
                        <input type="text" placeholder="Search for answers..." className="bg-transparent outline-none text-[15px] text-slate-600 w-full placeholder-slate-400 font-medium h-full" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Book size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Knowledge Base</h3>
                        <p className="text-[13px] text-slate-500 font-medium mb-4">Read our comprehensive guides on how to manage orders and deliveries.</p>
                        <span className="text-[13px] font-bold text-blue-600 flex items-center gap-1 mt-auto">Browse Articles <ChevronRight size={14} /></span>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <FileText size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Billing & Invoices</h3>
                        <p className="text-[13px] text-slate-500 font-medium mb-4">Find answers about payments, billing cycles, and generating invoices.</p>
                        <span className="text-[13px] font-bold text-emerald-600 flex items-center gap-1 mt-auto">View FAQs <ChevronRight size={14} /></span>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MessageSquare size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Contact Support</h3>
                        <p className="text-[13px] text-slate-500 font-medium mb-4">Can't find what you're looking for? Open a ticket with our support team.</p>
                        <span className="text-[13px] font-bold text-purple-600 flex items-center gap-1 mt-auto">Open Ticket <ChevronRight size={14} /></span>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><HelpCircle size={20} className="text-slate-400" /> Frequently Asked Questions</h2>
                    <div className="flex flex-col gap-4">
                        {[
                            'How do I cancel an order that is already scheduled?',
                            'What happens if my delivery is delayed?',
                            'How can I add a new payment method to my account?',
                            'Can I change the delivery address while the shipment is On Progress?'
                        ].map((q, i) => (
                            <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                                <span className="text-[14px] font-bold text-slate-700">{q}</span>
                                <ChevronRight size={16} className="text-slate-400" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
