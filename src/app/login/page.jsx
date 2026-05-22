export const metadata = { title: "Login" };
import { Suspense } from "react";
import LoginClient from "./LoginClient";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginClient />
    </Suspense>
  );
}
