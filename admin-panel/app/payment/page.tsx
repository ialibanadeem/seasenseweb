'use client';

import React from 'react';
import { CreditCard, Wallet, Plus, ShieldCheck, ArrowRightLeft } from 'lucide-react';

export default function PaymentPage() {
    return (
        <div className="flex w-full h-full p-8 gap-8 bg-[#fafbfc]">
            <div className="flex-1 flex flex-col max-w-[1200px] w-full mx-auto px-4 md:px-0">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Payment & Billing</h1>
                        <p className="text-[15px] font-medium text-slate-500 mt-2">Manage your connected wallets, payment methods, and billing history.</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {/* Left Column - Payment Methods */}
                    <div className="col-span-2 flex flex-col border border-slate-200 bg-white rounded-3xl p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-slate-900">Payment Methods</h2>
                            <button className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                                <Plus size={16} /> Add Method
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {/* Primary Card */}
                            <div className="p-5 border-2 border-slate-900 bg-slate-50 rounded-2xl flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                                        {/* Fake Mastercard Logo */}
                                        <div className="flex -space-x-2">
                                            <div className="w-5 h-5 rounded-full bg-red-500 opacity-80 mix-blend-screen" />
                                            <div className="w-5 h-5 rounded-full bg-amber-500 opacity-80 mix-blend-screen" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-bold text-slate-900">Mastercard ending in 4345</p>
                                        <p className="text-[13px] font-medium text-slate-500">Expiry 12/24</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg">Default</span>
                                </div>
                            </div>

                            {/* Secondary Card */}
                            <div className="p-5 border border-slate-200 hover:border-slate-300 bg-white rounded-2xl flex items-center justify-between group cursor-pointer transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 font-bold italic">
                                        VISA
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-bold text-slate-900">Visa ending in 9021</p>
                                        <p className="text-[13px] font-medium text-slate-500">Expiry 08/26</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-slate-100 my-8" />

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                            <ShieldCheck size={24} className="text-emerald-500 shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-slate-900 mb-1">Your payments are fully secured.</p>
                                <p className="text-[13px] text-slate-600 font-medium">We use end-to-end encryption to ensure your credit card details are safe and never stored maliciously.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Balance Summary */}
                    <div className="col-span-1 flex flex-col gap-8">
                        {/* Wallet Balance */}
                        <div className="border border-slate-200 bg-white rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Wallet size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">Virtual Wallet</h2>
                            </div>
                            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                            <h1 className="text-[44px] font-black text-slate-900 tracking-tight leading-none mb-6">$12,450.00</h1>
                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-sm">Top Up</button>
                                <button className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors">Withdraw</button>
                            </div>
                        </div>

                        {/* Recent Activity Mini */}
                        <div className="border border-slate-200 bg-white rounded-3xl p-6 shadow-sm">
                            <h2 className="text-[15px] font-bold text-slate-900 mb-4">Recent Invoices</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center text-[13px] font-semibold">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><ArrowRightLeft size={14} /></div>
                                        <div>
                                            <p className="text-slate-900">Invoice #INV-204</p>
                                            <p className="text-[11px] text-slate-400">Sep 24</p>
                                        </div>
                                    </div>
                                    <span className="text-red-500">-$4,200</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px] font-semibold">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><ArrowRightLeft size={14} /></div>
                                        <div>
                                            <p className="text-slate-900">Wallet Top Up</p>
                                            <p className="text-[11px] text-slate-400">Sep 20</p>
                                        </div>
                                    </div>
                                    <span className="text-emerald-500">+$15,000</span>
                                </div>
                            </div>
                            <button className="w-full text-center text-[13px] font-bold text-blue-600 mt-6 hover:text-blue-700">View All Invoices</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
