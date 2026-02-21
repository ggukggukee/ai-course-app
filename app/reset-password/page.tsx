import { ResetPasswordEnhanced } from "@/components/reset-password/reset-password-enhanced";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Text } from "@/components/design";

export const metadata: Metadata = {
  title: "Сброс пароля",
  description: "Введите новый пароль для вашего аккаунта",
};

function ResetPasswordContent({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email;

  if (!email) {
    return (
      <div className="w-full sm:max-w-md mx-auto text-center space-y-4">
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/40 rounded-full">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <Text size="lg" weight="semibold" className="mb-2">
            Недействительная ссылка
          </Text>
          <Text size="sm" textColor="muted" className="mb-4">
            Ссылка для сброса пароля недействительна или истекла.
          </Text>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          Запросить новую ссылку для сброса пароля
        </Link>
      </div>
    );
  }

  return <ResetPasswordEnhanced email={email} />;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Suspense fallback={<div>Загрузка...</div>}>
        <ResetPasswordContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}