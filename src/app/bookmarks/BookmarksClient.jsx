"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import PrivateGuard from "@/components/PrivateGuard";
import IdeaCard from "@/components/IdeaCard";
import LoadingSpinner from "@/components/LoadingSpinner";

function Content() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/bookmarks")
      .then((res) => setIdeas(res.data))
      .catch(() => toast.error("Failed to load bookmarks"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-orange-900/40 py-14 px-4 border-b border-base-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300 bg-amber-500/15 px-4 py-1.5 rounded-full mb-5">
            Saved For Later
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">🔖 My Bookmarks</h1>
          <p className="text-base-content/70 text-base md:text-lg">Ideas you've saved to revisit and explore further</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 w-full">
        {ideas.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-5 animate-float">📑</div>
            <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
            <p className="text-base-content/60 mb-6">Save ideas you want to revisit by clicking the bookmark icon</p>
            <Link href="/ideas" className="btn btn-primary rounded-xl px-8">Browse Ideas →</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-base-content/60 font-medium mb-5">
              You've saved <span className="text-primary font-bold">{ideas.length}</span> idea{ideas.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea) => <IdeaCard key={idea._id} idea={idea} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function BookmarksClient() {
  return <PrivateGuard><Content /></PrivateGuard>;
}
