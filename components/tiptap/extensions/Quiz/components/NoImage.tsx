import { cn } from "@/lib/utils";

export function NoImage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full aspect-video flex items-center justify-center bg-muted text-xs rounded-lg",
        className
      )}
    >
      <p className='text-muted-foreground'>Без изображения</p>
    </div>
  );
}
