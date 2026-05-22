import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-300 text-base-content mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">IV</span>
            </div>
            <span className="text-xl font-extrabold gradient-text">IdeaVault</span>
          </Link>
          <p className="text-base-content/50 text-sm leading-relaxed">
            Where startup ideas come to life. Share, discover, and validate your next big venture.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="https://x.com" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-base-200 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-base-200 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-base-200 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-base-content/40">Platform</h3>
          <ul className="space-y-2.5">
            {[["All Ideas", "/ideas"], ["Submit Idea", "/add-idea"], ["My Ideas", "/my-ideas"], ["My Interactions", "/my-interactions"]].map(([label, to]) => (
              <li key={label}>
                <Link href={to} className="text-sm text-base-content/60 hover:text-primary transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-base-content/40">Categories</h3>
          <ul className="space-y-2.5">
            {["Tech", "Health", "AI", "Education", "Finance"].map((cat) => (
              <li key={cat}>
                <Link href={`/ideas?category=${cat}`} className="text-sm text-base-content/60 hover:text-primary transition-colors">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-base-content/40">Contact</h3>
          <ul className="space-y-2.5">
            <li>
              <a href="mailto:hello@ideavault.dev" className="text-sm text-base-content/60 hover:text-primary transition-colors">
                hello@ideavault.dev
              </a>
            </li>
          </ul>
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
            <p className="text-xs font-semibold text-base-content/60 mb-2">Have an idea? Share it!</p>
            <Link href="/add-idea" className="btn btn-primary btn-xs rounded-lg w-full">Submit Now →</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-base-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-base-content/40">
            © {new Date().getFullYear()} IdeaVault. All rights reserved.
          </p>
          <p className="text-xs text-base-content/40">
            Empowering startup innovation worldwide 🌍
          </p>
        </div>
      </div>
    </footer>
  );
}
