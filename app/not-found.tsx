"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-background">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-teal-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-5 cursor-pointer relative inline-block text-sm font-medium text-teal-500 group active:text-teal-500 focus:outline-none focus:ring"
      >
        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-teal-500 group-hover:translate-y-0 group-hover:translate-x-0" />
        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
          Go home
        </span>
      </button>
    </main>
  );
}
