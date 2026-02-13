import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    size: {
      h1: "text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
      h2: "text-4xl md:text-5xl lg:text-6xl",
      h3: "text-2xl md:text-4xl",
      h4: "text-2xl md:text-3xl",
      h5: "text-xl md:text-2xl",
      h6: "text-lg md:text-xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    textColor: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "h3",
    weight: "bold",
    textColor: "default",
  },
});

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    textColor: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    textColor: "default",
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof textVariants> { }

export const Heading = ({
  className,
  size,
  weight,
  textColor,
  as = "h2",
  children,
  ...props
}: HeadingProps) => {
  const Component = as;

  return (
    <Component
      className={cn(headingVariants({ size, weight, textColor }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Text = ({
  className,
  size,
  weight,
  textColor,
  children,
  ...props
}: TextProps) => {
  return (
    <p
      className={cn(textVariants({ size, weight, textColor }), className)}
      {...props}
    >
      {children}
    </p>
  );
};
