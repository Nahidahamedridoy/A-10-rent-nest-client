import { Spinner } from "@heroui/react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
      </div>
    </div>
  );
}