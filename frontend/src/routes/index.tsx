import { useAuthStore } from "@/features/auth/stores/authStore";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, user, logout, fetchUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/login" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="2">
      <h1>Welcome to the home page</h1>
      {isAuthenticated ? (
        <div>
          <p>Hi there {user?.username}!</p>
          <p>You are logged in.</p>
          <p>{user?.secret_fact}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p className="flex flex-col">
          You are not logged in.
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </p>
      )}
    </div>
  );
}
