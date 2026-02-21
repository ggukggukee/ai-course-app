import { ForgotPassword } from "@/components/reset-password/forgot-password";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Забыли пароль?",
  description: "Сброс пароля для доступа к вашему аккаунту",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <ForgotPassword />
    </div>
  );
}