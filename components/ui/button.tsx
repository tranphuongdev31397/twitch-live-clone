import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LucideIcon, LucideProps, SwordIcon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-primary text-secondary-foreground hover:bg-primary/80",
        teal: "bg-teal-500 text-secondary-foreground hover:bg-teal-500/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
const iconVariants = cva("", {
  variants: {
    iconSize: {
      default: "h-5 w-5",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      lucide: "",
    },
  },
  defaultVariants: {
    iconSize: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof iconVariants> {
  asChild?: boolean;
  loading?: boolean;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  loadingPosition?: "start" | "end";
  iconProps?: LucideProps;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconSize,
      asChild = false,
      loading,
      startIcon,
      endIcon,
      disabled = false,
      loadingPosition = "start",
      children,
      iconProps,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const renderIcon = (icon: LucideIcon, isLoading: boolean = false) => {
      let Icon = icon;
      const { className, ...restIcon } = iconProps || {};
      return (
        <Icon
          className={cn(
            {
              "animate-spin": isLoading,
            },
            iconVariants({ iconSize }),
            className
          )}
          {...restIcon}
        />
      );
    };
    const startLoading = loading && loadingPosition === "start" && !startIcon;
    const endLoading = loading && loadingPosition === "end" && !endIcon;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        <div className="flex flex-row items-center gap-x-2">
          {startIcon && renderIcon(startIcon)}
          {startLoading && renderIcon(SwordIcon, startLoading)}
          {children}
          {endLoading && !endIcon && renderIcon(SwordIcon, endLoading)}
          {endIcon && renderIcon(endIcon)}
        </div>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
