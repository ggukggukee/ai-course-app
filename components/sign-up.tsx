"use client";

import z from "zod";
import { CardForm } from "./card-form";
import { Text } from "./design";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export function SignUp() {
  const router = useRouter();

  const handleSignUp = async (data: z.infer<typeof formSchema>) => {
    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: "/dashboard",
    });

    if (error) {
      return { message: error.message || "Неверный email или пароль" };
    } else {
      toast.success("Аккаунт успешно создан!");
      router.push("/dashboard");
      return {};
    }
  };

  return (
    <CardForm
      buttonText="Зарегистрироваться"
      buttonLoadingText="Загрузка..."
      title='Зарегистрироваться'
      description='Введите ваше имя, email и пароль для создания аккаунта'
      formSchema={formSchema}
      defaultValues={{ name: "", email: "", password: "" }}
      fields={[
        { name: "name", label: "Имя", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Пароль", type: "password" },
      ]}
      footer={
        <Text size='sm' className='text-center'>
          Уже есть аккаунт?{" "}
          <Link href='/sign-in' className='text-primary hover:underline'>
            Войти
          </Link>
        </Text>
      }
      action={(data) => handleSignUp(data)}
    />
  );
}
