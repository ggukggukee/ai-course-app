"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Text } from "./typography";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { UserFlowSchema } from "@/lib/db/user/schema";
import { getUserByEmail } from "@/lib/db/user/data";
import { buyItem } from "@/lib/db/order/actions";
import { registerUser } from "@/lib/db/user/actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const ITEM_ID = 1;

export function BuyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof UserFlowSchema>>({
    resolver: zodResolver(UserFlowSchema),
    defaultValues: {
      step: "email",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFlowSchema>) {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const { step } = values;

    try {
      if (step === "email") {
        const user = await getUserByEmail({ email: values.email });

        if (user) {
          form.setValue("step", "existing");
          form.setValue("email", user.email);
        } else {
          form.setValue("step", "register");
          form.setValue("email", values.email);
          form.setValue("name", "");
          form.setValue("password", "");
        }
      }

      if (step === "existing") {
        const action = await buyItem({ itemId: ITEM_ID, email: values.email });

        if ("message" in action) {
          throw new Error(action.message);
        }

        window.location.replace(action.url);
      }

      if (step === "register") {
        const action1 = await registerUser({ body: values });

        if ("message" in action1) {
          throw new Error(action1.message);
        }

        const action2 = await buyItem({ itemId: ITEM_ID, email: values.email });

        if ("message" in action2) {
          throw new Error(action2.message);
        }

        window.location.replace(action2.url);
      }
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  }

  const step = useWatch({ control: form.control, name: "step" });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='relative z-10 space-y-8'
    >
      <Controller
        name='email'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              {...field}
              id='email'
              aria-invalid={fieldState.invalid}
              placeholder='example@gmail.com'
              autoComplete='email'
              className='h-12 bg-transparent border-white/10'
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {step === "register" && (
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='name'>Ваше имя</FieldLabel>
              <Input
                {...field}
                id='name'
                aria-invalid={fieldState.invalid}
                placeholder='Имя'
                autoComplete='name'
                className='h-12 bg-transparent border-white/10'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}
      {step === "register" && (
        <Controller
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='password'>Пароль</FieldLabel>
              <Input
                {...field}
                id='password'
                type='password'
                aria-invalid={fieldState.invalid}
                placeholder='Пароль'
                autoComplete='new-password'
                className='h-12 bg-transparent border-white/10'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}
      {step === "existing" && (
        <Text size='sm' className='text-center text-white mx-auto'>
          У вас уже есть аккаунт. При нажатии на кнопку вы будете перенаправлены
          на страницу оплаты
        </Text>
      )}
      <div className='flex flex-col gap-3 items-center justify-center'>
        <Button
          type='submit'
          className='w-full h-16 rounded-2xl bg-linear-to-r from-brand-blue to-brand-lavender hover:opacity-90 text-white font-bold text-xl shadow-xl shadow-brand-blue/20 transition-all hover:scale-[1.02] active:scale-95'
          disabled={isLoading}
        >
          {isLoading && <Loader2 className='size-5 animate-spin' />}
          {isLoading && "Загрузка..."}
          {!isLoading && (step === "email" ? "Продолжить" : "Купить")}
        </Button>
        {error && (
          <Text size='sm' className='text-center text-red-500 mx-auto'>
            {error}
          </Text>
        )}
        <Text size='xs' className='text-center text-slate-500 font-medium'>
          Нажимая на кнопку, вы даете{" "}
          <a
            href='https://www.altanschool.ru/legal/consent_for_personal_data.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-brand-lavender transition-colors underline'
          >
            согласие на обработку персональных данных
          </a>
        </Text>
      </div>
    </form>
  );
}
