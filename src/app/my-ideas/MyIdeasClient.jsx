"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import PrivateGuard from "@/components/PrivateGuard";
import LoadingSpinner from "@/components/LoadingSpinner";

const CATEGORIES = ["Tech", "Health", "AI", "Education", "Finance", "Other"];

const categoryColor = {
  Tech: "from-blue-500 to-cyan-500", Health: "from-green-500 to-emerald-500",
  AI: "from-purple-500 to-violet-500", Education: "from-amber-500 to-orange-500",
  Finance: "from-rose-500 to-pink-500", Other: "from-gray-500 to-slate-500",
};

function Content() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const load = () => {
    axios.get("/api/ideas/my")
      .then((res) => setIdeas(res.data))
      .catch(() => toast.error("Failed to load your ideas"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/ideas/${deleteTarget._id}`);
      setIdeas((p) => p.filter((i) => i._id !== deleteTarget._id));
      toast.success("Idea deleted");
    } catch { toast.error("Failed to delete"); }
    setDeleteTarget(null);
  };

  const openEdit = (idea) => {
    setEditTarget(idea);
    setEditForm({
      title: idea.title, shortDescription: idea.shortDescription,
      detailedDescription: idea.detailedDescription, category: idea.category,
      tags: (idea.tags || []).join(", "), imageURL: idea.imageURL || "",
      estimatedBudget: idea.estimatedBudget || "", targetAudience: idea.targetAudience,
      problemStatement: idea.problemStatement, proposedSolution: idea.proposedSolution,
    });
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      const payload = { ...editForm, tags: editForm.tags ? editForm.tags.split(",").map((t) => t.trim()).filter(Boolean) : [] };
      await axios.put(`/api/ideas/${editTarget._id}`, payload);
      setIdeas((p) => p.map((i) => i._id === editTarget._id ? { ...i, ...payload } : i));
      setEditTarget(null);
      toast.success("Idea updated");
    } catch { toast.error("Failed to update"); }
    setSaving(false);
  };

  if (loading) return <LoadingSpinner />;

  const totalComments = ideas.reduce((s, i) => s + (i.commentCount || 0), 0);
  const categoryCount = new Set(ideas.map((i) => i.category)).size;

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-pink-900/40 py-12 px-4 border-b border-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-4 py-1.5 rounded-full mb-3">Dashboard</span>
              <h1 className="text-4xl font-extrabold">My Ideas</h1>
              <p className="text-base-content/70 mt-2">Manage the startup ideas you've shared</p>
            </div>
            <Link href="/add-idea" className="btn btn-primary rounded-xl shadow-lg shadow-primary/30">+ New Idea</Link>
          </div>
          {ideas.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[["Total Ideas", ideas.length], ["Comments Earned", totalComments], ["Categories", categoryCount]].map(([l, v]) => (
                <div key={l} className="bg-base-100 rounded-2xl p-5 border border-base-200 shadow-sm">
                  <div className="text-3xl font-extrabold gradient-text">{v}</div>
                  <div className="text-xs text-base-content/50 mt-1 font-semibold uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 w-full">
        {ideas.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-5 animate-float">💭</div>
            <h2 className="text-2xl font-bold mb-2">No ideas yet</h2>
            <p className="text-base-content/50 mb-6">Share your first startup idea with the community</p>
            <Link href="/add-idea" className="btn btn-primary rounded-xl px-8">Create First Idea →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ideas.map((idea) => {
              const gradient = categoryColor[idea.category] || categoryColor.Other;
              return (
                <div key={idea._id} className="group bg-base-100 rounded-2xl border border-base-200 p-6 card-hover relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${gradient} text-white`}>{idea.category}</span>
                    <span className="text-xs text-base-content/40">{new Date(idea.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{idea.title}</h3>
                  <p className="text-sm text-base-content/55 line-clamp-2 mb-5 leading-relaxed">{idea.shortDescription}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-base-200">
                    <span className="flex items-center gap-1 text-xs text-base-content/50">
                      💬 {idea.commentCount || 0} comments
                    </span>
                    <div className="flex gap-1">
                      <Link href={`/ideas/${idea._id}`} className="btn btn-ghost btn-xs rounded-lg">👁️</Link>
                      <button onClick={() => openEdit(idea)} className="btn btn-ghost btn-xs rounded-lg">✏️</button>
                      <button onClick={() => setDeleteTarget(idea)} className="btn btn-ghost btn-xs rounded-lg text-error hover:bg-error/10">🗑️</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete <strong>"{deleteTarget.title}"</strong>?</p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn btn-error" onClick={handleDelete}>Delete</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteTarget(null)} />
        </div>
      )}

      {editTarget && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Edit Idea</h3>
            <div className="space-y-3">
              <input value={editForm.title} onChange={(e) => setEditForm(p => ({ ...p, title: e.target.value }))} placeholder="Title" className="input input-bordered w-full" />
              <input value={editForm.shortDescription} onChange={(e) => setEditForm(p => ({ ...p, shortDescription: e.target.value }))} placeholder="Short Description" className="input input-bordered w-full" />
              <textarea value={editForm.detailedDescription} onChange={(e) => setEditForm(p => ({ ...p, detailedDescription: e.target.value }))} rows={3} placeholder="Detailed Description" className="textarea textarea-bordered w-full" />
              <select value={editForm.category} onChange={(e) => setEditForm(p => ({ ...p, category: e.target.value }))} className="select select-bordered w-full">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <input value={editForm.targetAudience} onChange={(e) => setEditForm(p => ({ ...p, targetAudience: e.target.value }))} placeholder="Target Audience" className="input input-bordered w-full" />
              <textarea value={editForm.problemStatement} onChange={(e) => setEditForm(p => ({ ...p, problemStatement: e.target.value }))} rows={2} placeholder="Problem Statement" className="textarea textarea-bordered w-full" />
              <textarea value={editForm.proposedSolution} onChange={(e) => setEditForm(p => ({ ...p, proposedSolution: e.target.value }))} rows={2} placeholder="Proposed Solution" className="textarea textarea-bordered w-full" />
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setEditTarget(null)}>Cancel</button>
              <button className="btn btn-primary" disabled={saving} onClick={handleEditSave}>
                {saving ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setEditTarget(null)} />
        </div>
      )}
    </>
  );
}

export default function MyIdeasClient() {
  return <PrivateGuard><Content /></PrivateGuard>;
}
