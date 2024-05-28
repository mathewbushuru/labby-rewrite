export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col sm:flex-row">
      {/* Desktop left   */}
      <div className="mt-36  flex-1 space-y-5">
        <img src="/LogoIcon.png" className="mx-auto w-16 h-20 object-cover" />

        <p className="mx-auto max-w-sm text-left text-2xl font-semibold">
          Log in
        </p>

        <div className="mx-auto max-w-sm">
          <input
            type="text"
            placeholder="Email"
            className="border-gray w-full border-b py-2 text-sm text-gray outline-none"
          />
        </div>

        <div className="mx-auto max-w-sm">
          <input
            type="password"
            placeholder="Password"
            className="border-gray w-full border-b py-2 text-sm text-gray outline-none"
          />
        </div>

        <p className="text-gray mx-auto max-w-sm cursor-pointer text-left text-sm">
          Forgot my Password
        </p>

        <div className="mx-auto flex max-w-sm justify-center">
          <button className="bg-primary rounded-md px-8 py-1  text-white">
            Log in
          </button>
        </div>

        <p className="text-textGray mx-auto max-w-sm cursor-pointer text-center text-sm">
          Not a user? Create an account{" "}
          <span className="text-primaryDark cursor-ponter">here.</span>
        </p>
      </div>

      {/* Desktop right  */}
      <div className="background-image bg-primaryDark flex-1" />
    </div>
  );
}
