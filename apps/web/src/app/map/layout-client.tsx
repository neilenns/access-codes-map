"use client";

import { Spinner } from "@/components/ui/spinner";
import { useCheckPermissions } from "@/hooks/use-check-permissions";
import { Permissions } from "@/types/permissions";
import "leaflet/dist/leaflet.css";
import React from "react";
import "react-leaflet-markercluster/styles";
import UnauthorizedPage from "./unauthorized";

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { permissionsStatus, isLoading } = useCheckPermissions(
    Permissions.ViewCodes,
  );

  if (isLoading) {
    return (
      <main
        className="flex min-h-screen flex-col items-center justify-center text-center px-4 py-4"
        aria-label="Logging in"
      >
        <div role="status">
          <Spinner size="medium" aria-live="polite">
            <span>Logging in...</span>
          </Spinner>
        </div>
      </main>
    );
  }

  if (!permissionsStatus[Permissions.ViewCodes]) {
    return <UnauthorizedPage />;
  }

  return <main>{children}</main>;
}
