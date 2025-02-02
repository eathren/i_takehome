import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [content, setContent] = useState("");
  const [expiresIn, setExpiresIn] = useState(1);
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/share", {
        content,
        expiresInDays: expiresIn,
        password,
      });
      setLink(res.data.link);
    } catch (err) {
      console.error("Error sharing secret", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Share a Secret</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label>Secret</label>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Enter your secret"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label>Expires in (days)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          min="1"
          value={expiresIn}
          onChange={(e) => setExpiresIn(Number(e.target.value))}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Optional Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Generate Link
        </button>
      </form>
      {link && (
        <p className="mt-4">
          Share this link:{" "}
          <a href={link} className="text-blue-600 underline">
            {link}
          </a>
        </p>
      )}
    </div>
  );
}
