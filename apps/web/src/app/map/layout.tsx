import { Spinner } from "@/components/ui/spinner";
import { useCheckPermissions } from "@/hooks/use-check-permissions";
import { Permissions } from "@/types/permissions";
import type { Metadata } from "next";
import UnauthorizedPage from "./unauthorized";

export const metadata: Metadata = {
  title: "Access codes map",
  description: "Map of building access codes for gig workers",
};

export default function RootLayout({
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

  return <div>{children}</div>;
}
