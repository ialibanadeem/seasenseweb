'use client';

import React, { useState } from 'react';
import { Filter, Search, ChevronDown, Check, Box } from 'lucide-react';

const MOCK_ORDERS: any[] = [];

export default function OrdersPage() {
    const [selected, setSelected] = useState<string[]>([]);
    const [filter, setFilter] = useState('All');

    const toggleSelect = (id: string) => {
        setSelected(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredOrders = filter === 'All' ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === filter);

    return (
        <div className="flex w-full h-full p-8 gap-8 bg-[#fafbfc]">
            <div className="flex-1 flex flex-col max-w-[1200px] w-full mx-auto px-4 md:px-0">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Order Management</h1>
                        <p className="text-[15px] font-medium text-slate-500 mt-2">View and process all customer orders.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-[14px] font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                            <Filter size={16} /> Filter
                        </button>
                        <button className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[14px] font-bold hover:bg-slate-800 transition-colors shadow-sm">
                            + Create Order
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl flex flex-col border border-slate-200 shadow-sm flex-1">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
                        <div className="flex gap-6">
                            {['All', 'Scheduled', 'On The Way', 'Delivered', 'Pending', 'Canceled'].map(status => (
                                <button 
                                    key={status} 
                                    onClick={() => setFilter(status)}
                                    className={`text-[14px] font-bold pb-4 -mb-6 border-b-2 transition-colors ${
                                        filter === status ? 'text-slate-900 border-slate-900' : 'text-slate-400 border-transparent hover:text-slate-600'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        <div className="bg-slate-50/50 rounded-lg flex items-center px-4 h-10 border border-slate-200 shadow-sm w-[280px]">
                            <Search className="text-slate-400 mr-2" size={16} />
                            <input type="text" placeholder="Search orders..." className="bg-transparent outline-none text-[13px] text-slate-600 w-full placeholder-slate-400 font-medium" />
                        </div>
                    </div>

                    <div className="px-6 py-4">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50/80 rounded-xl mb-3 text-[13px] font-bold text-slate-500">
                            <div className="col-span-2 flex items-center gap-3">
                                <div onClick={() => setSelected(filteredOrders.length === selected.length ? [] : filteredOrders.map(o => o.id))} className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer ${selected.length === filteredOrders.length && filteredOrders.length > 0 ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white'}`}>
                                    {selected.length > 0 && <Check size={12} strokeWidth={3} />}
                                </div>
                                Order ID <ChevronDown size={14} className="ml-1" />
                            </div>
                            <div className="col-span-3">Item Name</div>
                            <div className="col-span-2">Customer</div>
                            <div className="col-span-1">Amount</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2">Status</div>
                        </div>

                        {/* Table Rows */}
                        <div className="flex flex-col gap-1">
                            {filteredOrders.map(order => {
                                const isChecked = selected.includes(order.id);
                                let statusClass = 'text-blue-500';
                                if (order.status === 'Scheduled') statusClass = 'text-emerald-600';
                                if (order.status === 'Delivered') statusClass = 'text-purple-600';
                                if (order.status === 'Pending') statusClass = 'text-amber-500';
                                if (order.status === 'Canceled') statusClass = 'text-red-500';

                                return (
                                    <div key={order.id} className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-50 items-center text-[13px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors rounded-xl">
                                        <div className="col-span-2 flex items-center gap-3">
                                            <div onClick={() => toggleSelect(order.id)} className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${isChecked ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white'}`}>
                                                {isChecked && <Check size={12} strokeWidth={3} />}
                                            </div>
                                            <span>{order.id}</span>
                                        </div>
                                        <div className="col-span-3 flex flex-col">
                                            <span>{order.item}</span>
                                            <span className="text-[11px] text-slate-400 font-medium">{order.qty}</span>
                                        </div>
                                        <div className="col-span-2 text-slate-600">{order.customer}</div>
                                        <div className="col-span-1 text-slate-900 font-bold">{order.amount}</div>
                                        <div className="col-span-2 text-slate-500">{order.date}</div>
                                        <div className="col-span-2">
                                            <span className={`flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-full w-max ${statusClass} bg-opacity-10`} style={{ backgroundColor: `color-mix(in srgb, currentColor 10%, transparent)` }}>
                                                <Box size={14} />
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            
                            {filteredOrders.length === 0 && (
                                <div className="py-12 text-center text-slate-400 font-medium">No orders found matching the filter.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
