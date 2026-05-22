import Link from "next/link";

const categoryConfig = {
  Tech:      { color: "from-blue-500 to-cyan-500",     bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  Health:    { color: "from-green-500 to-emerald-500", bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  AI:        { color: "from-purple-500 to-violet-500", bg: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
  Education: { color: "from-amber-500 to-orange-500",  bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  Finance:   { color: "from-rose-500 to-pink-500",     bg: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" },
  Other:     { color: "from-gray-500 to-slate-500",    bg: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300" },
};

export default function IdeaCard({ idea }) {
  const { _id, title, shortDescription, category, commentCount, imageURL, createdAt, authorName, likes = [] } = idea;
  const cfg = categoryConfig[category] || categoryConfig.Other;

  return (
    <div className="card-hover rounded-2xl bg-base-100 border border-base-200 h-full flex flex-col overflow-hidden group">
      <div className={`h-1 w-full bg-gradient-to-r ${cfg.color}`} />

      {imageURL ? (
        <figure className="h-44 overflow-hidden relative">
          <img
            src={imageURL}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </figure>
      ) : (
        <div className={`h-28 bg-gradient-to-br ${cfg.color} opacity-10 flex items-center justify-center`}>
          <span className="text-5xl opacity-30">💡</span>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg}`}>
            {category}
          </span>
          <span className="text-xs text-base-content/40">
            {new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        <h2 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h2>

        <p className="text-sm text-base-content/60 line-clamp-3 flex-1 leading-relaxed">
          {shortDescription}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-base-200">
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${cfg.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
              {authorName?.[0]?.toUpperCase()}
            </div>
            <span className="text-xs text-base-content/70 truncate max-w-[60px] font-medium">{authorName}</span>
            <span className="flex items-center gap-1 text-xs text-base-content/60" title="Likes">
              <span className="text-sm">❤️</span>
              <span className="font-semibold">{likes.length}</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-base-content/60" title="Comments">
              <span className="text-sm">💬</span>
              <span className="font-semibold">{commentCount || 0}</span>
            </span>
          </div>
          <Link
            href={`/ideas/${_id}`}
            className={`btn btn-sm rounded-xl bg-gradient-to-r ${cfg.color} text-white border-0 shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-200`}
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}
