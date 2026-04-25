'use client';

import React, { useState } from 'react';
import { X, Ship, MapPin, Radio, Loader2, Info } from 'lucide-react';

interface AddVesselModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddVesselModal({ isOpen, onClose, onSuccess }: AddVesselModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        name: '',
        imo: '',
        mmsi: '',
        registrationNumber: '',
        type: 'FISHING',
        ownerName: '',
        contactNumber: '',
        homePort: '',
        operatingRegion: '',
        deviceId: '',
        simNumber: '',
        deviceStatus: 'ACTIVE'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            const response = await fetch(`${apiUrl}/vessels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add vessel');
            }

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Ship size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Add New Vessel</h2>
                            <p className="text-sm font-medium text-slate-500">Register a new vessel into the fleet tracking system.</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body (Scrollable Form) */}
                <div className="p-6 overflow-y-auto bg-slate-50/50">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold flex items-center gap-2">
                            <Info size={16} /> {error}
                        </div>
                    )}

                    <form id="add-vessel-form" onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* Section 1: Basic Information */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2 mb-4">
                                <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span> 
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Vessel Name <span className="text-rose-500">*</span></label>
                                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-medium" placeholder="e.g. Shaheen" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Vessel Type <span className="text-rose-500">*</span></label>
                                    <select required name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-medium cursor-pointer">
                                        <option value="FISHING">Fishing Vessel</option>
                                        <option value="CARGO">Cargo Ship</option>
                                        <option value="TANKER">Tanker</option>
                                        <option value="PASSENGER">Passenger</option>
                                        <option value="TUG">Tugboat</option>
                                        <option value="RECREATIONAL">Recreational</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">IMO Number <span className="text-rose-500">*</span></label>
                                    <input required name="imo" value={formData.imo} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-medium" placeholder="e.g. IMO1234567" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">MMSI Number <span className="text-rose-500">*</span></label>
                                    <input required name="mmsi" value={formData.mmsi} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-medium" placeholder="e.g. 412345678" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Registration Number</label>
                                    <input name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-medium" placeholder="Local registry ID" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Owner / Fisherman Name</label>
                                    <input name="ownerName" value={formData.ownerName} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-medium" placeholder="Full name" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Contact Number</label>
                                    <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-medium" placeholder="+92 300 1234567" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Location & Region */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2 mb-4">
                                <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs"><MapPin size={12}/></span> 
                                Location & Region
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Home Port / Harbor</label>
                                    <input name="homePort" value={formData.homePort} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 font-medium" placeholder="e.g. Karachi Port" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Operating Region</label>
                                    <input name="operatingRegion" value={formData.operatingRegion} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 font-medium" placeholder="e.g. Arabian Sea, Gwadar" />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Device & Tracking Setup */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2 mb-4">
                                <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center text-xs"><Radio size={12}/></span> 
                                Device & Tracking Setup
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Device ID (Hardware)</label>
                                    <input name="deviceId" value={formData.deviceId} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-purple-500 focus:border-purple-500 block p-2.5 font-medium" placeholder="e.g. TRK-9901A" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">SIM Number / ICCID</label>
                                    <input name="simNumber" value={formData.simNumber} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-purple-500 focus:border-purple-500 block p-2.5 font-medium" placeholder="e.g. 8992..." />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Device Status</label>
                                    <select name="deviceStatus" value={formData.deviceStatus} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-purple-500 focus:border-purple-500 block p-2.5 font-medium cursor-pointer">
                                        <option value="ACTIVE">Active (Tracking Enabled)</option>
                                        <option value="INACTIVE">Inactive (No Data Link)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-100 bg-white flex items-center justify-end gap-3">
                    <button 
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        form="add-vessel-form"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Vessel'}
                    </button>
                </div>
            </div>
        </div>
    );
}
