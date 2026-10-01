import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

export default function Login() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Ambient background gradients matching DESIGN.md */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px]"></div>
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-violet-500/5 blur-[100px]"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Sign in to your CMS dashboard
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white/80 backdrop-blur-2xl py-8 px-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] border border-white/70 sm:rounded-2xl sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
