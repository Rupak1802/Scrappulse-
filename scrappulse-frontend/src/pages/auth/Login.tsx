import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Building2, Wrench } from 'lucide-react';
import { useAppStore } from '../../store';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppStore();

  const handleLogin = (role: 'collector' | 'recycler' | 'maker') => {
    login(role);
    if (role === 'collector') navigate('/collector');
    if (role === 'recycler') navigate('/dashboard');
    if (role === 'maker') navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden font-sans p-4">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-6">
           <img src="/logo.png" alt="Relectron" className="w-24 h-24 object-contain" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Relectron</h1>
          <p className="text-neutral-400 font-medium text-sm">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('collector')}
            className="w-full group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-white text-sm">Collector Portal</div>
              <div className="text-xs text-neutral-400">Manage sales & pick-ups</div>
            </div>
            <LogIn className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
          </button>

          <button 
            onClick={() => handleLogin('recycler')}
            className="w-full group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-white text-sm">Recycler Dashboard</div>
              <div className="text-xs text-neutral-400">Monitor fleet & inventory</div>
            </div>
            <LogIn className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
          </button>

          <button 
            onClick={() => handleLogin('maker')}
            className="w-full group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-white text-sm">Maker / Second Life</div>
              <div className="text-xs text-neutral-400">Buy parts & build projects</div>
            </div>
            <LogIn className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
          </button>
        </div>
      </motion.div>
      
      <p className="mt-8 text-xs text-neutral-600">Demo Application &bull; Select a role to continue</p>
    </div>
  );
}
