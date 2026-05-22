"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const NavLink = ({ to, children }) => {
    const isActive = pathname === to;
    return (
      <li>
        <Link
          href={to}
          className={
            isActive
              ? "font-semibold text-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
              : "text-base-content/70 hover:text-primary transition-colors duration-200"
          }
        >
          {children}
        </Link>
      </li>
    );
  };

  const navLinks = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ideas">Ideas</NavLink>
      {user && (
        <>
          <NavLink to="/add-idea">Add Idea</NavLink>
          <NavLink to="/my-ideas">My Ideas</NavLink>
          <NavLink to="/my-interactions">My Interactions</NavLink>
        </>
      )}
    </>
  );

  return (
    <div
      className={`navbar sticky top-0 z-50 px-4 md:px-8 transition-all duration-300 ${
        scrolled ? "bg-base-100/90 backdrop-blur-md shadow-md" : "bg-base-100 shadow-sm"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-2xl w-56 border border-base-200">
            {navLinks}
          </ul>
        </div>

        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">IV</span>
          </div>
          <span className="text-xl font-extrabold hidden sm:block">
            <span className="gradient-text">IdeaVault</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1 text-sm font-medium">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <svg className="swap-off fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg className="swap-on fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {isPending ? (
          <div className="w-9 h-9 rounded-full bg-base-200 animate-pulse" />
        ) : user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar cursor-pointer">
              <div className="w-9 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-1 overflow-hidden">
                {(user.photoURL || user.image) ? (
                  <img src={user.photoURL || user.image} alt={user.name} referrerPolicy="no-referrer" />
                ) : (
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center h-full text-sm font-bold rounded-full">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-0 shadow-2xl dropdown-content bg-base-100 rounded-2xl w-64 border border-base-200 overflow-hidden">
              {/* Gradient profile header */}
              <li className="menu-none">
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full ring-2 ring-white/50 overflow-hidden shrink-0">
                    {(user.photoURL || user.image) ? (
                      <img src={user.photoURL || user.image} alt={user.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white/25 flex items-center justify-center text-white text-lg font-bold">
                        {user.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-white truncate">{user.name}</div>
                    <div className="text-xs text-white/75 truncate">{user.email}</div>
                  </div>
                </div>
              </li>

              {/* Menu items */}
              <div className="p-2 menu menu-sm">
                <li>
                  <Link href="/profile" className="rounded-xl flex items-center gap-3 py-2.5">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-base">👤</span>
                    <span className="font-medium">Profile Management</span>
                  </Link>
                </li>
                <li>
                  <Link href="/bookmarks" className="rounded-xl flex items-center gap-3 py-2.5">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-base">🔖</span>
                    <span className="font-medium">My Bookmarks</span>
                  </Link>
                </li>
                <div className="h-px bg-base-200 my-1.5 mx-2" />
                <li>
                  <button onClick={handleLogout} className="rounded-xl flex items-center gap-3 py-2.5 text-error hover:bg-error/10">
                    <span className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center text-base">🚪</span>
                    <span className="font-medium">Logout</span>
                  </button>
                </li>
              </div>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm rounded-xl">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm rounded-xl shadow-md shadow-primary/30">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
