"use client";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMemo } from "react";
import Link from "next/link";

export function LevelButtons({
  bookPageId,
  levels,
  currentLevelId,
}: {
  levels: { id: number; title: string }[];
  currentLevelId: number;
  bookPageId: number;
}) {
  const currentLevel = useMemo(
    () => levels.find((l) => l.id === currentLevelId),
    [levels, currentLevelId],
  );

  const currentIndex = useMemo(
    () => levels.findIndex((l) => l.id === currentLevelId),
    [levels, currentLevelId],
  );

  const prevLevel = useMemo(
    () => (currentIndex > 0 ? levels[currentIndex - 1] : null),
    [levels, currentIndex],
  );

  const nextLevel = useMemo(
    () => (currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null),
    [levels, currentIndex],
  );

  if (levels.length < 2) return null;

  return (
    <div className='flex items-center justify-between text-center gap-2'>
      <Button
        variant='secondary'
        className={cn("rounded-full", !prevLevel && "invisible")}
        disabled={!prevLevel}
        asChild
      >
        <Link href={`/learn/${bookPageId}?level=${prevLevel?.id}`} replace>
          Назад
        </Link>
      </Button>
      {currentLevel && (
        <PopoverLevelMenu
          levels={levels}
          currentLevel={currentLevel}
          currentIndex={currentIndex}
          bookPageId={bookPageId}
        />
      )}
      <Button
        className={cn(
          "bg-purple-500 hover:bg-purple-600 text-white rounded-full",
          !nextLevel && "invisible",
        )}
        disabled={!nextLevel}
        asChild
      >
        <Link href={`/learn/${bookPageId}?level=${nextLevel?.id}`} replace>
          Далее
        </Link>
      </Button>
    </div>
  );
}

function PopoverLevelMenu({
  levels,
  currentLevel,
  currentIndex,
  bookPageId,
}: {
  levels: { id: number; title: string }[];
  currentLevel: { id: number; title: string };
  currentIndex: number;
  bookPageId: number;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='sm' className='rounded-full'>
          <div className='flex flex-col justify-center items-center text-center text-xs'>
            <p>{currentLevel.title}</p>
            <p className='text-muted-foreground'>
              {currentIndex + 1}
              {" из "}
              {levels.length}
            </p>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 overflow-hidden p-0 rounded-xl gap-0'>
        <div className='p-3 border-b'>
          <p className='text-sm font-medium'>
            Все уровни
            <span className='text-muted-foreground'>
              {" · "}
              {levels.length}
            </span>
          </p>
        </div>
        <div className='max-h-80 overflow-y-auto'>
          {levels.map((lvl) => (
            <Button
              key={lvl.id}
              variant='ghost'
              size='sm'
              className={cn(
                'rounded-none h-auto items-start whitespace-pre-line justify-start font-normal',
                "w-full text-left p-3 hover:bg-purple-50 hover:dark:bg-purple-900 transition-colors border-b last:border-b-0",
                currentLevel?.id === lvl.id &&
                "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-white",
              )}
              asChild
            >
              <Link href={`/learn/${bookPageId}?level=${lvl.id}`} replace>
                {lvl.title}
              </Link>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
