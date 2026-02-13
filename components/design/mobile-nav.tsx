"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Text } from "./typography";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LINKS } from "./navbar";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          setOpen(false);
        },
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className='md:hidden relative z-10 p-2 text-foreground bg-background border border-border rounded-lg hover:bg-accent transition-colors'>
          <Menu className='w-6 h-6' />
        </button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='w-full bg-background border-border p-0'
      >
        <SheetTitle className='sr-only'>Навигация</SheetTitle>
        <div className='flex flex-col h-full'>
          {/* Header inside Mobile Menu */}
          <div className='flex items-center justify-between px-4 py-6 border-b border-border'>
            <Link href='/' onClick={() => setOpen(false)} className="h-[42px] flex items-center justify-start">
              <Logo className='h-8 text-purple-500' />
            </Link>
          </div>

          <div className='relative flex-1 p-6 flex flex-col gap-6 overflow-y-auto'>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-2xl font-semibold text-foreground p-2 transition-all hover:text-primary active:scale-95'
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className='mt-auto relative z-10 flex flex-col gap-4'>
              {!isPending && (
                <>
                  {session ? (
                    <div className='flex flex-col gap-4'>
                      <Text
                        as='div'
                        size='lg'
                        weight='medium'
                        className='text-center p-4 bg-accent rounded-lg'
                      >
                        {session.user.name}
                      </Text>
                      <Button
                        variant='outline'
                        size='lg'
                        onClick={handleSignOut}
                        className='w-full h-12 text-lg'
                      >
                        Выйти
                      </Button>
                    </div>
                  ) : (
                    <div className='flex flex-col gap-3'>
                      <Button
                        variant='ghost'
                        size='lg'
                        className='w-full h-12 text-lg'
                        onClick={() => setOpen(false)}
                        asChild
                      >
                        <Link href='/sign-in'>Войти</Link>
                      </Button>
                      <Button
                        size='lg'
                        className='w-full h-12 text-lg'
                        onClick={() => setOpen(false)}
                        asChild
                      >
                        <Link href='/sign-up'>Зарегистрироваться</Link>
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};