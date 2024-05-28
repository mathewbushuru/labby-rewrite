import { useNavigate } from "react-router-dom";

import { InputBorderBottom } from "@/components/ui/input-border-bottom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen p-8 sm:p-0">
      {/* Desktop left  */}
      <div className="background-image hidden flex-1 bg-primaryDark sm:inline-block" />

      {/* Desktop Right   */}
      <div className="flex-1  space-y-5 sm:mt-36">
        <img src="/LogoIcon.png" className="mx-auto h-20 w-16 object-cover" />

        <p className="mx-auto max-w-sm text-center text-2xl font-semibold sm:text-left">
          Log in
        </p>

        <div className="mx-auto max-w-sm">
          <InputBorderBottom type="text" placeholder="Email" autoFocus />
        </div>
        <div className="mx-auto max-w-sm">
          <InputBorderBottom type="password" placeholder="Password" />
        </div>

        <p className="mx-auto max-w-sm cursor-pointer text-center text-sm text-gray sm:text-left">
          Forgot my Password
        </p>

        <div className="mx-auto flex max-w-sm justify-center">
          <button className="rounded-md bg-primary px-8 py-1  text-white">
            Log in
          </button>
        </div>

        <p className="mx-auto max-w-sm cursor-pointer text-center text-sm text-textGray">
          Not a user? Create an account{" "}
          <span
            className="cursor-ponter text-primaryDark"
            onClick={() => navigate("/signup")}
          >
            here.
          </span>
        </p>
      </div>
    </div>
  );
}
