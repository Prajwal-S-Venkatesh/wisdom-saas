import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full gap-y-4 flex flex-col items-center justify-center">
      <div className="relative h-10 w-10 animate-spin user-select-none pointer-events-none">
        <Image src="/logo.png" alt="Loader" fill />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        Wisdom is thinking...
      </p>
    </div>
  );
};
