import { useState } from 'react';
import { usePosts } from '../../mocks/communityPosts';
import { useIdeas } from '../../mocks/projectIdeas';
import { useListings } from '../../mocks/listings';
import { MessageSquare, Heart, Share2, Filter, Zap, LayoutGrid, Hash, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CHANNELS = ['#all-posts', '#motors-and-mechanics', '#displays', '#audio-projects', '#boards-and-code', '#beginner-builds', '#show-and-tell'];

export default function CommunityFeed() {
  const allPosts = usePosts();
  const ideas = useIdeas();
  const listings = useListings();

  const [activeChannel, setActiveChannel] = useState('#all-posts');
  const filtered = activeChannel === '#all-posts' ? allPosts : allPosts.filter(p => p.channel === activeChannel);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-7xl mx-auto">
      
      {/* Mobile Channel Selector */}
      <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {CHANNELS.map(c => (
           <button key={c} onClick={() => setActiveChannel(c)} className={cn("px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold border", activeChannel === c ? "bg-navy text-white border-navy" : "bg-white border-border text-neutral-600")}>{c}</button>
        ))}
      </div>

      {/* Main Feed */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Composer Trigger */}
        <div className="bg-white border border-border rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden shrink-0"><img src="https://i.pravatar.cc/150?u=maker" /></div>
          <Link to="/community/new" className="flex-1 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-full px-4 py-3 text-neutral-500 font-medium text-sm text-left">
             What did you build today?
          </Link>
          <Link to="/community/new" className="p-3 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors"><Camera className="w-5 h-5" /></Link>
        </div>

        <div className="flex items-center justify-between">
           <h1 className="text-2xl font-black text-neutral-900">{activeChannel === '#all-posts' ? 'Latest Builds' : activeChannel}</h1>
           <div className="flex items-center gap-2 text-sm font-bold text-neutral-500">
             <Filter className="w-4 h-4" /> <span>Sort: Trending</span>
           </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="flex flex-col gap-6">
              {filtered.map(post => {
                const idea = post.linkedIdeaId ? ideas.find(i => i.id === post.linkedIdeaId) : null;
                const listing = post.linkedListingId ? listings.find(l => l.id === post.linkedListingId) : null;
                
                return (
                  <motion.div key={post.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    
                    {/* Header */}
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden shrink-0"><img src={`https://i.pravatar.cc/150?u=${post.authorId}`} /></div>
                      <div>
                        <p className="font-bold text-sm text-neutral-900">{post.authorName}</p>
                        <p className="text-xs font-semibold text-neutral-500">{post.channel} • {new Date(post.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-2">
                       <Link to={`/community/post/${post.id}`}>
                         <h2 className="text-xl font-bold text-neutral-900 mb-2 hover:text-teal transition-colors">{post.title}</h2>
                       </Link>
                       <p className="text-sm text-neutral-600 line-clamp-3 mb-4">{post.body}</p>
                       
                       {/* Tags / Links */}
                       <div className="flex flex-wrap gap-2 mb-4">
                          {idea && (
                            <Link to={`/lens/idea/${idea.id}`} className={cn(
                              "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1",
                              idea.noveltyTag === 'existing' ? "bg-teal/10 text-teal border border-teal/20" : "bg-gradient-to-r from-amber-400 to-teal text-white shadow-sm"
                            )}>
                              {idea.noveltyTag === 'existing' ? "Existing Idea" : "Novel Remix ✨"}
                            </Link>
                          )}
                          {listing && (
                            <Link to={`/marketplace/listing/${listing.id}`} className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2 py-1 rounded border border-border hover:bg-neutral-200 transition-colors flex items-center gap-1">
                              Built with: {listing.componentType}
                            </Link>
                          )}
                       </div>
                    </div>

                    {/* Images */}
                    <Link to={`/community/post/${post.id}`} className="w-full bg-neutral-100 aspect-[16/9] lg:aspect-[21/9] block overflow-hidden border-y border-border relative group">
                       <img src={post.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       {post.images.length > 1 && <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded">+{post.images.length - 1} more</div>}
                    </Link>

                    {/* Actions */}
                    <div className="p-2 px-4 flex items-center gap-6 border-t border-border bg-neutral-50/50">
                       <button className="flex items-center gap-2 text-neutral-500 hover:text-red-500 transition-colors group p-2">
                         <Heart className="w-5 h-5 group-hover:fill-red-500" /> <span className="font-bold text-sm">{post.likes}</span>
                       </button>
                       <Link to={`/community/post/${post.id}`} className="flex items-center gap-2 text-neutral-500 hover:text-teal transition-colors group p-2">
                         <MessageSquare className="w-5 h-5 group-hover:fill-teal" /> <span className="font-bold text-sm">{post.commentCount}</span>
                       </Link>
                       <button className="flex items-center gap-2 text-neutral-500 hover:text-blue-500 transition-colors group p-2 ml-auto">
                         <Share2 className="w-5 h-5" />
                       </button>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
             <div className="py-20 text-center">
               <Hash className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-neutral-900 mb-2">No posts yet</h3>
               <p className="text-neutral-500">Be the first to post a build in {activeChannel}!</p>
             </div>
          )}
        </AnimatePresence>

      </div>

      {/* Right Rail (Desktop Channels & Top Builders) */}
      <div className="hidden lg:flex w-80 flex-col gap-6 shrink-0">
        
        {/* Desktop Channels */}
        <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden p-4">
           <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 pl-3">Channels</h3>
           <nav className="flex flex-col gap-1">
             {CHANNELS.map(c => (
               <button key={c} onClick={() => setActiveChannel(c)} className={cn("text-left px-3 py-2 rounded-lg font-bold text-sm transition-colors", activeChannel === c ? "bg-navy text-white" : "text-neutral-600 hover:bg-neutral-100")}>
                 {c}
               </button>
             ))}
           </nav>
        </div>

        {/* Promo Card */}
        <div className="bg-gradient-to-br from-teal to-green-600 rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
           <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
           <Camera className="w-8 h-8 mb-4 opacity-80" />
           <h3 className="text-lg font-black leading-tight mb-2">Got spare parts lying around?</h3>
           <p className="text-sm font-medium text-white/80 mb-6">Scan them with Lens to instantly get project ideas you can build today.</p>
           <Link to="/lens" className="w-full bg-white text-teal hover:bg-neutral-50 font-bold py-3 rounded-xl flex items-center justify-center transition-colors shadow-sm">Open Lens</Link>
        </div>

        {/* Top Builders */}
        <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
           <div className="p-4 border-b border-border bg-neutral-50">
             <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Top Builders This Week</h3>
           </div>
           <div className="p-2 flex flex-col gap-1">
             {[
               {name: 'Arjun Maker', count: 5},
               {name: 'Priya Tech', count: 3},
               {name: 'Suresh DIY', count: 2}
             ].map((u, i) => (
               <div key={i} className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer transition-colors">
                 <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden"><img src={`https://i.pravatar.cc/150?u=${u.name}`} /></div>
                 <div className="flex-1">
                   <p className="font-bold text-sm text-neutral-900">{u.name}</p>
                 </div>
                 <span className="text-xs font-bold text-neutral-500">{u.count} posts</span>
               </div>
             ))}
           </div>
        </div>

      </div>

    </div>
  );
}