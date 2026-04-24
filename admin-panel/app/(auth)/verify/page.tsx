"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShieldAlert, ArrowRight, CheckCircle, Mail, Loader2 } from 'lucide-react';
import apiClient from '@/lib/api-client';
import { useAuthStore } from '@/store/auth.store';

const verifySchema = z.object({
  otp: z.string().length(6, 'Please enter a valid 6-digit code'),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuthStore();
  const email = searchParams.get('email');
  
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: VerifyFormValues) => {
    if (!email) {
      setAuthError('Email identity lost. Please register or login again.');
      return;
    }
    
    try {
      setAuthError(null);
      await apiClient.post('/auth/verify-email', { email, otp: data.otp });
      
      // Successfully verified. Route them to login per user specifications
      setIsSuccess(true);
      setTimeout(() => {
          router.push('/login');
      }, 3000);
      
    } catch (error: any) {
      setAuthError(error.response?.data?.message || 'Invalid OTP code. Please try again.');
    }
  };

  if (isSuccess) {
      return (
        <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
             <div className="w-full max-w-md bg-emerald-50 text-emerald-800 rounded-3xl shadow-xl overflow-hidden border border-emerald-100 p-12 text-center">
                 <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                     <CheckCircle className="w-8 h-8" />
                 </div>
                 <h2 className="text-2xl font-bold mb-2">Email Verified</h2>
                 <p className="text-emerald-600/80 mb-6">Your email address has been successfully verified.</p>
                 <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                     <Loader2 className="w-4 h-4 animate-spin"/> Taking you to login...
                 </div>
             </div>
        </div>
      )
  }

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-6 sm:p-8 pt-8 sm:pt-10 text-center relative overflow-hidden">
         <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
             <Mail className="w-8 h-8"/>
         </div>
         <h2 className="text-2xl font-bold text-slate-800 mb-2">Check your email</h2>
         <p className="text-sm text-slate-500 mb-8 px-4">
             We sent a 6-digit verification code to <br/>
             <span className="font-semibold text-slate-700">{email || 'your email'}</span>.
         </p>

         {authError && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-start text-left text-sm border border-red-100">
                <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
                <span>{authError}</span>
            </div>
         )}
         
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                 <input
                     type="text"
                     maxLength={6}
                     {...register('otp')}
                     className={`w-full text-center tracking-[0.5em] font-mono text-2xl px-4 py-4 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                        errors.otp ? 'border-red-300 focus:border-red-400 bg-red-50/50 text-red-900' : 'border-slate-200 focus:border-blue-400 bg-slate-50 text-slate-900'
                     }`}
                     placeholder="••••••"
                 />
                 {errors.otp && <p className="mt-2 text-sm text-red-600">{errors.otp.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full relative flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-xl font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed group text-lg"
            >
                {isSubmitting ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                    <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Verify Code</span>
                    </>
                )}
            </button>
         </form>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600"/></div>}>
        <VerifyContent />
    </Suspense>
  )
}
