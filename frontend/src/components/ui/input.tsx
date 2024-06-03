interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PrimaryInput({ disabled, ...props }: inputProps) {
  return (
    <input
      className={`h-10 w-full rounded-md bg-white px-2 outline-none ${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
      {...props}
    />
  );
}

export function InputBorderBottom({ disabled, ...props }: inputProps) {
  return (
    <input
      className={`w-full rounded-none border-b border-gray py-2 text-sm text-gray outline-none ${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
      {...props}
    />
  );
}

interface textareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ disabled, ...props }: textareaProps) {
  return (
    <textarea
      className={`max-h-32 w-full rounded-md bg-white p-2 text-sm outline-none 2xl:max-h-64 ${disabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
      {...props}
    />
  );
}
