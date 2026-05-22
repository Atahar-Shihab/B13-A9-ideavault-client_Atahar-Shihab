"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import IdeaCard from "@/components/IdeaCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const CATEGORIES = ["all", "Tech", "Health", "AI", "Education", "Finance", "Other"];
const categoryIcons = { all: "🌐", Tech: "💻", Health: "🏥", AI: "🤖", Education: "📚", Finance: "💰", Other: "💼" };

function IdeasInner() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDateFilter, setShowDateFilter] = useState(false);
  const searchRef = useRef(null);

  const search   = searchParams.get("search")   || "";
  const category = searchParams.get("category") || "all";
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo   = searchParams.get("dateTo")   || "";

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (category !== "all") params.category = category;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;
    axios.get("/api/ideas", { params })
      .then((res) => setIdeas(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, category, dateFrom, dateTo]);

  const setParam = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null || v === "") params.delete(k);
      else params.set(k, v);
    });
    router.push(`/ideas?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setParam({ search: searchRef.current.value.trim() || null });
  };

  const hasActiveFilter = search || category !== "all" || dateFrom || dateTo;

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-pink-900/40 py-14 px-4 border-b border-base-200">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-4 py-1.5 rounded-full mb-5">
            Community Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-base-content">Explore All Ideas</h1>
          <p className="text-base-content/70 text-base md:text-lg">Discover innovative startup concepts from our community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 w-full">
        <div className="bg-base-100 border border-base-200 rounded-2xl p-5 mb-8 shadow-sm">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input ref={searchRef} defaultValue={search} type="text" placeholder="Search ideas by title..."
                className="input input-bordered rounded-xl pl-9 w-full focus:input-primary" />
            </div>
            <button type="submit" className="btn btn-primary rounded-xl px-6">Search</button>
            {search && (
              <button type="button" onClick={() => { if (searchRef.current) searchRef.current.value=""; setParam({ search: null }); }} className="btn btn-ghost rounded-xl">✕ Clear</button>
            )}
            <button type="button" onClick={() => setShowDateFilter((v) => !v)}
              className={`btn rounded-xl gap-2 ${(dateFrom || dateTo) ? "btn-secondary" : "btn-outline"}`}>
              📅 Date
            </button>
          </form>

          {showDateFilter && (
            <div className="flex flex-wrap items-end gap-3 mb-4 p-4 bg-base-200 rounded-xl">
              <div className="field-stack">
                <label className="text-xs">From</label>
                <input type="date" defaultValue={dateFrom} onChange={(e) => setParam({ dateFrom: e.target.value || null })} className="input input-bordered input-sm rounded-xl" />
              </div>
              <div className="field-stack">
                <label className="text-xs">To</label>
                <input type="date" defaultValue={dateTo} onChange={(e) => setParam({ dateTo: e.target.value || null })} className="input input-bordered input-sm rounded-xl" />
              </div>
              {(dateFrom || dateTo) && (
                <button type="button" onClick={() => setParam({ dateFrom: null, dateTo: null })} className="btn btn-ghost btn-sm rounded-xl">Clear Date</button>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setParam({ category: cat === "all" ? null : cat })}
                className={`btn btn-sm rounded-xl gap-1.5 transition-all duration-200 ${
                  category === cat ? "btn-primary shadow-md shadow-primary/30 scale-105" : "btn-ghost border border-base-300 hover:border-primary/50"
                }`}>
                <span>{categoryIcons[cat]}</span>
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilter && (
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="text-xs text-base-content/40 font-medium">Active filters:</span>
            {search && <span className="badge badge-primary badge-outline gap-1">"{search}"</span>}
            {category !== "all" && <span className="badge badge-secondary badge-outline">{category}</span>}
            {dateFrom && <span className="badge badge-accent badge-outline">From {dateFrom}</span>}
            {dateTo && <span className="badge badge-accent badge-outline">To {dateTo}</span>}
            <button onClick={() => router.push("/ideas")} className="text-xs text-error hover:underline ml-1">Clear all</button>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : ideas.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-5">🔍</div>
            <h2 className="text-2xl font-bold mb-2">No ideas found</h2>
            <p className="text-base-content/50 mb-6">Try adjusting your search or filters</p>
            <Link href="/add-idea" className="btn btn-primary rounded-xl px-8">Share an Idea →</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-base-content/40 font-medium mb-5">
              Showing <span className="text-primary font-bold">{ideas.length}</span> idea{ideas.length !== 1 ? "s" : ""}
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

export default function IdeasClient() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <IdeasInner />
    </Suspense>
  );
}
