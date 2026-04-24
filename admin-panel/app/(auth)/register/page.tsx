"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShieldAlert, ArrowRight, Anchor, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/lib/api-client';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { emailSchema, passwordSchema } from '@/lib/validators';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [authError, setAuthError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setAuthError(null);
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...payload } = data;
      
      const res = await apiClient.post('/auth/signup', payload);
      
      if (res.data.status === 'success') {
          router.push(`/verify?email=${encodeURIComponent(payload.email)}`);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        // Handle specific array of messages if NestJS validation catches anything else
        const serverError = Array.isArray(error.response.data.message) 
            ? error.response.data.message[0] 
            : error.response.data.message;
        setAuthError(serverError);
      } else {
        setAuthError('An unexpected error occurred during registration.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Block */}
        <div className="px-5 sm:px-8 py-5 bg-indigo-600 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                    <Anchor className="h-5 w-5 text-indigo-200" />
                    <h1 className="text-xl font-bold tracking-tight">Welcome to SeaSense </h1>
                </div>
                <p className="text-indigo-100 text-[13px]">Create an account to access the dashboard.</p>
            </div>
        </div>

        {/* Form Block */}
        <div className="px-5 sm:px-8 py-5">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 font-ui">Create Account</h2>

            {authError && (
                <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-start text-sm border border-red-100">
                    <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
                    <span>{authError}</span>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[13px] font-medium text-slate-700 mb-1">First Name</label>
                        <input
                            {...register('firstName')}
                            className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                            errors.firstName ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-slate-200 focus:border-indigo-400 bg-slate-50'}`}
                            placeholder="John"
                        />
                        {errors.firstName && <p className="mt-1.5 text-xs text-red-600">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-slate-700 mb-1">Last Name</label>
                        <input
                            {...register('lastName')}
                            className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                            errors.lastName ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-slate-200 focus:border-indigo-400 bg-slate-50'}`}
                            placeholder="Doe"
                        />
                        {errors.lastName && <p className="mt-1.5 text-xs text-red-600">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-1">Corporate Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                        errors.email ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-slate-200 focus:border-indigo-400 bg-slate-50'}`}
                        placeholder="john.doe@company.com"
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-1">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                        errors.password ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-slate-200 focus:border-indigo-400 bg-slate-50'}`}
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                        errors.confirmPassword ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-slate-200 focus:border-indigo-400 bg-slate-50'}`}
                        placeholder="••••••••"
                    />
                    {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                {/* Requirements indicator snippet visually */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-2">
                     <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Password Requirements</p>
                     <ul className="text-xs text-slate-600 space-y-1.5">
                         <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500"/> Use a valid email address</li>
                         <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500"/> At least 8 characters, 1 uppercase, 1 symbol</li>
                     </ul>
                </div>

                <div className="pt-1">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed group text-sm"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <span>Complete Registration</span>
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-slate-500 text-[13px]">
                    Already have an account?{' '}
                    <Link href="/login" className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline underline-offset-4">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
