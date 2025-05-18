"use client";

import { Permissions } from "@/types/permissions";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useMemo, useState } from "react";

interface UseCheckPermissionsResult {
  permissionsStatus: Record<Permissions, boolean>;
  isLoading: boolean;
  error?: Error;
}

/**
 * Custom hook to check for a specific set of permissions from the user's session.
 *
 * @param permissionsToVerify A single permission or an array of permission strings (from Permissions enum) to check.
 * @returns An object containing the status of each requested permission,
 *          loading state, and error state.
 *
 * @example
 * // Single permission
 * const { permissionsStatus, isLoading, error } = useCheckPermissions(Permissions.ReadData);
 * if (!isLoading && permissionsStatus[Permissions.ReadData]) {
 *   // User can read data
 * }
 *
 * // Multiple permissions
 * const { permissionsStatus: multiStatus, isLoading: multiIsLoading, error: multiError } = useCheckPermissions([Permissions.ReadData, Permissions.WriteData]);
 * if (!multiIsLoading && multiStatus[Permissions.WriteData]) {
 *  // User can write data
 * }
 */
export function useCheckPermissions(
  permissionsToVerify: Permissions | Permissions[],
): UseCheckPermissionsResult {
  const permissionsArray = useMemo(
    () =>
      Array.isArray(permissionsToVerify)
        ? permissionsToVerify
        : [permissionsToVerify],
    [permissionsToVerify],
  );

  // Check if authentication/authorization is disabled via environment variable
  // Only allow disabling auth in development mode.
  const isAuthDisabledInDev =
    process.env.NEXT_PUBLIC_DISABLE_AUTH === "true" &&
    process.env.NODE_ENV === "development";

  if (isAuthDisabledInDev) {
    // If auth is disabled in dev, grant all requested permissions immediately
    const allPermissionsGranted = permissionsArray.reduce(
      (acc, permission) => {
        acc[permission] = true;
        return acc;
      },
      {} as Record<Permissions, boolean>,
    );
    return {
      permissionsStatus: allPermissionsGranted,
      isLoading: false,
      error: undefined,
    };
  }

  // Original hook logic for when auth is enabled or in production
  const { user, error: userError, isLoading: userIsLoading } = useUser();

  // Memoize initial status creation to prevent re-running if permissionsToVerify reference changes unnecessarily
  const initialStatus = useMemo(() => {
    return permissionsArray.reduce(
      (acc, permission) => {
        acc[permission] = false;
        return acc;
      },
      {} as Record<Permissions, boolean>,
    );
  }, [permissionsArray]);

  const [permissionsStatus, setPermissionsStatus] =
    useState<Record<Permissions, boolean>>(initialStatus);
  // isLoading state for this hook, distinct from useUser's isLoading,
  // but driven by it.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    console.log("useCheckPermissions effect triggered");
    // This effect only runs if isAuthDisabled is false (due to the early return above)
    if (userIsLoading) {
      setIsLoading(true);
      setError(undefined);
      // Reset to initial state based on current permissionsArray
      setPermissionsStatus(
        permissionsArray.reduce(
          (acc, permission) => {
            acc[permission] = false;
            return acc;
          },
          {} as Record<Permissions, boolean>,
        ),
      );
      return;
    }

    if (userError) {
      setIsLoading(false);
      setError(userError);
      setPermissionsStatus(
        permissionsArray.reduce(
          (acc, permission) => {
            acc[permission] = false;
            return acc;
          },
          {} as Record<Permissions, boolean>,
        ),
      );
      return;
    }

    // User data is loaded and no error from useUser
    setIsLoading(false);
    setError(undefined);

    if (user) {
      // Use direct user.permissions as indicated
      const userActualPermissions = (user.permissions as Permissions[]) || [];

      const newStatus = permissionsArray.reduce(
        (acc, permissionKey) => {
          acc[permissionKey] = userActualPermissions.includes(permissionKey);
          return acc;
        },
        {} as Record<Permissions, boolean>,
      );
      setPermissionsStatus(newStatus);
    } else {
      // No user session, all requested permissions are considered false.
      setPermissionsStatus(
        permissionsArray.reduce(
          (acc, permission) => {
            acc[permission] = false;
            return acc;
          },
          {} as Record<Permissions, boolean>,
        ),
      );
    }
  }, [user, userError, userIsLoading, permissionsArray]);

  return { permissionsStatus, isLoading, error };
}
