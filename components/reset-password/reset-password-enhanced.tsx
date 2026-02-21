"use client";

import z from "zod";
import { Text } from "../design";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OTPInput } from "../otp-input";
import { Loader2, Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  otp: z.string().min(6, "Код должен содержать 6 цифр").max(6, "Код должен содержать 6 цифр"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
  confirmPassword: z.string().min(8, "Подтвердите пароль"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

interface ResetPasswordEnhancedProps {
  email: string;
  onBack?: () => void;
}

export function ResetPasswordEnhanced({ email, onBack }: ResetPasswordEnhancedProps) {
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (data: z.infer<typeof formSchema>) => {
    if (isResetting) return;

    setIsResetting(true);

    try {
      // First verify the OTP
      const { error: verifyError } = await authClient.emailOtp.checkVerificationOtp({
        email,
        type: "forget-password",
        otp: data.otp,
      });

      if (verifyError) {
        setIsResetting(false);
        toast.error("Неверный код. Проверьте код и попробуйте снова.");
        return;
      }

      // Reset the password
      const { error: resetError } = await authClient.emailOtp.resetPassword({
        email,
        otp: data.otp,
        password: data.password,
      });

      if (resetError) {
        setIsResetting(false);
        toast.error(resetError.message || "Произошла ошибка при сбросе пароля");
        return;
      }

      toast.success("Пароль успешно изменен! Теперь вы можете войти с новым паролем.");
      router.push("/sign-in");
    } catch (error) {
      setIsResetting(false);
      toast.error(error instanceof Error ? error.message : "Произошла ошибка при сбросе пароля");
    }
  };

  const handleResendCode = async () => {
    try {
      const { error } = await authClient.emailOtp.requestPasswordReset({
        email,
      });

      if (error) {
        toast.error("Ошибка при повторной отправке кода");
      } else {
        toast.success("Новый код отправлен на ваш email!");
      }
    } catch {
      toast.error("Ошибка при повторной отправке кода");
    }
  };

  const otp = useWatch({ control: form.control, name: "otp" });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Сброс пароля
        </CardTitle>
        <CardDescription>
          Введите код, отправленный на <strong>{email}</strong>, и новый пароль.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-6">
          {/* OTP Input */}
          <div className="space-y-2">
            <Label htmlFor="otp">Код подтверждения</Label>
            <OTPInput
              value={otp}
              onChange={(value) => form.setValue("otp", value)}
              disabled={isResetting}
              description="Код действителен в течение 10 минут. У вас есть 3 попытки для ввода."
            />
            {form.formState.errors.otp && (
              <Text size="sm" textColor="muted" className="text-red-500">
                {form.formState.errors.otp.message}
              </Text>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Новый пароль</Label>
            <div className="relative">
              <Input
                {...form.register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                disabled={isResetting}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                disabled={isResetting}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            {form.formState.errors.password && (
              <Text size="sm" textColor="muted" className="text-red-500">
                {form.formState.errors.password.message}
              </Text>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <div className="relative">
              <Input
                {...form.register("confirmPassword")}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                disabled={isResetting}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                disabled={isResetting}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <Text size="sm" textColor="muted" className="text-red-500">
                {form.formState.errors.confirmPassword.message}
              </Text>
            )}
          </div>
          <div className="w-full space-y-1">
            <Button type="submit" disabled={isResetting} size="lg" className="w-full">
              {isResetting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {isResetting ? "Сброс пароля..." : "Сбросить пароль"}
            </Button>
            {onBack && (<Button onClick={onBack} type="button" variant="outline" disabled={isResetting} size="lg" className="w-full">
              Назад
            </Button>)}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <button
          type="button"
          onClick={handleResendCode}
          className="text-sm text-primary hover:underline"
          disabled={isResetting}
        >
          Отправить код повторно
        </button>
        <Text size="sm" className="text-center">
          Вспомнили пароль?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Войти
          </Link>
        </Text>
      </CardFooter>
    </Card>
  );
}