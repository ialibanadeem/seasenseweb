'use client';

import React from 'react';
import { Clock } from 'lucide-react';

const PENDING_DATA = [
    { id: 'ORD-2344', item: 'Steel Rebar', customer: 'ConstructIt', date: 'Oct 05, 2025', by: 'System' },
];

export default function TrackPendingPage() {
    return (
        <div className="flex w-full h-full p-8 gap-8 bg-[#fafbfc]">
            <div className="flex-1 flex flex-col max-w-[1000px] w-full mx-auto">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Pending Shipments</h1>
                        <p className="text-[15px] font-medium text-slate-500 mt-2">Log of all orders waiting to be processed and shipped.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl flex flex-col border border-slate-200 shadow-sm flex-1">
                    <div className="px-6 py-4">
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-amber-50/50 rounded-xl mb-3 text-[13px] font-bold text-amber-600 border border-amber-100/50">
                            <div className="col-span-3">Order ID</div>
                            <div className="col-span-3">Item Name</div>
                            <div className="col-span-2">Customer</div>
                            <div className="col-span-2">Order Date</div>
                            <div className="col-span-2">Held By</div>
                        </div>

                        <div className="flex flex-col gap-1">
                            {PENDING_DATA.map(order => (
                                <div key={order.id} className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-50 items-center text-[13px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors rounded-xl">
                                    <div className="col-span-3 flex items-center gap-2">
                                        <Clock size={16} className="text-amber-500" />
                                        <span>{order.id}</span>
                                    </div>
                                    <div className="col-span-3">{order.item}</div>
                                    <div className="col-span-2 text-slate-600">{order.customer}</div>
                                    <div className="col-span-2 text-slate-500">{order.date}</div>
                                    <div className="col-span-2">
                                        <span className="px-2.5 py-1 bg-slate-100 rounded-md font-bold text-slate-600 border border-slate-200">{order.by}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
