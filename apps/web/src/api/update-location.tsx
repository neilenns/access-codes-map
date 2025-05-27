"use server";

import { addLocation, updateLocation } from "@/db/locations";
import { getAuth0Client } from "@/lib/auth0";
import { revalidatePath } from "next/cache";
import { OnSubmitLocationState, transformFormData } from "./location-utilities";

export const handleUpdateLocation = async (
  _previous: OnSubmitLocationState,
  payload: FormData,
): Promise<OnSubmitLocationState> => {
  const parsed = transformFormData(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed",
      isSubmitted: true,
      fields: parsed.fields,
      errors: parsed.errors,
    };
  }

  const session = await getAuth0Client().getSession();
  if (!session) {
    return {
      success: false,
      isSubmitted: true,
      message: "User not authenticated",
    };
  }

  // If there's no id it means it's a new location so set the createdById to the current user.
  if (!parsed.data.id) {
    parsed.data.createdById = session.user.sub;
  }
  parsed.data.modifiedById = session.user.sub;

  try {
    await (parsed.data.id
      ? updateLocation(parsed.data)
      : addLocation(parsed.data));
  } catch (error) {
    console.error(
      `Error ${parsed.data.id ? "updating" : "creating"} location:`,
      error,
    );
    return {
      success: false,
      isSubmitted: true,
      message: `Failed to ${parsed.data.id ? "update" : "create"} location`,
    };
  }

  revalidatePath("/map");

  return {
    success: true,
    isSubmitted: true,
    message: `Location ${parsed.data.id ? "updated" : "created"} successfully`,
  };
};
