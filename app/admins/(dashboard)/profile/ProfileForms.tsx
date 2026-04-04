"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

interface Props {
  username: string;
}

export default function ProfileForms({ username: initialUsername }: Props) {
  // ── Username form ──────────────────────────────────────────
  const [username, setUsername] = useState(initialUsername);
  const [userMsg, setUserMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [userBusy, setUserBusy] = useState(false);

  async function saveUsername(e: React.FormEvent) {
    e.preventDefault();
    setUserBusy(true);
    setUserMsg(null);
    const res = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (res.ok) {
      setUserMsg({ ok: true, text: "Username updated. You will be signed out to refresh your session." });
      setTimeout(() => signOut({ callbackUrl: "/admins/login" }), 2000);
    } else {
      setUserMsg({ ok: false, text: data.error ?? "Something went wrong" });
    }
    setUserBusy(false);
  }

  // ── Password form ──────────────────────────────────────────
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pwBusy, setPwBusy] = useState(false);

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPw !== confirmPw) {
      setPwMsg({ ok: false, text: "New passwords do not match" });
      return;
    }
    setPwBusy(true);
    setPwMsg(null);
    const res = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
    });
    const data = await res.json();
    if (res.ok) {
      setPwMsg({ ok: true, text: "Password changed successfully." });
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } else {
      setPwMsg({ ok: false, text: data.error ?? "Something went wrong" });
    }
    setPwBusy(false);
  }

  return (
    <div className="space-y-8">
      {/* ── Account info ─────────────────────────────────────── */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-5 uppercase tracking-wider">
          Account Info
        </h2>
        <form onSubmit={saveUsername} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-xs text-gray-500 mb-1">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={3}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          {userMsg && (
            <p className={`text-xs ${userMsg.ok ? "text-green-600" : "text-red-500"}`}>
              {userMsg.text}
            </p>
          )}
          <button
            type="submit"
            disabled={userBusy || username === initialUsername}
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {userBusy ? "Saving…" : "Save Username"}
          </button>
        </form>
      </section>

      {/* ── Change password ───────────────────────────────────── */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-5 uppercase tracking-wider">
          Change Password
        </h2>
        <form onSubmit={savePassword} className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-xs text-gray-500 mb-1">Current Password</label>
            <input
              id="current-password"
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-xs text-gray-500 mb-1">New Password</label>
            <input
              id="new-password"
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
            <p className="text-[11px] text-gray-400 mt-1">Minimum 8 characters</p>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-xs text-gray-500 mb-1">Confirm New Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          {pwMsg && (
            <p className={`text-xs ${pwMsg.ok ? "text-green-600" : "text-red-500"}`}>
              {pwMsg.text}
            </p>
          )}
          <button
            type="submit"
            disabled={pwBusy}
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {pwBusy ? "Saving…" : "Change Password"}
          </button>
        </form>
      </section>
    </div>
  );
}
