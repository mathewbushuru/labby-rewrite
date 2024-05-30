import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/api";
import { useAppDispatch } from "@/store/store";
import { setCredentials } from "@/store/features/auth-slice";

import { InputBorderBottom } from "@/components/ui/input";
import {
  PrimaryButton,
  PrimaryButtonLink,
  SecondaryButtonLink,
} from "@/components/ui/button";

import { LoginRequestType } from "@/types/user";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      navigate("/tickets");
      dispatch(setCredentials({ user, token: jwtToken }));
    } catch (error: any) {
      console.error(error);
      setPassword("");
    }
  };

  return (
    <div className="flex h-screen p-8 sm:p-0">
      {/* Desktop left  */}
      <div className="background-image hidden flex-1 bg-primaryDark sm:inline-block" />

      {/* Desktop Right   */}
      <form onSubmit={handleLogin} className="flex-1  space-y-5 sm:mt-36">
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
          <PrimaryButton onClick={handleLogin} disabled={isLoading}>
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
