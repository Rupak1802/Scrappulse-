import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Building2, Wrench, ArrowLeft, Mail, Lock } from 'lucide-react';
import { useAppStore } from '../../store';

type Role = 'collector' | 'recycler' | 'maker';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppStore();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    // Simulate authentication
    login(selectedRole);
    if (selectedRole === 'collector') navigate('/collector');
    if (selectedRole === 'recycler') navigate('/dashboard');
    if (selectedRole === 'maker') navigate('/marketplace');
  };

  const roleConfig = {
    collector: {
      title: 'Collector Portal',
      subtitle: 'Manage sales & pick-ups',
      icon: User,
      color: 'teal',
      bgClass: 'bg-teal/20 text-teal',
      activeBgClass: 'bg-teal text-white',
      btnClass: 'bg-teal hover:bg-teal/90 text-white'
    },
    recycler: {
      title: 'Recycler Dashboard',
      subtitle: 'Monitor fleet & inventory',
      icon: Building2,
      color: 'blue-500',
      bgClass: 'bg-blue-500/20 text-blue-500',
      activeBgClass: 'bg-blue-500 text-white',
      btnClass: 'bg-blue-500 hover:bg-blue-500/90 text-white'
    },
    maker: {
      title: 'Maker / Second Life',
      subtitle: 'Buy parts & build projects',
      icon: Wrench,
      color: 'amber-500',
      bgClass: 'bg-amber-500/20 text-amber-500',
      activeBgClass: 'bg-amber-500 text-white',
      btnClass: 'bg-amber-500 hover:bg-amber-500/90 text-white'
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden font-sans p-4">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="flex justify-center mb-6">
           <img src="/logo.png" alt="Relectron" className="w-24 h-24 object-contain" />
        </div>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div 
              key="role-selection"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Relectron</h1>
                <p className="text-neutral-400 font-medium text-sm">Select your role to continue</p>
              </div>

              <div className="space-y-4">
                {(Object.keys(roleConfig) as Role[]).map((role) => {
                  const config = roleConfig[role];
                  const Icon = config.icon;
                  return (
                    <button 
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className="w-full group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${config.bgClass} group-hover:${config.activeBgClass.split(' ').join(' group-hover:')}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-white text-sm">{config.title}</div>
                        <div className="text-xs text-neutral-400">{config.subtitle}</div>
                      </div>
                      <LogIn className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="login-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                onClick={() => setSelectedRole(null)}
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Back to roles
              </button>

              <div className="text-center mb-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${roleConfig[selectedRole].bgClass}`}>
                  {(() => {
                    const Icon = roleConfig[selectedRole].icon;
                    return <Icon className="w-6 h-6" />;
                  })()}
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">{roleConfig[selectedRole].title}</h1>
                <p className="text-neutral-400 text-sm">Sign in with your email</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`hello@${selectedRole}.com`}
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-400 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-white/10 bg-black/20 text-teal focus:ring-0 focus:ring-offset-0" />
                    <span className="text-xs text-neutral-400">Remember me</span>
                  </label>
                  <a href="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Forgot password?</a>
                </div>

                <button 
                  type="submit"
                  className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${roleConfig[selectedRole].btnClass}`}
                >
                  <LogIn className="w-5 h-5" /> Sign In
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <p className="mt-8 text-xs text-neutral-600">Relectron &copy; {new Date().getFullYear()}</p>
    </div>
  );
}
