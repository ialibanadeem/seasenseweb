"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShieldAlert, ArrowRight, ShieldQuestion, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/lib/api-client';
import { emailSchema } from '@/lib/validators';
import { useRouter } from 'next/navigation';

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setAuthError(null);
      await apiClient.post('/auth/forgot-password', data);
      setIsSubmitted(true);
    } catch (error) {
      setAuthError('Failed to dispatch recovery signal. Try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        <div className="p-6 sm:p-8 pb-6 bg-slate-800 text-white flex flex-col items-center">
            <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                <ShieldQuestion className="h-8 w-8 text-rose-400 drop-shadow-md" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
            <p className="text-slate-300 mt-2 text-sm text-center">Get back into your account</p>
        </div>

        <div className="p-6 sm:p-8 pt-6">
            {isSubmitted ? (
                <div className="text-center py-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Check your email</h2>
                    <p className="text-sm text-slate-500 mb-8 px-4">
                        If an account exists for that email, we've sent a password recovery link. Please check your inbox and spam folder.
                    </p>
                    <Link 
                        href="/login" 
                        className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white py-3 px-8 rounded-xl font-medium transition-all shadow-lg shadow-slate-800/20"
                    >
                        Return to Login
                    </Link>
                </div>
            ) : (
                <>
                    <p className="text-sm font-medium text-slate-500 mb-6 font-ui">
                       Enter your email address and we'll send you a link to reset your password.
                    </p>

                    {authError && (
                        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-start text-sm border border-red-100">
                            <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
                            <span>{authError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <input
                                type="email"
                                {...register('email')}
                                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                                errors.email 
                                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/50' 
                                    : 'border-slate-200 focus:border-slate-400 focus:ring-slate-100 bg-slate-50 hover:bg-white'
                                }`}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full relative flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white py-3.5 px-4 rounded-xl font-medium shadow-lg shadow-slate-800/20 hover:shadow-slate-800/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                                ) : (
                                    <>
                                        <span>Send Reset Link</span>
                                        <ArrowRight className="h-5 w-5 absolute right-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <Link href="/login" className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm flex items-center justify-center gap-2">
                            <ArrowRight className="h-4 w-4 rotate-180"/>
                            Back to Login
                        </Link>
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
}
