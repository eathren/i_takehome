import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "@/components/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      {import.meta.env.VITE_TANSTACK_ROUTER_DEVTOOLS === "true" &&
        import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
    </React.Fragment>
  );
}
