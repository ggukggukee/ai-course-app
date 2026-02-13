"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  FieldValues,
  Path,
  DefaultValues,
  Resolver,
} from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CardFormField<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  description?: string;
  type?: string;
}

interface CardFormProps<T extends FieldValues> {
  title: string;
  description: string;
  defaultValues: DefaultValues<T>;
  fields: CardFormField<T>[];
  action: (data: T) => Promise<{ message?: string }>;
  footer?: React.ReactNode;
  formSchema: z.ZodSchema<T>;
  buttonText?: string;
  buttonLoadingText?: string;
}

export function CardForm<T extends FieldValues>({
  title,
  description,
  defaultValues,
  fields,
  action,
  footer,
  formSchema,
  buttonText = "Отправить",
  buttonLoadingText = "Отправка...",
}: CardFormProps<T>) {
  const [submitting, setSubmitting] = useState(false);

  // Use typed resolver helper to avoid zodResolver type conflicts
  const form = useForm<T>({
    resolver: createTypedResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: T) => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const result = await action(data);

      if (typeof result === "object" && result !== null && "message" in result && result.message) {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ошибка при отправке формы",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='form-rhf-input' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {fields.map((fieldConfig, index) => (
              <Controller
                key={`${String(fieldConfig.name)}-${index}`}
                name={fieldConfig.name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={String(fieldConfig.name)}>
                      {fieldConfig.label}
                    </FieldLabel>
                    <Input
                      {...field}
                      value={String(field.value || "")}
                      id={String(fieldConfig.name)}
                      type={fieldConfig.type ?? "text"}
                      aria-invalid={fieldState.invalid}
                      placeholder={fieldConfig.placeholder}
                      autoComplete={fieldConfig.autoComplete ?? "off"}
                    />
                    {fieldConfig.description && (
                      <FieldDescription>{fieldConfig.description}</FieldDescription>
                    )}
                    {fieldState.invalid && fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Field orientation='horizontal'>
          <Button type='submit' form='form-rhf-input' disabled={submitting} size='lg' className="w-full">
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? buttonLoadingText : buttonText}
          </Button>
        </Field>
        {footer}
      </CardFooter>
    </Card>
  );
}

// Helper function to create a typed resolver that bypasses type conflicts
function createTypedResolver<T extends FieldValues>(schema: z.ZodSchema<T>): Resolver<T> {
  // Use type assertion to bypass zodResolver compatibility issues
  return (zodResolver as unknown as (schema: z.ZodSchema<T>) => Resolver<T>)(schema);
}