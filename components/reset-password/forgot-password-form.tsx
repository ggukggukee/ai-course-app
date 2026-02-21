"use client";

import z from "zod";
import { CardForm } from "../card-form";
import { Text } from "../design";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  email: z.email("Пожалуйста, введите корректный email адрес"),
});

interface ForgotPasswordFormProps {
  onEmailSent?: (email: string) => void;
}

export function ForgotPasswordForm({ onEmailSent }: ForgotPasswordFormProps) {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleForgotPassword = async (data: z.infer<typeof formSchema>) => {
    try {
      const { error } = await authClient.emailOtp.requestPasswordReset({
        email: data.email,
      });

      if (error) {
        return { message: error.message || "Произошла ошибка при отправке письма" };
      } else {
        setIsEmailSent(true);
        onEmailSent?.(data.email);
        toast.success("Код для сброса пароля отправлен на ваш email!");
        return {};
      }
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : "Произошла ошибка при отправке письма"
      };
    }
  };

  if (isEmailSent) {
    return (
      <div className="w-full sm:max-w-md mx-auto text-center space-y-4">
        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900/40 rounded-full">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <Text size="lg" weight="semibold" className="mb-2">
            Письмо отправлено!
          </Text>
          <Text size="sm" textColor="muted" className="mb-4">
            Мы отправили код для сброса пароля на ваш email. Проверьте почту и следуйте инструкциям.
          </Text>
          <Text size="xs" textColor="muted">
            Не получили письмо? Проверьте папку &quot;Спам&quot; или попробуйте еще раз через несколько минут.
          </Text>
        </div>
        <Link
          href="/sign-in"
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          ← Вернуться к входу
        </Link>
      </div>
    );
  }

  return (
    <CardForm
      buttonText="Отправить код"
      buttonLoadingText="Отправка..."
      title="Забыли пароль?"
      description="Введите ваш email адрес, и мы отправим вам код для сброса пароля"
      formSchema={formSchema}
      defaultValues={{ email: "" }}
      fields={[
        {
          name: "email",
          label: "Email",
          type: "email",
          autoComplete: "email",
          placeholder: "example@domain.com",
          description: "Код для сброса пароля будет действителен в течение 10 минут"
        },
      ]}
      footer={
        <div className="space-y-2">
          <Text size="sm" className="text-center">
            Вспомнили пароль?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Войти
            </Link>
          </Text>

        </div>
      }
      action={(data) => handleForgotPassword(data)}
    />
  );
}