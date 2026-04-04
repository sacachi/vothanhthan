"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      username: fd.get("username"),
      password: fd.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid credentials");
    } else {
      router.refresh();
      router.push("/admins");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 w-full max-w-sm space-y-4 text-white text-sm">
        <h1 className="text-xs tracking-[0.4em] uppercase opacity-60 text-center mb-6">Admin</h1>
        <input
          name="username"
          placeholder="Username"
          required
          className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 focus:outline-none focus:border-white/40"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 focus:outline-none focus:border-white/40"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-2 text-xs tracking-widest uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
