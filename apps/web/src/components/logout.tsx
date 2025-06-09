import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Control from "react-leaflet-custom-control";

export function LogoutButton() {
  return (
    <Control position="bottomleft">
      <Button variant="outline" asChild>
        <a href="/auth/logout">
          <LogOutIcon className="text-black" />
        </a>
      </Button>
    </Control>
  );
}
