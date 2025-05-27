"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function RouteLoadingOverlay() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleStop);
    router.events?.on("routeChangeError", handleStop);

    return () => {
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleStop);
      router.events?.off("routeChangeError", handleStop);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 transition-opacity">
      <div className="text-white text-xl font-semibold">Loading workspace...</div>
    </div>
  );
}
