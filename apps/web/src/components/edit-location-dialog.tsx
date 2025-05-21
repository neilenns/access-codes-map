import {
  Dialog,
  DialogContent,
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
      <DialogHeader>
        <DialogTitle>
          {isEditing ? "Edit location" : "Add location"}
        </DialogTitle>
      </DialogHeader>
      <DialogContent>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Location</Label>
          <Input id="title" defaultValue={selectedLocation?.title ?? ""} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="note">Note</Label>
          <Textarea id="note" defaultValue={selectedLocation?.note ?? ""} />
        </div>
      </DialogContent>
      <DialogFooter>
        <div>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="default">
            {isEditing ? "Save changes" : "Create location"}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
