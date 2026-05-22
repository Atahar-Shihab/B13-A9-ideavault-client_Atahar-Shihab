"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PrivateGuard from "@/components/PrivateGuard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSession } from "@/lib/auth-client";

const categoryGradients = {
  Tech:      "from-blue-500 to-cyan-500",
  Health:    "from-green-500 to-emerald-500",
  AI:        "from-purple-500 to-violet-500",
  Education: "from-amber-500 to-orange-500",
  Finance:   "from-rose-500 to-pink-500",
  Other:     "from-gray-500 to-slate-500",
};

function Content({ id }) {
  const { data: session } = useSession();
  const user = session?.user;
  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/ideas/${id}`),
      axios.get(`/api/comments/${id}`),
      axios.get(`/api/bookmarks/check`).catch(() => ({ data: [] })),
    ])
      .then(([ideaRes, commentsRes, bmRes]) => {
        setIdea(ideaRes.data);
        setComments(commentsRes.data);
        setBookmarked((bmRes.data || []).includes(id));
      })
      .catch(() => toast.error("Failed to load idea"))
      .finally(() => setLoading(false));
  }, [id]);

  const liked = idea?.likes?.includes(user?.email) || false;
  const likeCount = idea?.likes?.length || 0;

  const handleToggleLike = async () => {
    if (!user) return toast.error("Please log in to like");
    setIdea((prev) => ({
      ...prev,
      likes: liked ? prev.likes.filter((e) => e !== user.email) : [...(prev.likes || []), user.email],
    }));
    try {
      await axios.post(`/api/ideas/${id}/like`);
    } catch {
      toast.error("Failed to update like");
    }
  };

  const handleToggleBookmark = async () => {
    try {
      const res = await axios.post("/api/bookmarks", { ideaId: id });
      setBookmarked(res.data.bookmarked);
      toast.success(res.data.bookmarked ? "Bookmarked!" : "Removed from bookmarks");
    } catch {
      toast.error("Failed to update bookmark");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      await axios.post("/api/comments", { ideaId: id, text: newComment.trim() });
      const res = await axios.get(`/api/comments/${id}`);
      setComments(res.data);
      setNewComment("");
      toast.success("Comment added");
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/edit/${commentId}`);
      setComments((p) => p.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch { toast.error("Failed to delete"); }
  };

  const handleEditSave = async (commentId) => {
    if (!editText.trim()) return;
    try {
      await axios.put(`/api/comments/edit/${commentId}`, { text: editText.trim() });
      setComments((p) => p.map((c) => c._id === commentId ? { ...c, text: editText.trim() } : c));
      setEditingId(null);
      toast.success("Comment updated");
    } catch { toast.error("Failed to update"); }
  };

  if (loading) return <LoadingSpinner />;
  if (!idea) return <div className="text-center py-24 text-xl">Idea not found</div>;

  const gradient = categoryGradients[idea.category] || categoryGradients.Other;

  return (
    <>
      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${gradient} text-white overflow-hidden`}>
        {idea.imageURL && (
          <>
            <img src={idea.imageURL} alt={idea.title} className="absolute inset-0 w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          </>
        )}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-blob animation-delay-400" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
              {idea.category}
            </span>
            {idea.tags?.map((t) => (
              <span key={t} className="bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
                #{t}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{idea.title}</h1>
          <p className="text-white/85 text-lg leading-relaxed max-w-2xl mb-6">{idea.shortDescription}</p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
              <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-sm font-bold overflow-hidden">
                {idea.authorPhotoURL ? <img src={idea.authorPhotoURL} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" /> : idea.authorName?.[0]?.toUpperCase()}
              </div>
              <div className="text-sm">
                <div className="font-semibold">{idea.authorName}</div>
                <div className="text-white/70 text-xs">{new Date(idea.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
              </div>
            </div>

            <button onClick={handleToggleLike}
              className={`flex items-center gap-2 backdrop-blur-md rounded-2xl px-4 py-3 border text-sm font-semibold transition-all hover:scale-105 ${
                liked ? "bg-rose-500/40 border-rose-300/60 shadow-lg shadow-rose-500/30" : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}>
              <span className="text-lg">{liked ? "❤️" : "🤍"}</span>
              <span>{likeCount}</span>
            </button>

            <button onClick={handleToggleBookmark}
              className={`flex items-center gap-2 backdrop-blur-md rounded-2xl px-4 py-3 border text-sm font-semibold transition-all hover:scale-105 ${
                bookmarked ? "bg-amber-500/40 border-amber-300/60 shadow-lg shadow-amber-500/30" : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}>
              <span className="text-lg">{bookmarked ? "🔖" : "📑"}</span>
              <span>{bookmarked ? "Saved" : "Save"}</span>
            </button>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20 text-sm">
              <span className="text-lg">💬</span>
              <span className="font-semibold">{comments.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 -mt-16 relative z-20">
          <div className="bg-base-100 rounded-2xl p-5 border border-base-200 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">🎯</div>
              <div>
                <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Target Audience</div>
                <div className="font-semibold mt-0.5">{idea.targetAudience}</div>
              </div>
            </div>
          </div>
          <div className="bg-base-100 rounded-2xl p-5 border border-base-200 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-xl">💰</div>
              <div>
                <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Estimated Budget</div>
                <div className="font-semibold mt-0.5">{idea.estimatedBudget || "Not specified"}</div>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
            <span className="w-1 h-7 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
            About this Idea
          </h2>
          <p className="text-base-content/70 leading-relaxed whitespace-pre-wrap">{idea.detailedDescription}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 rounded-2xl p-6 border border-rose-200 dark:border-rose-800/50 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white text-lg shadow-md">⚠️</div>
              <h3 className="font-bold text-lg text-rose-700 dark:text-rose-200">The Problem</h3>
            </div>
            <p className="text-sm text-base-content/80 dark:text-base-content/90 leading-relaxed">{idea.problemStatement}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-lg shadow-md">💡</div>
              <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-200">The Solution</h3>
            </div>
            <p className="text-sm text-base-content/80 dark:text-base-content/90 leading-relaxed">{idea.proposedSolution}</p>
          </div>
        </div>

        {/* Comments */}
        <section className="bg-base-100 rounded-3xl border border-base-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Discussion
            <span className="text-base-content/40 font-normal text-lg">({comments.length})</span>
          </h2>

          <form onSubmit={handleAddComment} className="mb-8">
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 shrink-0">
                {(user?.photoURL || user?.image) ? (
                  <img src={user.photoURL || user.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 flex gap-2">
                <input value={newComment} onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts on this idea..."
                  className="input input-bordered rounded-xl flex-1 focus:input-primary" />
                <button type="submit" disabled={submitting || !newComment.trim()} className="btn btn-primary rounded-xl px-6">
                  {submitting ? <span className="loading loading-spinner loading-sm" /> : "Post"}
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c._id} className="flex gap-3 items-start group">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  {c.userPhotoURL ? (
                    <img src={c.userPhotoURL} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                      {c.userName?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-base-200 rounded-2xl p-4">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <div>
                      <span className="font-bold text-sm">{c.userName}</span>
                      <span className="text-xs text-base-content/40 ml-2">
                        {new Date(c.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    {user?.email === c.userEmail && editingId !== c._id && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="btn btn-ghost btn-xs rounded-lg" onClick={() => { setEditingId(c._id); setEditText(c.text); }}>✏️</button>
                        <button className="btn btn-ghost btn-xs rounded-lg text-error hover:bg-error/10" onClick={() => handleDeleteComment(c._id)}>🗑️</button>
                      </div>
                    )}
                  </div>
                  {editingId === c._id ? (
                    <div className="flex gap-2 mt-2">
                      <input value={editText} onChange={(e) => setEditText(e.target.value)} className="input input-bordered input-sm rounded-lg flex-1" autoFocus />
                      <button className="btn btn-success btn-sm rounded-lg" onClick={() => handleEditSave(c._id)}>Save</button>
                      <button className="btn btn-ghost btn-sm rounded-lg" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <p className="text-sm text-base-content/80 leading-relaxed">{c.text}</p>
                  )}
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">💭</div>
                <p className="text-base-content/40">No comments yet. Be the first to start the discussion!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default function IdeaDetailsClient({ id }) {
  return (
    <PrivateGuard>
      <Content id={id} />
    </PrivateGuard>
  );
}
