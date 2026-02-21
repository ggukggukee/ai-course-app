"use client";

import { useRef, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./design";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  description?: string;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  className,
  description
}: OTPInputProps) {
  const otp = value.split("").slice(0, length);
  while (otp.length < length) {
    otp.push("");
  }
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (disabled) return;

    // Only allow digits
    if (digit && !/^\d$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;

    // Update parent component
    onChange(newOtp.join(""));

    // Move to next input if digit is entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        onChange(newOtp.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, length);

    const newOtp = Array(length).fill("");
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }

    onChange(newOtp.join(""));

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === "");
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="w-full space-y-2">
      <div className={cn("flex gap-2 justify-center", className)}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "w-full h-12 text-center text-lg font-semibold",
              "border border-border rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200",
              digit && "border-primary bg-primary/5"
            )}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      {description && <Text size="xs" textColor="muted">{description}</Text>}
    </div>
  );
}