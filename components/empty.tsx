import Image from "next/image";

interface EmptyProps {
  label: string;
  img?: string;
}

const Empty = ({ label, img = "empty" }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72 pointer-events-none user-selection-none">
        <Image src={`/${img}.svg`} alt="Empty" fill />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};

export default Empty;
