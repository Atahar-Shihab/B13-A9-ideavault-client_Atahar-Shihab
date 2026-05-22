import Link from "next/link";

export const metadata = { title: "404 — Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-400" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-700" />

      <div className="relative z-10">
        <div className="relative mb-8 inline-block">
          <div className="text-9xl md:text-[12rem] font-extrabold leading-none">
            <span className="gradient-text">4</span>
            <span className="inline-block animate-float text-7xl md:text-9xl mx-2">🔭</span>
            <span className="gradient-text">4</span>
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Lost in Space</h2>
        <p className="text-base-content/60 mb-10 max-w-md mx-auto leading-relaxed">
          The page you're looking for has drifted off into the cosmos.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all font-bold px-8">
            🏠 Go Home
          </Link>
          <Link href="/ideas" className="btn btn-outline rounded-xl px-8 hover:scale-105 transition-transform">
            💡 Browse Ideas
          </Link>
        </div>
      </div>
    </div>
  );
}
