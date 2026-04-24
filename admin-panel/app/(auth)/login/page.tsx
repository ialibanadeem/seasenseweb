"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Anchor, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/lib/api-client';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [authError, setAuthError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setAuthError(null);
      const res = await apiClient.post('/auth/login', data);
      
      const { access_token, user } = res.data;
      if (access_token && user) {
        login(access_token, user);
        router.push('/');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
         const msg = error.response.data.message;
         setAuthError(Array.isArray(msg) ? msg[0] : msg);
      } else if (error.response?.status === 401) {
         setAuthError('Invalid email or password.');
      } else {
         setAuthError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
      {/* Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Block */}
        <div className="p-6 sm:p-8 pb-6 bg-indigo-600 text-white flex flex-col items-center">
            <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                <Anchor className="h-8 w-8 text-white drop-shadow-md" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">SeaSense AI</h1>
            <p className="text-indigo-100 mt-2 text-sm text-center">Fleet Management Dashboard</p>
        </div>

        {/* Form Block */}
        <div className="p-6 sm:p-8 pt-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 font-ui">Welcome Back</h2>

            {authError && (
                <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-start text-sm border border-red-100">
                    <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
                    <span>{authError}</span>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">Email address</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                        errors.email 
                            ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/50' 
                            : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 bg-slate-50 hover:bg-white'
                        }`}
                        placeholder="fleet@seasense.ai"
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                        <Link href="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
                        errors.password 
                            ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/50' 
                            : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 bg-slate-50 hover:bg-white'
                        }`}
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-4 rounded-xl font-medium shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                <span>Log In</span>
                                <ArrowRight className="h-5 w-5 absolute right-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-slate-500 text-sm">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline underline-offset-4">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
