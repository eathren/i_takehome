import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/stores/authStore";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const setCsrfToken = useAuthStore((state) => state.setCsrfToken);

  useEffect(() => {
    void setCsrfToken();
  }, [setCsrfToken]);
  return (
    <React.Fragment>
      <Outlet />
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </React.Fragment>
  );
}
