import { SignUp } from "@/components/sign-up";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Регистрация в систему",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12'>
      <SignUp />
    </div>
  );
}
