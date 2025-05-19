import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-xl space-y-6">
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <DoorOpen width="80" height="80" />
            <span className="text-6xl font-semibold">Access codes</span>
          </div>
        </div>
        <Button size="lg" asChild>
          {/* This is an <a> instead of a <Link> so it works with Auth0 routing. */}
          <a href="/map">Launch the map</a>
        </Button>
      </div>
    </main>
  );
}
