import { useNavigate } from "react-router-dom";

import { InputBorderBottom } from "@/components/ui/input";
import {
  PrimaryButton,
  PrimaryButtonLink,
  SecondaryButtonLink,
} from "@/components/ui/button";

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

        <div className="mx-auto max-w-sm text-sm">
          <SecondaryButtonLink>Forgot my password</SecondaryButtonLink>
        </div>

        <div className="mx-auto flex max-w-sm justify-center">
          <PrimaryButton>Log in</PrimaryButton>
        </div>

        <p className="mx-auto max-w-sm cursor-pointer text-center text-sm text-textGray">
          Not a user? Create an account{" "}
          <PrimaryButtonLink onClick={() => navigate("/signup")}>
            here
          </PrimaryButtonLink>
          .
        </p>
      </div>
    </div>
  );
}
