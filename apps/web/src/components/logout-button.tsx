import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Control from "react-leaflet-custom-control";

export function LogoutButton() {
  return (
    <Control position="bottomleft">
      <Button variant="outline" aria-label="Logout" asChild>
        <a href="/auth/logout">
          <LogOutIcon className="text-black" />
          <span className="sr-only">Logout</span>
        </a>
      </Button>
    </Control>
  );
}
