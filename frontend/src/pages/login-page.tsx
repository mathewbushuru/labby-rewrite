import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col sm:flex-row">
      {/* Desktop left   */}
      <div className="mt-36  flex-1 space-y-5">
        <img src="/LogoIcon.png" className="mx-auto h-20 w-16 object-cover" />

        <p className="mx-auto max-w-sm text-left text-2xl font-semibold">
          Log in
        </p>

        <div className="mx-auto max-w-sm">
          <input
            type="text"
            placeholder="Email"
            className="w-full border-b border-gray py-2 text-sm text-gray outline-none"
            autoFocus
          />
        </div>

        <div className="mx-auto max-w-sm">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-b border-gray py-2 text-sm text-gray outline-none"
          />
        </div>

        <p className="mx-auto max-w-sm cursor-pointer text-left text-sm text-gray">
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

      {/* Desktop right  */}
      <div className="background-image flex-1 bg-primaryDark" />
    </div>
  );
}
