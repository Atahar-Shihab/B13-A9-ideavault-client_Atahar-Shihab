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
    axios.get("/api/interactions")
      .then((res) => setIdeas(res.data))
      .catch(() => toast.error("Failed to load interactions"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 dark:from-amber-900/40 dark:via-orange-900/40 dark:to-rose-900/40 py-14 px-4 border-b border-base-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-700 dark:text-orange-300 bg-orange-500/15 px-4 py-1.5 rounded-full mb-5">Activity</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">My Interactions</h1>
          <p className="text-base-content/70 text-base md:text-lg">Ideas you've engaged with through comments and discussion</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 w-full">
        {ideas.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-5 animate-float">💬</div>
            <h2 className="text-2xl font-bold mb-2">No interactions yet</h2>
            <p className="text-base-content/50 mb-6">Comment on an idea to start engaging with the community</p>
            <Link href="/ideas" className="btn btn-primary rounded-xl px-8">Browse Ideas →</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-base-content/40 font-medium mb-5">
              You've engaged with <span className="text-primary font-bold">{ideas.length}</span> idea{ideas.length !== 1 ? "s" : ""}
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

export default function MyInteractionsClient() {
  return <PrivateGuard><Content /></PrivateGuard>;
}
