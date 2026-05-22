import HomeClient from "./HomeClient";

async function getTrending() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/ideas/trending`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const trending = await getTrending();
  return <HomeClient trending={trending} />;
}
