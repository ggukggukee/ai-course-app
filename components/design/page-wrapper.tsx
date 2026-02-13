import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Text } from "./typography";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  showNavbar?: boolean;
  className?: string;
  noContainer?: boolean;
}

export function PageWrapper({ children, showNavbar = true, className, noContainer = false }: PageWrapperProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className={cn("flex-1 space-y-8 mx-auto py-12 w-full", noContainer ? '' : 'container px-4', className)}>
        {children}
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
          <Text size="sm" textColor="muted" className="text-center md:text-left">
            Built by AI Course. All rights reserved.
          </Text>
        </div>
      </footer>
    </div>
  );
}
