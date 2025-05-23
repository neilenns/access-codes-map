import { OnSubmitLocationState } from "@/api/location-utilities";
import { handleUpdateLocation } from "@/api/update-location";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEditLocationStore } from "@/hooks/use-edit-location-store";
import {
  LocationFormData,
  LocationFormDataSchema,
} from "@/schema/location-form-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const initialFormState: OnSubmitLocationState = {
  success: false,
  message: "",
  isSubmitted: false,
};

export default function EditLocationDialog() {
  const { isOpen, selectedLocation, closeDialog } = useEditLocationStore();
  const [formState, formAction, isPending] = useActionState(
    handleUpdateLocation,
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
    if (!formState.isSubmitted) {
      return;
    }

    if (formState.success) {
      toast.success("Location saved successfully");
    } else {
      toast.error(formState.message);
    }

    closeDialog();
  }, [
    formState.success,
    closeDialog,
    formState.isSubmitted,
    formState.message,
  ]);

  // This is really dumb, but without it the boolean properties from the switches
  // don't get passed as formData.
  const handleSubmit = () => {
    const values = form.getValues();
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, String(value));
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  const isEditing = selectedLocation?.id !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            aria-label="Location edit form"
          >
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
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasToilet"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Has toilet</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        id={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {formState.isSubmitted && !formState.success && (
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
                    <Button
                      variant="default"
                      className="w-[120px]"
                      type="submit"
                    >
                      {isEditing ? "Update" : "Add"}
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </fieldset>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
