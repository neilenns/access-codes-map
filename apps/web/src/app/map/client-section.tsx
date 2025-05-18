"use client";

import { Loading } from "@/components/loading";
import { Spinner } from "@/components/ui/spinner";
import { LocationsWithUsers } from "@/db/locations";
import { useCheckPermissions } from "@/hooks/use-check-permissions";
import { Permissions } from "@/types/permissions";
import dynamic from "next/dynamic";
import UnauthorizedPage from "./unauthorized";

export interface ClientSectionProperties {
  locations: LocationsWithUsers;
}

const LocationsMap = dynamic(() => import("./locations-map"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function ClientSection({ locations }: ClientSectionProperties) {
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

  return <LocationsMap locations={locations} />;
}
