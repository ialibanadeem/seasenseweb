'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { User, Lock, Building, Check, Loader2, Camera, Shield } from 'lucide-react';

export default function SettingsPage() {
    const { profile, updateProfile, isLoading } = useUserStore();
    
    // Personal & Company State
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phoneNumber: '', companyName: '', billingAddress: '', avatar: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    // Multiple Saves State
    const [savingSection, setSavingSection] = useState<'personal' | 'company' | null>(null);
    const [savedSection, setSavedSection] = useState<'personal' | 'company' | null>(null);

    // Password State
    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState<{type: 'error' | 'success', msg: string} | null>(null);
    const [passwordStrength, setPasswordStrength] = useState({ length: false, upperLower: false, number: false, special: false });

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (profile) {
            setFormData({
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                email: profile.email || '',
                phoneNumber: profile.phoneNumber || '',
                companyName: profile.companyName || '',
                billingAddress: profile.billingAddress || '',
                avatar: profile.avatar || ''
            });
            setErrors({});
        }
    }, [profile]);

    useEffect(() => {
        const p = passwordForm.new;
        setPasswordStrength({
            length: p.length >= 8,
            upperLower: /[a-z]/.test(p) && /[A-Z]/.test(p),
            number: /\d/.test(p),
            special: /[@$!%*?&#]/.test(p)
        });
    }, [passwordForm.new]);

    const handleInput = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [key]: e.target.value }));
        if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 800 * 1024) {
            setErrors(prev => ({ ...prev, avatar: 'Image size must be less than 800KB' }));
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            setErrors(prev => ({ ...prev, avatar: '' }));
        };
        reader.readAsDataURL(file);
    };

    const handleSaveProfile = async (section: 'personal' | 'company') => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSavingSection(section);
        try {
            await updateProfile(formData);
            setSavedSection(section);
            setTimeout(() => setSavedSection(null), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setSavingSection(null);
        }
    };

    const handleChangePassword = async () => {
        if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
            setPasswordStatus({ type: 'error', msg: 'All password fields are required.' });
            return;
        }
        
        const isStrong = Object.values(passwordStrength).every(Boolean);
        if (!isStrong) {
            setPasswordStatus({ type: 'error', msg: 'Please meet all strong password requirements.' });
            return;
        }

        if (passwordForm.new !== passwordForm.confirm) {
            setPasswordStatus({ type: 'error', msg: 'New passwords do not match.' });
            return;
        }

        setIsSavingPassword(true);
        setPasswordStatus(null);
        try {
            const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
            const res = await fetch(`${apiURL}/users/change-password-direct`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword: passwordForm.current, newPassword: passwordForm.new })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to update password');
            }

            setPasswordStatus({ type: 'success', msg: 'Password successfully updated!' });
            setPasswordForm({ current: '', new: '', confirm: '' });
            setTimeout(() => setPasswordStatus(null), 4000);
        } catch (err: any) {
            setPasswordStatus({ type: 'error', msg: err.message });
        } finally {
            setIsSavingPassword(false);
        }
    };

    const initials = (formData.firstName?.[0] || '') + (formData.lastName?.[0] || '');

    if (isLoading && !profile) {
        return (
            <div className="flex-1 p-8 bg-slate-50 flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
            <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
                
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage your personal profile, company details, and security.</p>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Public Profile Card */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 pb-10">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                <User size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
                                <p className="text-[13px] text-slate-500 font-medium">Update your public identity and contact details.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 rounded-2xl bg-slate-900 text-slate-100 flex items-center justify-center font-bold text-3xl shrink-0 uppercase shadow-inner overflow-hidden relative group">
                                {formData.avatar ? (
                                    <img src={formData.avatar} className="w-full h-full object-cover" alt="Avatar popup" />
                                ) : (
                                    initials || '??'
                                )}
                                <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm">
                                    <Camera size={24} className="text-white" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input type="file" ref={fileInputRef} hidden accept="image/jpeg, image/png, image/gif" onChange={handleImageUpload} />
                                <button onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer w-fit shadow-sm">
                                    Upload new picture
                                </button>
                                <p className="text-[12px] text-slate-400 font-medium">JPG, GIF or PNG. Max size of 800K</p>
                                {errors.avatar && <p className="text-[12px] text-rose-500 font-bold">{errors.avatar}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-slate-700">First Name</label>
                                <input type="text" value={formData.firstName} onChange={handleInput('firstName')} className={`w-full h-12 px-4 rounded-xl border ${errors.firstName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50 hover:bg-white'} text-slate-800 text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm`} />
                                {errors.firstName && <span className="text-xs text-rose-500 font-bold -mt-1">{errors.firstName}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-slate-700">Last Name</label>
                                <input type="text" value={formData.lastName} onChange={handleInput('lastName')} className={`w-full h-12 px-4 rounded-xl border ${errors.lastName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50 hover:bg-white'} text-slate-800 text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm`} />
                                {errors.lastName && <span className="text-xs text-rose-500 font-bold -mt-1">{errors.lastName}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-slate-700">Email Address</label>
                                <input type="email" value={formData.email} onChange={handleInput('email')} className={`w-full h-12 px-4 rounded-xl border ${errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50 hover:bg-white'} text-slate-800 text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm`} />
                                {errors.email && <span className="text-xs text-rose-500 font-bold -mt-1">{errors.email}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-slate-700">Phone Number</label>
                                <input type="tel" value={formData.phoneNumber} onChange={handleInput('phoneNumber')} placeholder="+1 (555) 000-0000" className={`w-full h-12 px-4 rounded-xl border ${errors.phoneNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50 hover:bg-white'} text-slate-800 text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm placeholder:text-slate-300`} />
                            </div>
                            <div className="col-span-2 mt-4 flex items-center gap-4">
                                <button onClick={() => handleSaveProfile('personal')} disabled={savingSection === 'personal'} className="px-6 py-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 font-bold text-[14px] hover:bg-blue-100 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2">
                                    {savingSection === 'personal' ? <Loader2 size={18} className="animate-spin" /> : 'Save Personal Info'}
                                </button>
                                {savedSection === 'personal' && (
                                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-[13px] fade-in animate-in">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><Check size={14} /></div>
                                        Saved successfully
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Company Information Card */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 pb-10">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                <Building size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Company Details</h2>
                                <p className="text-[13px] text-slate-500 font-medium">Manage your organizational identity for invoices and reports.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2 col-span-2">
                                <label className="text-[13px] font-bold text-slate-700">Company Name</label>
                                <input type="text" value={formData.companyName} onChange={handleInput('companyName')} placeholder="Your Company Ltd." className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm placeholder:text-slate-300" />
                            </div>
                            <div className="flex flex-col gap-2 col-span-2">
                                <label className="text-[13px] font-bold text-slate-700">Billing Address</label>
                                <input type="text" value={formData.billingAddress} onChange={handleInput('billingAddress')} placeholder="123 Example Street, City, Country" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm placeholder:text-slate-300" />
                            </div>
                            <div className="col-span-2 mt-4 flex items-center gap-4">
                                <button onClick={() => handleSaveProfile('company')} disabled={savingSection === 'company'} className="px-6 py-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 font-bold text-[14px] hover:bg-blue-100 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2">
                                    {savingSection === 'company' ? <Loader2 size={18} className="animate-spin" /> : 'Save Company Details'}
                                </button>
                                {savedSection === 'company' && (
                                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-[13px] fade-in animate-in">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><Check size={14} /></div>
                                        Saved successfully
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 pb-10">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Security</h2>
                                <p className="text-[13px] text-slate-500 font-medium">Update your account password using strong credentials.</p>
                            </div>
                        </div>

                        {passwordStatus && (
                            <div className={`mb-6 p-4 rounded-xl border text-[13px] font-bold flex items-center gap-3 fade-in animate-in ${passwordStatus.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                                {passwordStatus.type === 'success' && <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><Check size={14} /></div>}
                                {passwordStatus.msg}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2 col-span-2">
                                <label className="text-[13px] font-bold text-slate-700">Current Password</label>
                                <input type="password" value={passwordForm.current} onChange={(e) => setPasswordForm(p => ({...p, current: e.target.value}))} placeholder="••••••••" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-slate-700">New Password</label>
                                <input type="password" value={passwordForm.new} onChange={(e) => setPasswordForm(p => ({...p, new: e.target.value}))} placeholder="••••••••" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" />
                                {passwordForm.new.length > 0 && (
                                    <div className="mt-2 flex flex-col gap-1.5 text-[12px] font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className={`flex items-center gap-2 transition-colors ${passwordStrength.length ? 'text-emerald-500' : 'text-slate-400'}`}>
                                            <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${passwordStrength.length ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}><Check size={10} className={passwordStrength.length ? 'opacity-100' : 'opacity-0'} /></div> Minimum 8 characters
                                        </div>
                                        <div className={`flex items-center gap-2 transition-colors ${passwordStrength.upperLower ? 'text-emerald-500' : 'text-slate-400'}`}>
                                            <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${passwordStrength.upperLower ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}><Check size={10} className={passwordStrength.upperLower ? 'opacity-100' : 'opacity-0'} /></div> Upper & lower case letters
                                        </div>
                                        <div className={`flex items-center gap-2 transition-colors ${passwordStrength.number ? 'text-emerald-500' : 'text-slate-400'}`}>
                                            <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${passwordStrength.number ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}><Check size={10} className={passwordStrength.number ? 'opacity-100' : 'opacity-0'} /></div> At least one number
                                        </div>
                                        <div className={`flex items-center gap-2 transition-colors ${passwordStrength.special ? 'text-emerald-500' : 'text-slate-400'}`}>
                                            <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${passwordStrength.special ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}><Check size={10} className={passwordStrength.special ? 'opacity-100' : 'opacity-0'} /></div> One special symbol (@$!%*?&#)
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-slate-700">Confirm New Password</label>
                                <input type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm(p => ({...p, confirm: e.target.value}))} placeholder="••••••••" className={`w-full h-12 px-4 rounded-xl border ${passwordForm.confirm && passwordForm.new !== passwordForm.confirm ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50 hover:bg-white'} text-slate-800 text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm`} />
                            </div>
                            <div className="col-span-2 mt-4">
                                <button onClick={handleChangePassword} disabled={isSavingPassword} className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-[14px] hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2">
                                    {isSavingPassword ? <Loader2 size={18} className="animate-spin" /> : 'Update Password'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
