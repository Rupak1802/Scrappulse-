import { useState } from 'react';
import { Camera, Hash, Store, Lightbulb, X, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const CHANNELS = ['#all-posts', '#motors-and-mechanics', '#displays', '#audio-projects', '#boards-and-code', '#beginner-builds', '#show-and-tell'];

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [channel, setChannel] = useState('#show-and-tell');
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* Composer Form */}
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-black text-neutral-900">Post a Build</h1>
          <p className="text-neutral-500 font-medium mt-1">Share your project with the community.</p>
        </div>

        <div className="bg-white border border-border rounded-2xl shadow-sm p-6 lg:p-8 flex flex-col gap-6">
           
           <div>
             <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Photo</label>
             {image ? (
               <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border group">
                 <img src={image} className="w-full h-full object-cover" />
                 <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-black transition-colors"><X className="w-4 h-4" /></button>
               </div>
             ) : (
               <label htmlFor="post-image-upload" className="cursor-pointer w-full aspect-video rounded-xl border-2 border-dashed border-border hover:border-teal hover:bg-teal/5 transition-all flex flex-col items-center justify-center gap-3 text-neutral-500 hover:text-teal group">
                 <div className="w-16 h-16 rounded-full bg-neutral-100 group-hover:bg-teal/10 flex items-center justify-center transition-colors"><Camera className="w-8 h-8" /></div>
                 <span className="font-bold">Upload a photo of your build</span>
                 <input type="file" id="post-image-upload" accept="image/*" className="hidden" onChange={handleImageUpload} />
               </label>
             )}
           </div>

           <div>
             <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Project Title</label>
             <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Automated Pet Feeder" className="w-full bg-neutral-50 border border-border rounded-lg p-3 font-bold text-lg text-neutral-900 outline-none focus:border-teal placeholder:text-neutral-300" />
           </div>

           <div>
             <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Channel</label>
             <select value={channel} onChange={e=>setChannel(e.target.value)} className="w-full bg-neutral-50 border border-border rounded-lg p-3 font-bold text-neutral-900 outline-none focus:border-teal">
               {CHANNELS.filter(c=>c!=='#all-posts').map(c => <option key={c}>{c}</option>)}
             </select>
           </div>

           <div>
             <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Description & Steps</label>
             <textarea value={body} onChange={e=>setBody(e.target.value)} rows={6} placeholder="How did you build it? What challenges did you face?" className="w-full bg-neutral-50 border border-border rounded-lg p-3 text-neutral-900 outline-none focus:border-teal resize-y"></textarea>
           </div>

           <div className="border-t border-border pt-6 grid sm:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-border hover:border-teal hover:bg-teal/5 transition-colors text-left group">
                <Store className="w-5 h-5 text-neutral-400 group-hover:text-teal" />
                <div>
                  <p className="font-bold text-sm text-neutral-900 group-hover:text-teal">Link a Purchased Item</p>
                  <p className="text-[10px] font-semibold text-neutral-500">Show what you salvaged.</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-border hover:border-teal hover:bg-teal/5 transition-colors text-left group">
                <Lightbulb className="w-5 h-5 text-neutral-400 group-hover:text-teal" />
                <div>
                  <p className="font-bold text-sm text-neutral-900 group-hover:text-teal">Link a Project Idea</p>
                  <p className="text-[10px] font-semibold text-neutral-500">Did Lens suggest this?</p>
                </div>
              </button>
           </div>
           
           <div className="mt-4 flex gap-4">
             <Link to="/community" className="px-6 py-3 bg-white border border-border hover:bg-neutral-50 text-neutral-700 font-bold rounded-xl transition-colors">Cancel</Link>
             <Link to="/community" className="flex-1 px-6 py-3 bg-navy hover:bg-navy/90 text-white font-bold rounded-xl flex items-center justify-center transition-all shadow-md">Post to Community</Link>
           </div>
        </div>
      </div>

      {/* Live Preview Rail */}
      <div className="hidden lg:flex w-[400px] flex-col gap-4 shrink-0">
         <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Live Preview</h3>
         
         <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col pointer-events-none opacity-80 scale-95 origin-top">
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden shrink-0"><img src="https://i.pravatar.cc/150?u=maker" /></div>
              <div>
                <p className="font-bold text-sm text-neutral-900">You</p>
                <p className="text-xs font-semibold text-neutral-500">{channel} • Just now</p>
              </div>
            </div>

            <div className="px-4 pb-2">
               <h2 className="text-xl font-bold text-neutral-900 mb-2">{title || "Your Project Title"}</h2>
               <p className="text-sm text-neutral-600 line-clamp-3 mb-4 break-words">{body || "Your project description will appear here..."}</p>
            </div>

            <div className="w-full bg-neutral-100 aspect-[16/9] flex items-center justify-center border-y border-border overflow-hidden">
               {image ? <img src={image} className="w-full h-full object-cover" /> : <ImageIcon className="w-12 h-12 text-neutral-300" />}
            </div>
         </div>
      </div>

    </div>
  );
}