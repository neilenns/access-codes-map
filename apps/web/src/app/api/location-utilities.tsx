import { LocationFormData, LocationFormDataSchema } from "@/schema/location";

export interface OnSubmitLocationState {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
  hasSubmitted: boolean;
}

export type TransformResult =
  | { success: true; data: LocationFormData }
  | {
      success: false;
      errors: Record<string, string[]>;
      fields: Record<string, string>;
    };

/**
 * Converts a value to a boolean.
 * @param value The value to convert
 * @returns The converted boolean value
 */
export const convertToBoolean = (value: unknown) => {
  return value === "true" || value === true;
};

/**
 * Converts a string value to a number, if possible
 * @param value - The value to convert
 * @returns The converted number or undefined if conversion is not possible
 */
export const convertToNumber = (value: unknown): number | undefined => {
  if (value === "") {
    return undefined;
  }

  const convertedValue = Number(value);
  if (Number.isNaN(convertedValue)) {
    return undefined;
  }

  return convertedValue;
};

export function transformFormData(payload: FormData): TransformResult {
  if (!(payload instanceof FormData)) {
    return {
      success: false,
      errors: { form: ["Invalid form data"] },
      fields: {},
    };
  }

  const locationFormData = Object.fromEntries(payload);
  const validatedData = LocationFormDataSchema.safeParse(locationFormData);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};
    for (const key of Object.keys(locationFormData)) {
      // eslint-disable-next-line security/detect-object-injection
      fields[key] = JSON.stringify(locationFormData[key]);
    }

    console.log(`Schema validation errors: ${JSON.stringify(errors)}`);

    return {
      success: false,
      fields,
      errors,
    };
  }

  return {
    success: true,
    data: validatedData.data,
  };
}
