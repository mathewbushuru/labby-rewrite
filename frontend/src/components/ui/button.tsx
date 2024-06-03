import * as React from "react";

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, buttonProps>(
  ({ disabled, children, ...props }, ref) => (
    <button
      className={`rounded-md bg-primary px-8 py-1.5 text-white hover:bg-opacity-85 outline-none ${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  ),
);

export const OutlineButton = React.forwardRef<HTMLButtonElement, buttonProps>(
  ({ disabled, children, ...props }, ref) => (
    <button
      className={`rounded-md bg-inherit border px-8 py-1.5 text-prinmaryBlack border-gray hover:bg-blue-200/10 outline-none ${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  ),
);

export function PrimaryButtonLink({ children, ...props }: buttonProps) {
  return (
    <button className="text-primaryDark hover:underline" {...props}>
      {children}
    </button>
  );
}

export function SecondaryButtonLink({ children, ...props }: buttonProps) {
  return (
    <button className=" text-gray hover:underline" {...props}>
      {children}
    </button>
  );
}
