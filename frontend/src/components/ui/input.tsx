interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function InputBorderBottom({...props }: inputProps) {
  return (
    <input
      className="w-full rounded-none border-b border-gray py-2 text-sm text-gray outline-none"
      {...props}
    />
  );
}
