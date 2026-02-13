"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Text } from "./typography";
import { Logo } from "../icons";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export const LINKS = [
  {
    href: "/dashboard",
    label: "Главная",
  },
  {
    href: "/learn",
    label: "Обучение",
  },
  {
    href: "/orders",
    label: "Заказы",
  },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <nav className='border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-6 md:gap-10'>
          <Link href='/' className='flex items-center space-x-2'>
            <Logo className='h-8 text-purple-500 group-hover:text-brand-lavender transition-colors' />
          </Link>
          <div className='hidden md:flex items-center gap-6'>
            <ThemeToggle />
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='transition-colors hover:text-primary'
              >
                <Text as='span' size='sm' weight='medium'>
                  {link.label}
                </Text>
              </Link>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='hidden md:flex items-center gap-4'>
            {!isPending && (
              <>
                {session ? (
                  <div className='flex items-center gap-4'>
                    <Text
                      as='span'
                      size='sm'
                      textColor='muted'
                      className='hidden sm:inline-block'
                    >
                      {session.user.name}
                    </Text>
                    <Button variant='outline' size='sm' onClick={handleSignOut}>
                      Выйти
                    </Button>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='sm' asChild>
                      <Link href='/sign-in'>Войти</Link>
                    </Button>
                    <Button size='sm' asChild>
                      <Link href='/sign-up'>Зарегистрироваться</Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
