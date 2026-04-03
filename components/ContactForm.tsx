"use client";

import { useState } from "react";
import Image from "next/image";
import SocialIcons from "@/components/SocialIcons";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition";

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left: contact info + form */}
        <div>
          <h1 className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-10">Contact</h1>

          {/* Info */}
          <div className="space-y-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Email</p>
              <a href="mailto:thanvo7891@gmail.com" className="text-sm text-gray-800 hover:underline">
                thanvo7891@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Social</p>
              <SocialIcons className="text-gray-700" />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-10" />

          {/* Contact form */}
          <div>
            <h2 className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">Send a message</h2>
            {status === "sent" ? (
              <div className="bg-green-50 border border-green-200 rounded-lg px-5 py-4 text-sm text-green-700">
                Thank you — your message has been received.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Name</label>
                    <input
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputCls + " resize-none"}
                  />
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-gray-900 text-white text-xs tracking-widest uppercase py-3 rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: artist portrait */}
        <div className="relative">
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/anh-chan-dung-hs.jpg"
              alt="Võ Thành Thân in studio"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <p className="mt-3 text-xs text-gray-400 text-center tracking-wider">
            Võ Thành Thân · Hue City, Vietnam
          </p>
        </div>

      </div>
    </div>
  );
}
