"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import PrivateGuard from "@/components/PrivateGuard";
import { useSession } from "@/lib/auth-client";

function Content() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ ideas: 0, comments: 0, interactions: 0 });
  const [form, setForm] = useState({ name: "", photoURL: "" });

  useEffect(() => {
    if (user) setForm({ name: user.name || "", photoURL: user.photoURL || user.image || "" });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      axios.get("/api/ideas/my").catch(() => ({ data: [] })),
      axios.get("/api/interactions").catch(() => ({ data: [] })),
    ]).then(([ideasRes, intRes]) => {
      const ideas = ideasRes.data || [];
      const totalComments = ideas.reduce((s, i) => s + (i.commentCount || 0), 0);
      setStats({
        ideas: ideas.length,
        comments: totalComments,
        interactions: (intRes.data || []).length,
      });
    });
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Name cannot be empty");
    setSaving(true);
    try {
      await axios.patch("/api/user/profile", { name: form.name.trim(), photoURL: form.photoURL.trim() });
      toast.success("Profile updated successfully");
      router.refresh();
    } catch { toast.error("Failed to update profile"); }
    setSaving(false);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-blob animation-delay-400" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="relative inline-block mb-5">
            <div className="w-28 h-28 rounded-full ring-4 ring-white/30 ring-offset-4 ring-offset-transparent shadow-2xl overflow-hidden mx-auto">
              {form.photoURL ? (
                <img src={form.photoURL} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                <div className="bg-white/20 backdrop-blur-md flex items-center justify-center h-full text-5xl font-extrabold">
                  {form.name?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-400 ring-4 ring-white" />
          </div>
          <h1 className="text-4xl font-extrabold mb-1">{form.name || "Your name"}</h1>
          <p className="text-white/70 text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 w-full -mt-12 relative z-10">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Ideas Shared", value: stats.ideas, icon: "💡", color: "from-indigo-500 to-blue-500" },
            { label: "Comments Earned", value: stats.comments, icon: "💬", color: "from-purple-500 to-pink-500" },
            { label: "Discussions Joined", value: stats.interactions, icon: "🔥", color: "from-amber-500 to-orange-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-base-100 rounded-2xl p-5 border border-base-200 shadow-md text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-md`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-extrabold gradient-text">{stat.value}</div>
              <div className="text-xs text-base-content/50 mt-1 font-semibold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-base-100 rounded-3xl border border-base-200 shadow-sm p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <span className="w-1.5 h-7 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
              Edit Profile
            </h2>
            <p className="text-base-content/60 text-sm mt-2 ml-5">Update your public profile information</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6 max-w-xl">
            <div className="field-stack">
              <label>Full Name <span className="text-error">*</span></label>
              <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required className="input input-bordered rounded-xl w-full focus:input-primary" />
            </div>
            <div className="field-stack">
              <label>Profile Photo URL</label>
              <input type="url" value={form.photoURL} onChange={(e) => setForm((p) => ({ ...p, photoURL: e.target.value }))} className="input input-bordered rounded-xl w-full focus:input-primary" placeholder="https://..." />
              <span className="hint">Paste a direct image URL</span>
            </div>
            <div className="field-stack">
              <label>Email</label>
              <input type="email" value={user?.email || ""} disabled className="input input-bordered rounded-xl w-full bg-base-200 cursor-not-allowed text-base-content/60" />
              <span className="hint">Email cannot be changed</span>
            </div>
            <button type="submit" disabled={saving}
              className="btn rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-bold px-10 h-12 mt-2">
              {saving ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default function ProfileClient() {
  return <PrivateGuard><Content /></PrivateGuard>;
}
