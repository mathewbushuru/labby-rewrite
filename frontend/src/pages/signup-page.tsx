import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useSignupMutation } from "@/api";

import { InputBorderBottom } from "@/components/ui/input";
import { PrimaryButton, PrimaryButtonLink } from "@/components/ui/button";

import { type SignupRequestType } from "@/types/user";

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [signupTrigger, { isLoading }] = useSignupMutation();

  const handleSignup = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const signupData: SignupRequestType = {
      email,
      password,
      firstName,
      lastName,
    };

    try {
      await signupTrigger(signupData).unwrap();

      toast.success("Account creation successful. Log in.")

      navigate("/login", {
        state: { signupEmail: email },
      });
    } catch (error: any) {
      console.log(error);

      const errorMessage = error?.data?.errorMessage ||  "Something went wrong.";
      toast.error("Signup error", {
        description: errorMessage
      });
    }
  };

  return (
    <div className="flex h-screen p-8 sm:p-0">
      {/* Desktop left   */}
      <form onSubmit={handleSignup} className="flex-1 space-y-7 sm:mt-32">
        <img src="/LogoIcon.png" className="mx-auto h-20 w-16 object-cover" />

        <p className="mx-auto max-w-sm text-center text-2xl font-semibold">
          Create an account
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
        <div className="mx-auto max-w-sm">
          <InputBorderBottom
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="mx-auto max-w-sm">
          <InputBorderBottom
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="mx-auto flex max-w-sm justify-center">
          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign up"}
          </PrimaryButton>
        </div>

        <p className="mx-auto max-w-sm cursor-pointer text-center text-sm text-textGray">
          Already have an account?{" "}
          <PrimaryButtonLink type="button" onClick={() => navigate("/login")}>
            Log in
          </PrimaryButtonLink>
          .
        </p>
      </form>

      {/* Desktop left  */}
      <div className="background-image hidden flex-1 bg-primaryDark sm:inline-block" />
    </div>
  );
}
