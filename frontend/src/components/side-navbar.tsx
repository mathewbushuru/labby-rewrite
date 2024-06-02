import { NavLink } from "react-router-dom";

export default function SideNavbar() {
  return (
    <nav className="flex h-full flex-col bg-primary px-3">
      <img src="/LogoWhite.png" className="my-10 w-16" alt="logo" />

      <hr className="-mx-2 rounded-md border-2 border-primaryLight" />

      <div className="my-6 flex flex-1 flex-col items-center gap-4">
        <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
          {({ isActive }) =>
            isActive ? (
              <div className="flex items-center justify-center rounded-md bg-primaryLight p-3">
                <img className="w-8" src="/TasksSelected.png" alt="Tasks" />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-md bg-inherit p-3">
                <img className="w-8" src="/Tasks.png" alt="Tasks" />
              </div>
            )
          }
        </NavLink>

        <NavLink to="/form" className={({ isActive }) => (isActive ? "" : "")}>
          {({ isActive }) =>
            isActive ? (
              <div className="flex items-center justify-center rounded-md bg-primaryLight p-3">
                <img className="w-8" src="/FormSelected.png" alt="Form" />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-md bg-inherit p-3">
                <img className="w-8" src="/Form.png" alt="Form" />
              </div>
            )
          }
        </NavLink>

        <NavLink
          to="/billing"
          className={({ isActive }) => (isActive ? "" : "")}
        >
          {({ isActive }) =>
            isActive ? (
              <div className="flex items-center justify-center rounded-md bg-primaryLight p-3">
                <img className="w-8" src="/MoneySelected.png" alt="Billing" />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-md bg-inherit p-3">
                <img className="w-8" src="/Money.png" alt="Billing" />
              </div>
            )
          }
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) => (isActive ? "" : "")}
        >
          {({ isActive }) =>
            isActive ? (
              <div className="flex items-center justify-center rounded-md bg-primaryLight p-3">
                <img
                  className="w-8"
                  src="/StatisticsSelected.png"
                  alt="Statistics"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-md bg-inherit p-3">
                <img className="w-8" src="/Statistics.png" alt="Statistics" />
              </div>
            )
          }
        </NavLink>

        <div className="flex-1" />

        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? "" : "")}
        >
          {({ isActive }) =>
            isActive ? (
              <div className="flex items-center justify-center rounded-md bg-primaryLight p-3  ">
                <img
                  className="w-8"
                  src="/SettingsSelected.png"
                  alt="Settings"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-md bg-inherit p-3 ">
                <img className="w-8" src="/Settings.png" alt="Settings" />
              </div>
            )
          }
        </NavLink>
      </div>
    </nav>
  );
}
