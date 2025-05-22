import { handleDeleteLocation } from "@/api/delete-location";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteLocationStore } from "@/hooks/use-delete-location-store";

const handleDeleteClick = async (id: number): Promise<boolean> => {
  try {
    await handleDeleteLocation(id);
    return true;
  } catch (error) {
    console.error("Error deleting location:", error);
    return false;
  }
};

export default function DeleteLocationDialog() {
  const { isOpen, selectedLocation, closeDialog } = useDeleteLocationStore();

  if (!selectedLocation?.id) {
    return;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete location</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <i>{selectedLocation.title}</i>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              closeDialog();
              void handleDeleteClick(selectedLocation.id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
