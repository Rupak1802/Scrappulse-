import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../../mocks/communityPosts';
import { useIdeas } from '../../mocks/projectIdeas';
import { useListings } from '../../mocks/listings';
import { Heart, MessageSquare, Share2, CornerDownRight, ChevronRight, Store } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function PostDetail() {
  const { id = 'P-201' } = useParams();
  const posts = usePosts();
  const ideas = useIdeas();
  const listings = useListings();

  const post = posts.find(p => p.id === id) || posts[0];
  const idea = post.linkedIdeaId ? ideas.find(i => i.id === post.linkedIdeaId) : null;
  const listing = post.linkedListingId ? listings.find(l => l.id === post.linkedListingId) : null;

  const [comment, setComment] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 flex flex-col gap-6">
      
      {/* Post Content */}
      <div className="bg-white border border-border rounded-3xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden shrink-0"><img src={`https://i.pravatar.cc/150?u=${post.authorId}`} /></div>
          <div>
            <h1 className="text-2xl font-black text-neutral-900 leading-tight mb-1">{post.title}</h1>
            <p className="font-semibold text-neutral-500 text-sm">By {post.authorName} in <span className="text-teal">{post.channel}</span> • {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="w-full bg-neutral-100 aspect-video relative border-y border-border">
          <img src={post.images[0]} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Body */}
        <div className="p-6 lg:p-8">
          <p className="text-neutral-700 leading-relaxed text-lg whitespace-pre-wrap">{post.body}</p>

          {/* Attachments */}
          {(idea || listing) && (
            <div className="mt-8 pt-6 border-t border-border grid sm:grid-cols-2 gap-4">
               {listing && (
                 <Link to={`/marketplace/listing/${listing.id}`} className="flex gap-4 p-4 rounded-xl border border-border hover:border-teal bg-neutral-50 hover:bg-white transition-all group">
                   <div className="w-16 h-16 bg-neutral-200 rounded-lg overflow-hidden shrink-0"><img src={listing.images[0]} className="w-full h-full object-cover" /></div>
                   <div className="flex-1 flex flex-col justify-center">
                     <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Store className="w-3 h-3" /> Built With</p>
                     <p className="text-sm font-bold text-neutral-900 group-hover:text-teal transition-colors line-clamp-1">{listing.title}</p>
                   </div>
                 </Link>
               )}
               {idea && (
                 <Link to={`/lens/idea/${idea.id}`} className="flex gap-4 p-4 rounded-xl border border-border hover:border-teal bg-neutral-50 hover:bg-white transition-all group">
                   <div className="flex-1 flex flex-col justify-center">
                     <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Inspired By Idea</p>
                     <p className="text-sm font-bold text-neutral-900 group-hover:text-teal transition-colors line-clamp-1">{idea.title}</p>
                     <div className="mt-2">
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                          idea.noveltyTag === 'existing' ? "bg-teal/10 text-teal border border-teal/20" : "bg-gradient-to-r from-amber-400 to-teal text-white shadow-sm"
                        )}>
                          {idea.noveltyTag === 'existing' ? "Existing Idea" : "Novel Remix ✨"}
                        </span>
                     </div>
                   </div>
                 </Link>
               )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 flex items-center gap-6 border-t border-border bg-neutral-50">
           <button className="flex items-center gap-2 text-neutral-500 hover:text-red-500 transition-colors group p-2">
             <Heart className="w-6 h-6 group-hover:fill-red-500" /> <span className="font-black text-lg">{post.likes}</span>
           </button>
           <button className="flex items-center gap-2 text-neutral-500 hover:text-blue-500 transition-colors group p-2 ml-auto">
             <Share2 className="w-6 h-6" /> <span className="font-bold text-sm hidden sm:inline">Share</span>
           </button>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white border border-border rounded-3xl shadow-sm overflow-hidden p-6 lg:p-8">
         <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-neutral-400" /> Comments ({post.commentCount})</h2>
         
         <div className="flex gap-4 mb-10">
           <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden shrink-0"><img src="https://i.pravatar.cc/150?u=maker" /></div>
           <div className="flex-1">
             <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={2} placeholder="Add a comment... Use @ to mention someone." className="w-full bg-neutral-50 border border-border rounded-xl p-3 text-sm text-neutral-900 outline-none focus:border-teal resize-none"></textarea>
             <div className="flex justify-end mt-2">
               <button disabled={!comment} className="px-5 py-2 bg-navy hover:bg-navy/90 disabled:opacity-50 text-white font-bold rounded-lg text-sm transition-colors">Post Comment</button>
             </div>
           </div>
         </div>

         <div className="space-y-6">
           {/* Mock Comment 1 */}
           <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden shrink-0"><img src="https://i.pravatar.cc/150?u=viewer1" /></div>
             <div>
               <div className="bg-neutral-50 border border-neutral-100 rounded-2xl rounded-tl-none p-4 mb-1">
                 <p className="font-bold text-sm text-neutral-900 mb-1">Suresh DIY <span className="font-normal text-xs text-neutral-500 ml-2">2h ago</span></p>
                 <p className="text-sm text-neutral-700 leading-relaxed">This is awesome! Did you use a standard motor driver for the Arduino, or wire it directly with a relay?</p>
               </div>
               <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 px-2">
                 <button className="hover:text-red-500 flex items-center gap-1"><Heart className="w-3 h-3" /> 12</button>
                 <button className="hover:text-neutral-900">Reply</button>
               </div>

               {/* Nested Reply */}
               <div className="flex gap-3 mt-4 ml-4">
                 <CornerDownRight className="w-5 h-5 text-neutral-300 shrink-0 mt-2" />
                 <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden shrink-0"><img src={`https://i.pravatar.cc/150?u=${post.authorId}`} /></div>
                 <div>
                   <div className="bg-teal/5 border border-teal/10 rounded-2xl rounded-tl-none p-3 mb-1">
                     <p className="font-bold text-sm text-neutral-900 mb-1">Arjun Maker <span className="font-black text-[9px] uppercase tracking-wider bg-teal text-white px-1.5 py-0.5 rounded ml-2">Author</span></p>
                     <p className="text-sm text-neutral-700 leading-relaxed">I used an L298N motor driver module! Relays were too noisy for this setup.</p>
                   </div>
                   <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 px-2">
                     <button className="hover:text-red-500 flex items-center gap-1"><Heart className="w-3 h-3" /> 5</button>
                     <button className="hover:text-neutral-900">Reply</button>
                   </div>
                 </div>
               </div>
             </div>
           </div>

         </div>
      </div>
      
    </div>
  );
}