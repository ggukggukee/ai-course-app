"use client";

import { useState } from "react";
import { ForgotPasswordForm } from "./forgot-password-form";
import { ResetPasswordEnhanced } from "./reset-password-enhanced";

type ForgotPasswordStep = "request" | "reset";

export function ForgotPassword() {
  const [step, setStep] = useState<ForgotPasswordStep>("request");
  const [email, setEmail] = useState<string>("");

  const handleEmailSent = (sentEmail: string) => {
    setEmail(sentEmail);
    setStep("reset");
  };

  const handleBack = () => {
    setStep("request");
  };

  return (
    <>
      {step === "request" && (
        <ForgotPasswordForm onEmailSent={handleEmailSent} />
      )}
      {step === "reset" && (
        <ResetPasswordEnhanced email={email} onBack={handleBack} />
      )}
    </>
  );
}