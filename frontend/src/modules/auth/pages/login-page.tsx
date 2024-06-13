import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { useAppDispatch } from "@/store";
import { setCredentials } from "@/modules/auth/store/auth-slice";
import { useLoginMutation } from "@/modules/auth/api/auth-api";

import { InputBorderBottom } from "@/components/ui/input";
import {
  PrimaryButton,
  PrimaryButtonLink,
  SecondaryButtonLink,
} from "@/components/ui/button";

import { type LoginRequestType } from "@/modules/auth/types/auth-types";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState(
    state && state.signupEmail ? state.signupEmail : "matt@test.com",
  );
  const [password, setPassword] = useState("Tester123");

  const [loginTrigger, { isLoading }] = useLoginMutation();

  const handleLogin = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const loginData: LoginRequestType = { email, password };

    try {
      const loginResponse = await loginTrigger(loginData).unwrap();

      const { jwtToken, message, ...user } = loginResponse;

      toast.success(message);

      navigate("/");
      dispatch(setCredentials({ user, token: jwtToken }));
    } catch (error: any) {
      console.error(error);

      const errorMessage = error?.data?.errorMessage ||  "Something went wrong.";
      toast.error("Login error", {
        description: errorMessage
      });

      setPassword("");
    }
  };

  return (
    <div className="flex h-screen p-8 sm:p-0">
      {/* Desktop left  */}
      <div className="background-image hidden flex-1 bg-primaryDark sm:inline-block" />

      {/* Desktop Right   */}
      <form onSubmit={handleLogin} className="flex-1  space-y-5 sm:mt-36 2xl:mt-48">
        <img src="/LogoIcon.png" className="mx-auto h-20 w-16 object-cover" />

        <p className="mx-auto max-w-sm text-center text-2xl font-semibold">
          Log in
        </p>

        <div className="mx-auto max-w-sm">
          <InputBorderBottom
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoFocus
            required
          />
        </div>
        <div className="mx-auto max-w-sm">
          <InputBorderBottom
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="mx-auto max-w-sm text-sm">
          <SecondaryButtonLink type="button" disabled={isLoading}>
            Forgot my password
          </SecondaryButtonLink>
        </div>

        <div className="mx-auto flex max-w-sm justify-center">
          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? "Loading" : "Log in"}
          </PrimaryButton>
        </div>

        <p className="mx-auto max-w-sm cursor-pointer text-center text-sm text-textGray">
          Not a user? Create an account{" "}
          <PrimaryButtonLink
            type="button"
            onClick={() => navigate("/signup")}
            disabled={isLoading}
          >
            here
          </PrimaryButtonLink>
          .
        </p>
      </form>
    </div>
  );
}
