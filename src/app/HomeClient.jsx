"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import IdeaCard from "@/components/IdeaCard";
import Marquee from "@/components/Marquee";

const slides = [
  { title: "Turn Your Startup Idea Into Reality", subtitle: "Share your vision with a community of innovators and get the feedback you need to grow.", gradient: "from-[#0f0c29] via-[#302b63] to-[#24243e]", accent: "from-indigo-400 to-purple-500", emoji: "🚀", tag: "Launch Your Vision" },
  { title: "Discover the Next Big Thing",         subtitle: "Explore hundreds of startup ideas across Tech, Health, AI, Education and more.",            gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]", accent: "from-cyan-400 to-blue-500",     emoji: "💡", tag: "Explore & Discover" },
  { title: "Collaborate & Validate Together",     subtitle: "Comment, discuss, and help refine ideas. Great startups start with great conversations.",     gradient: "from-[#1f0535] via-[#2d1b4e] to-[#0d0d1a]", accent: "from-pink-400 to-purple-500",   emoji: "🤝", tag: "Build Together" },
];

const categories = [
  { name: "Tech",      icon: "💻", color: "from-blue-500 to-cyan-500" },
  { name: "Health",    icon: "🏥", color: "from-green-500 to-emerald-500" },
  { name: "AI",        icon: "🤖", color: "from-purple-500 to-violet-500" },
  { name: "Education", icon: "📚", color: "from-amber-500 to-orange-500" },
  { name: "Finance",   icon: "💰", color: "from-rose-500 to-pink-500" },
];

const stats = [
  { label: "Ideas Shared",   value: "1,200+", icon: "💡" },
  { label: "Active Members", value: "4,800+", icon: "👥" },
  { label: "Categories",     value: "10+",    icon: "🗂️" },
  { label: "Comments",       value: "15,000+",icon: "💬" },
];

const topicsMarquee = [
  { label: "SaaS",        icon: "☁️", color: "from-blue-500 to-cyan-500" },
  { label: "AI / ML",     icon: "🤖", color: "from-purple-500 to-violet-500" },
  { label: "Climate",     icon: "🌱", color: "from-green-500 to-emerald-500" },
  { label: "HealthTech",  icon: "💊", color: "from-rose-500 to-pink-500" },
  { label: "FinTech",     icon: "💰", color: "from-amber-500 to-orange-500" },
  { label: "EdTech",      icon: "📚", color: "from-indigo-500 to-blue-500" },
  { label: "E-commerce",  icon: "🛒", color: "from-fuchsia-500 to-pink-500" },
  { label: "Web3",        icon: "🔗", color: "from-cyan-500 to-blue-500" },
  { label: "Gaming",      icon: "🎮", color: "from-violet-500 to-purple-500" },
  { label: "DevTools",    icon: "🛠️", color: "from-slate-500 to-zinc-500" },
  { label: "AgriTech",    icon: "🌾", color: "from-lime-500 to-green-500" },
  { label: "Robotics",    icon: "🦾", color: "from-gray-500 to-slate-600" },
  { label: "Productivity",icon: "⚡", color: "from-yellow-500 to-amber-500" },
];

