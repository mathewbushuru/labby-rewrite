interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({ children, ...props }: buttonProps) {
  return (
    <button
      className="rounded-md bg-primary px-8 py-1 text-white hover:bg-opacity-85"
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
