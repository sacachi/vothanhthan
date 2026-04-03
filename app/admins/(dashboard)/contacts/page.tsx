"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  async function load() {
    const res = await fetch("/api/admin/contacts");
    setMessages(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function toggleRead(msg: Message) {
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: msg.id, read: !msg.read }),
    });
    await load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/admin/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setExpanded(null);
    await load();
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-800">Contact Messages</h1>
          {unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">Messages from the contact form</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-400 p-6">No messages yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-6"></th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Message preview</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map((msg) => (
                <>
                  <tr
                    key={msg.id}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${!msg.read ? "bg-blue-50/40" : ""}`}
                    onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
                  >
                    <td className="px-4 py-3 text-gray-400">
                      {msg.read
                        ? <MailOpen size={14} className="text-gray-400" />
                        : <Mail size={14} className="text-blue-500" />}
                    </td>
                    <td className={`px-4 py-3 ${!msg.read ? "font-semibold text-gray-800" : "text-gray-700"}`}>
                      {msg.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{msg.email}</td>
                    <td className="px-4 py-3 text-gray-400 hidden lg:table-cell max-w-xs">
                      <span className="truncate block max-w-[240px]">{msg.message}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          msg.read
                            ? "bg-gray-100 text-gray-500"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {msg.read ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div
                        className="flex items-center justify-end gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => toggleRead(msg)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark {msg.read ? "unread" : "read"}
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expanded === msg.id && (
                    <tr key={`expanded-${msg.id}`} className="bg-gray-50">
                      <td colSpan={7} className="px-8 py-4">
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Full message</div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                        <a
                          href={`mailto:${msg.email}?subject=Re: Your message`}
                          className="inline-block mt-3 text-xs text-blue-600 hover:underline"
                        >
                          Reply to {msg.email}
                        </a>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
