"use server";

import { updateLocation } from "@/db/locations";
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

  // parsed.data.modifiedById = session.user.sub;
  parsed.data.modifiedById = "u1";

  try {
    await updateLocation(parsed.data);
  } catch (error) {
    console.error("Error updating location:", error);
    return {
      success: false,
      isSubmitted: true,
      message: "Failed to update location",
    };
  }

  revalidatePath("/map");

  return {
    success: true,
    isSubmitted: true,
    message: "Location updated successfully",
  };
};
