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
import { Button } from "./ui/button";

export default function EditLocationDialog() {
  const { isOpen, selectedLocation, closeDialog } = useEditLocationStore();

  const isEditing = selectedLocation !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
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
        <input type="hidden" name="id" defaultValue={selectedLocation?.id} />
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Location</Label>
          <Input
            id="title"
            name="title"
            defaultValue={selectedLocation?.title ?? ""}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="note">Note</Label>
          <Textarea id="note" defaultValue={selectedLocation?.note ?? ""} />
        </div>
        <DialogFooter>
          <div>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="default">{isEditing ? "Save" : "Add"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
