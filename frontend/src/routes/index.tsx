import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [content, setContent] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const expireTimestamp = new Date(
      now.getTime() + days * 1440 * 60000 + hours * 60 * 60000 + minutes * 60000
    ).toISOString();
    try {
      const res = await axios.post("http://localhost:3000/api/share", {
        content,
        expireTimestamp,
        password,
      });
      setLink(res.data.link);
    } catch (err) {
      console.error("Error sharing secret", err);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Share a Secret</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="secret">Secret</Label>
            <Textarea
              id="secret"
              className="w-full p-2 border rounded"
              placeholder="Enter your secret"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <Label>Expires in</Label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="days">Days</Label>
                <Input
                  id="days"
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Days"
                  min="0"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Hours"
                  min="0"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="minutes">Minutes</Label>
                <Input
                  id="minutes"
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Minutes"
                  min="0"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="password">Optional Password</Label>
            <Input
              id="password"
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Optional Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Generate Link
          </Button>
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
    </div>
  );
}
