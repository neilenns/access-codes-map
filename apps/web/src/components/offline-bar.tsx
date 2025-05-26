import { useOnlineStatus } from "@/hooks/use-online-status";

export default function OfflineBar() {
  const isOnline = useOnlineStatus();

  return (
    !isOnline && (
      <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white text-center p-2 z-[1000]">
        Offline
      </div>
    )
  );
}
