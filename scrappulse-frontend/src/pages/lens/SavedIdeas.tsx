import { useIdeas } from '../../mocks/projectIdeas';
import { Bookmark, Clock, IndianRupee, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function SavedIdeas() {
  const ideas = useIdeas();

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col gap-6">
      
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-black text-neutral-900">Saved Ideas</h1>
          <p className="text-neutral-500 font-medium mt-1">Projects you've bookmarked from Lens scans or browsing.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ideas.map((idea, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={idea.id} className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
            
            <div className="absolute top-6 right-6 text-navy cursor-pointer"><Bookmark className="w-5 h-5 fill-navy" /></div>

            <div className="flex items-center gap-2 mb-4">
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                idea.noveltyTag === 'existing' ? "bg-teal/10 text-teal border border-teal/20" : "bg-gradient-to-r from-amber-400 to-teal text-white shadow-sm"
              )}>
                {idea.noveltyTag === 'existing' ? "Existing Idea" : "Novel Remix ✨"}
              </span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded">{idea.difficulty}</span>
            </div>
            
            <h2 className="text-xl font-bold text-neutral-900 mb-2 leading-tight pr-8">
              <Link to={`/lens/idea/${idea.id}`} className="hover:text-teal transition-colors">{idea.title}</Link>
            </h2>
            
            <p className="text-sm text-neutral-500 mb-6 flex-1">Uses salvaged: <span className="font-bold text-neutral-700">{idea.sourceComponentType}</span></p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex gap-4 text-xs font-semibold text-neutral-600">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-neutral-400" /> {idea.estimatedTimeMins}m</span>
                <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4 text-neutral-400" /> ₹{idea.estimatedCost}</span>
              </div>
              <Link to={`/lens/idea/${idea.id}`} className="px-4 py-2 bg-neutral-100 hover:bg-teal hover:text-white text-neutral-700 font-bold rounded-lg transition-colors text-sm">
                View Build
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}