const founderQuotes = [
  { quote: "Ideas are easy. Execution is everything.",                          author: "John Doerr",      role: "Venture Capitalist" },
  { quote: "The best way to predict the future is to invent it.",               author: "Alan Kay",        role: "Computer Scientist" },
  { quote: "Move fast and break things.",                                       author: "Mark Zuckerberg", role: "Founder, Meta" },
  { quote: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates",      role: "Founder, Microsoft" },
  { quote: "Stay hungry. Stay foolish.",                                        author: "Steve Jobs",      role: "Co-founder, Apple" },
  { quote: "If you are not embarrassed by the first version of your product, you've launched too late.", author: "Reid Hoffman", role: "Co-founder, LinkedIn" },
];

export default function HomeClient({ trending }) {
  return (
    <>
      {/* Hero Banner */}
      <section className="w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="w-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className={`bg-gradient-to-br ${slide.gradient} min-h-[560px] flex items-center justify-center px-6 relative overflow-hidden`}>
                <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="text-center text-white max-w-3xl relative z-10">
                  <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-gradient-to-r ${slide.accent} bg-opacity-20 border border-white/20 mb-6`}>
                    {slide.tag}
                  </span>
                  <div className="text-7xl mb-6 animate-float">{slide.emoji}</div>
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">{slide.title}</h1>
                  <p className="text-base md:text-xl mb-10 text-white/75 max-w-xl mx-auto leading-relaxed">{slide.subtitle}</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/ideas" className={`btn rounded-xl px-8 bg-gradient-to-r ${slide.accent} text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold`}>
                      Explore Ideas →
                    </Link>
                    <Link href="/register" className="btn btn-outline rounded-xl px-8 text-white border-white/40 hover:bg-white/10 hover:border-white/60 transition-all duration-200">
                      Join the Community
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 bg-base-200">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-4 rounded-2xl bg-base-100 border border-base-200 shadow-sm">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
              <div className="text-base-content/50 text-xs mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Topics Marquee */}
      <section className="py-10 bg-base-100 border-y border-base-200">
        <div className="text-center mb-6 px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-base-content/40">
            ✨ Trending Topics in Our Community ✨
          </p>
        </div>
        <Marquee direction="left" fadeColor="from-base-100">
          {topicsMarquee.map((t, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-full bg-base-200 border border-base-300 shadow-sm whitespace-nowrap">
              <span className={`w-7 h-7 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm shadow-sm`}>
                {t.icon}
              </span>
              <span className="font-semibold text-sm">{t.label}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Trending */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">Trending Now</span>
          <h2 className="text-4xl font-extrabold mt-4 mb-3">🔥 Hot Startup Ideas</h2>
          <p className="text-base-content/50 max-w-md mx-auto">The most-discussed concepts in our community right now</p>
        </div>
        {trending.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌱</div>
            <p className="text-base-content/50 text-lg">No ideas yet — be the first to share one!</p>
            <Link href="/add-idea" className="btn btn-primary mt-6 rounded-xl">Share an Idea</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((idea) => <IdeaCard key={idea._id} idea={idea} />)}
          </div>
        )}
        <div className="text-center mt-12">
          <Link href="/ideas" className="btn btn-primary btn-lg rounded-xl px-10 shadow-lg shadow-primary/30">
            View All Ideas →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-base-200 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">Explore</span>
            <h2 className="text-4xl font-extrabold mt-4 mb-3">Browse by Category</h2>
            <p className="text-base-content/50">Find ideas that match your passion</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/ideas?category=${cat.name}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-base-100 border border-base-200 hover:shadow-lg transition-all card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">Simple Process</span>
          <h2 className="text-4xl font-extrabold mt-4 mb-3">How IdeaVault Works</h2>
          <p className="text-base-content/50">Three steps to validate your startup idea</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Share Your Idea", desc: "Post your concept with details, target audience, problem statement and vision.", icon: "✍️", color: "from-indigo-500 to-blue-500" },
            { step: "02", title: "Get Feedback",    desc: "Receive comments and insights from entrepreneurs and domain enthusiasts.", icon: "💬", color: "from-purple-500 to-violet-500" },
            { step: "03", title: "Refine & Launch", desc: "Use community feedback to sharpen your idea and turn it into reality.", icon: "🚀", color: "from-pink-500 to-rose-500" },
          ].map((item) => (
            <div key={item.step} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-base-100 border border-base-200 shadow-sm card-hover">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl shadow-lg mb-5`}>
                {item.icon}
              </div>
              <div className={`text-xs font-extrabold uppercase tracking-widest bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                Step {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-base-content/55 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quotes Marquee */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-400" />
        <div className="relative z-10">
          <div className="text-center mb-10 px-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/20 px-4 py-1.5 rounded-full border border-indigo-400/30">
              Words of Wisdom
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4">From Founders Who've Been There</h2>
          </div>
          <Marquee direction="right" fadeColor="from-slate-900">
            {founderQuotes.map((q, i) => (
              <div key={i} className="w-[360px] md:w-[420px] shrink-0 p-7 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="text-4xl text-indigo-400/60 mb-3 leading-none">"</div>
                <p className="text-sm md:text-base leading-relaxed text-white/90 mb-5 italic min-h-[80px]">
                  {q.quote}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center font-bold text-sm">
                    {q.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{q.author}</div>
                    <div className="text-xs text-white/50">{q.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full translate-x-20 translate-y-20 blur-2xl" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">💡</div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Have a Startup Idea?</h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
              Don't let it stay in your head. Share it with thousands of innovators and get the validation you need.
            </p>
            <Link href="/add-idea" className="btn btn-lg bg-white text-purple-700 font-bold rounded-xl px-10 border-0 hover:bg-white/90 shadow-xl">
              Share Your Idea Now →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
