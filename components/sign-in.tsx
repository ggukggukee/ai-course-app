"use client";

import z from "zod";
import { CardForm } from "./card-form";
import { Text } from "./design";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export function SignIn() {
  const router = useRouter();

  const handleSignIn = async (data: z.infer<typeof formSchema>) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
    });

    if (error) {
      return { message: error.message || "Неверный email или пароль" };
    } else {
      toast.success("Вы успешно вошли в аккаунт!");
      router.push("/dashboard");
      return {};
    }
  };

  return (
    <CardForm
      buttonText="Войти"
      buttonLoadingText="Загрузка..."
      title='Войти'
      description='Введите ваш email и пароль для доступа к вашему аккаунту'
      formSchema={formSchema}
      defaultValues={{ email: "", password: "" }}
      fields={[
        { name: "email", label: "Email", type: "email", autoComplete: "email" },
        { name: "password", label: "Пароль", type: "password", autoComplete: "current-password" },
      ]}
      footer={
        <Text size='sm' className='text-center'>
          Нет аккаунта?{" "}
          <Link href='/sign-up' className='text-primary hover:underline'>
            Зарегистрироваться
          </Link>
        </Text>
      }
      action={(data) => handleSignIn(data)}
    />
  );
}
