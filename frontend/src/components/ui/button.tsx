interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({ disabled, children, ...props }: buttonProps) {
  return (
    <button
      className={`rounded-md bg-primary px-8 py-1.5 text-white hover:bg-opacity-85 ${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

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
