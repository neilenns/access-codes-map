"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LocationFormData } from "@/schema/location-form-data";
import { ControllerRenderProps, FieldPath } from "react-hook-form";

// Utility type to extract keys of T whose values are booleans
type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

interface FormSwitchProperties {
  field: ControllerRenderProps<
    LocationFormData,
    BooleanKeys<LocationFormData> & FieldPath<LocationFormData>
  >;
  children?: React.ReactNode;
}

export function ReactFormSwitch({ field, children }: FormSwitchProperties) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={field.value}
        onCheckedChange={field.onChange}
        aria-label={field.name}
      />
      {children && <Label htmlFor={field.name}>{children}</Label>}
      <input
        type="hidden"
        name={field.name}
        value={field.value ? "true" : "false"}
      />
    </div>
  );
}
