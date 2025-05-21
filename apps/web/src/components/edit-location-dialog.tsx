import { OnSubmitLocationState } from "@/app/api/location-utilities";
import { updateLocation } from "@/app/api/update-location";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditLocationStore } from "@/hooks/use-edit-location-store";
import { LocationFormData, LocationFormDataSchema } from "@/schema/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

const initialFormState: OnSubmitLocationState = {
  success: false,
  message: "",
  hasSubmitted: false,
};

export default function EditLocationDialog() {
  const { isOpen, selectedLocation, closeDialog } = useEditLocationStore();
  const [formState, formAction, isPending] = useActionState(
    updateLocation,
    initialFormState,
  );

  const form = useForm<LocationFormData>({
    resolver: zodResolver(LocationFormDataSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (isOpen) {
      if (!selectedLocation) {
        return;
      }
      form.reset({
        id: selectedLocation.id,
        title: selectedLocation.title,
        note: selectedLocation.note ?? "",
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        hasToilet: selectedLocation.hasToilet,
      });
    }
  }, [isOpen, selectedLocation, form]);

  useEffect(() => {
    if (formState.success && formState.hasSubmitted) {
      closeDialog();
    }
  }, [formState.success, formState.hasSubmitted, closeDialog]);

  const isEditing = selectedLocation !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <form action={formAction} aria-label="Location edit form">
          <fieldset disabled={isPending} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit location" : "Add location"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the details for this location."
                  : "Enter the details for this location."}
              </DialogDescription>
            </DialogHeader>
            <input type="hidden" {...form.register("id")} />
            <input type="hidden" {...form.register("latitude")} />
            <input type="hidden" {...form.register("longitude")} />
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Location</Label>
              <Input id="title" {...form.register("title")} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="note">Note</Label>
              <Textarea id="note" {...form.register("note")} />
            </div>
            {formState.hasSubmitted && !formState.success && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{formState.message}</AlertDescription>
              </Alert>
            )}
            <DialogFooter>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  disabled={isPending}
                  onClick={closeDialog}
                >
                  Cancel
                </Button>
                {isPending ? (
                  <Button disabled className="w-[120px]" type="submit">
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    <span className="sr-only">
                      {isEditing ? "Updating..." : "Adding..."}
                    </span>
                    {isEditing ? "Updating..." : "Adding..."}
                  </Button>
                ) : (
                  <Button variant="default" className="w-[120px]" type="submit">
                    {isEditing ? "Update" : "Add"}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
}
