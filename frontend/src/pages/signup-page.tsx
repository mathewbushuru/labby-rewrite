import { useNavigate } from "react-router-dom";

import { InputBorderBottom } from "@/components/ui/input";
import { PrimaryButton, PrimaryButtonLink } from "@/components/ui/button";

export default function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen p-8 sm:p-0">
      {/* Desktop left   */}
      <div className="flex-1  space-y-7 sm:mt-32">
        <img src="/LogoIcon.png" className="mx-auto h-20 w-16 object-cover" />

        <p className="mx-auto max-w-sm text-center text-2xl font-semibold">
          Create an account
        </p>

        <div className="mx-auto max-w-sm">
          <InputBorderBottom type="text" placeholder="Email" autoFocus />
        </div>
        <div className="mx-auto max-w-sm">
          <InputBorderBottom type="text" placeholder="First name" autoFocus />
        </div>
        <div className="mx-auto max-w-sm">
          <InputBorderBottom type="text" placeholder="Last name" autoFocus />
        </div>
        <div className="mx-auto max-w-sm">
          <InputBorderBottom type="password" placeholder="Password" autoFocus />
        </div>

        <div className="mx-auto flex max-w-sm justify-center">
          <PrimaryButton>Sign up</PrimaryButton>
        </div>

        <p className="mx-auto max-w-sm cursor-pointer text-center text-sm text-textGray">
          Already have an account?{" "}
          <PrimaryButtonLink onClick={() => navigate("/login")}>
            Log in
          </PrimaryButtonLink>
          .
        </p>
      </div>

      {/* Desktop left  */}
      <div className="background-image hidden flex-1 bg-primaryDark sm:inline-block" />
    </div>
  );
}
