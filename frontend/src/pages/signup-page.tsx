import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen p-8 sm:p-0">
      {/* Desktop left   */}
      <div className="sm:mt-32  flex-1 space-y-7">
        <img src="/LogoIcon.png" className="mx-auto h-20 w-16 object-cover" />

        <p className="mx-auto max-w-sm text-center sm:text-left text-2xl font-semibold">
          Create an account
        </p>

        <div className="mx-auto max-w-sm">
          <input
            type="text"
            placeholder="Email"
            className="w-full border-b border-gray rounded-none py-2 text-sm text-gray outline-none"
            autoFocus
          />
        </div>

        <div className="mx-auto max-w-sm">
          <input
            type="text"
            placeholder="First name"
            className="w-full border-b border-gray py-2 rounded-none text-sm text-gray outline-none"
          />
        </div>

        <div className="mx-auto max-w-sm">
          <input
            type="text"
            placeholder="Last name"
            className="w-full border-b border-gray py-2 text-sm rounded-none text-gray outline-none"
          />
        </div>

        <div className="mx-auto max-w-sm">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-b border-gray py-2 text-sm rounded-none text-gray outline-none"
          />
        </div>

        <div className="mx-auto flex max-w-sm justify-center">
          <button className="rounded-md bg-primary px-8 py-1  text-white">
            Sign up
          </button>
        </div>

        <p className="mx-auto max-w-sm cursor-pointer text-center text-sm text-textGray">
          Already have an account?{" "}
          <span
            className="cursor-ponter text-primaryDark"
            onClick={() => navigate("/login")}
          >
            Log in.
          </span>
        </p>
      </div>

        {/* Desktop left  */}
        <div className="background-image flex-1 bg-primaryDark hidden sm:inline-block" />
    </div>
  );
}
