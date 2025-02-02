import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      {import.meta.env.VITE_TANSTACK_ROUTER_DEVTOOLS === "true" &&
        import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
    </React.Fragment>
  );
}
