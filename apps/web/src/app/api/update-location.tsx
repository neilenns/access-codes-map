"use server";

import { OnSubmitLocationState, transformFormData } from "./location-utilities";

export const updateLocation = async (
  _previous: OnSubmitLocationState,
  payload: FormData,
): Promise<OnSubmitLocationState> => {
  const parsed = transformFormData(payload);

  if (!parsed.success) {
    return {
      success: false,
      hasSubmitted: true,
      message: "Validation failed",
      fields: parsed.fields,
      errors: parsed.errors,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    hasSubmitted: true,
    message: "Location updated successfully",
  };
};
