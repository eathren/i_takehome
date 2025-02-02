import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useState, useCallback } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/s/$sId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sId } = Route.useParams();
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fetchSecret = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/share/${sId}`, {
        params: { password },
      });
      setSecret(res.data.content);
      setIsOpen(true);
    } catch (err) {
      console.error("Error retrieving secret", err);
    }
  }, [sId, password]);

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Retrieve a Secret</h2>
      <input
        type="password"
        className="w-full p-2 border rounded"
        placeholder="Enter password if required"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white p-2 rounded mt-4"
        onClick={fetchSecret}
      >
        Retrieve Secret
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="hidden">Open Dialog</button>
        </DialogTrigger>
        <DialogContent className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
          <DialogTitle>Secret</DialogTitle>
          <DialogDescription>
            <div className="overflow-auto max-h-96">
              <p className="text-red-600">{secret}</p>
            </div>
          </DialogDescription>
          <DialogClose asChild>
            <button className="mt-4 bg-blue-600 text-white p-2 rounded">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
