"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import LoadingSpinner from "./LoadingSpinner";

export default function PrivateGuard({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  if (isPending) return <LoadingSpinner />;
  if (!session?.user) return <LoadingSpinner />;
  return children;
}
