"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShieldAlert, ArrowRight, Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/lib/api-client';
import { passwordSchema } from '@/lib/validators';

const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const otpFromUrl = searchParams.get('otp'); // Magic link interceptor
  
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!email || !otpFromUrl) {
      setAuthError('Authentication link broken or expired. Please request a new recovery link.');
      return;
    }
    
    try {
      setAuthError(null);
      await apiClient.post('/auth/reset-password', { 
          email, 
          otp: otpFromUrl, 
          newPassword: data.password 
      });
      
      setIsSuccess(true);
      setTimeout(() => {
          router.push('/login');
      }, 3000);

    } catch (error: any) {
      setAuthError(error.response?.data?.message || 'Invalid OTP code. Please try again.');
    }
  };

  if (!email || !otpFromUrl) {
      return (
        <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
             <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-12 text-center">
                 <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                     <ShieldAlert className="w-8 h-8" />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-800 mb-2">Invalid Reset Link</h2>
                 <p className="text-slate-500 mb-8">This password reset link is invalid or has expired. Please request a new one.</p>
                 <Link 
                    href="/forgot-password" 
                    className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white py-3 px-8 rounded-xl font-medium transition-all shadow-lg shadow-slate-800/20"
                 >
                    Request New Link
                 </Link>
             </div>
        </div>
      )
  }

  if (isSuccess) {
      return (
        <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
             <div className="w-full max-w-md bg-emerald-50 text-emerald-800 rounded-3xl shadow-xl overflow-hidden border border-emerald-100 p-12 text-center">
                 <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                     <Lock className="w-8 h-8" />
                 </div>
                 <h2 className="text-2xl font-bold mb-2">Password Reset Successful</h2>
                 <p className="text-emerald-600/80 mb-6">Your password has been securely updated.</p>
                 <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                     <Loader2 className="w-4 h-4 animate-spin"/> Taking you to login...
                 </div>
             </div>
        </div>
      )
  }

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-6 sm:p-8 pt-8 sm:pt-10 relative">
         <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center mb-6">
             <Lock className="w-6 h-6"/>
         </div>
         <h2 className="text-2xl font-bold text-slate-800 mb-2">Create New Password</h2>
         <p className="text-sm text-slate-500 mb-8">
             Please enter a new password for your account.
         </p>

         {authError && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-start text-left text-sm border border-red-100">
                <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
                <span>{authError}</span>
            </div>
         )}
         
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">New Password</label>
                 <input
                     type="password"
                     {...register('password')}
                     className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                        errors.password ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-slate-200 focus:border-indigo-400 bg-slate-50'
                     }`}
                     placeholder="••••••••"
                 />
                 {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Confirm New Password</label>
                 <input
                     type="password"
                     {...register('confirmPassword')}
                     className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                        errors.confirmPassword ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-slate-200 focus:border-indigo-400 bg-slate-50'
                     }`}
                     placeholder="••••••••"
                 />
                 {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>


            <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full mt-4 relative flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white py-3.5 px-4 rounded-xl font-medium shadow-lg shadow-slate-800/20 hover:shadow-slate-800/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
            >
                {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                        <span>Reset Password</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
         </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600"/></div>}>
            <ResetPasswordContent />
        </Suspense>
    )
}
