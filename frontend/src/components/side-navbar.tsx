import { NavLink } from "react-router-dom";

export default function SideNavbar() {
  return (
    <nav className="flex h-full flex-col bg-primary px-3">
      <img src="/LogoWhite.png" className="my-8 w-16" alt="logo" />

      <hr className="-mx-2 rounded-md border-2 border-primaryLight" />

      <div className="my-8 flex flex-1 flex-col items-center gap-5">
        {navItems.map((navItem) => (
          <NavLink key={navItem.to} to={navItem.to}>
            {({ isActive }) =>
              isActive ? (
                <div className="flex items-center justify-center rounded-md bg-primaryLight p-2">
                  <img
                    className="w-7"
                    src={navItem.imgSrcSelected}
                    alt={navItem.name}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-md bg-inherit p-2">
                  <img
                    className="w-7"
                    src={navItem.imgSrc}
                    alt={navItem.name}
                  />
                </div>
              )
            }
          </NavLink>
        ))} 

        <div className="flex-1" />

        <NavLink
          to="/settings"
        >
          {({ isActive }) =>
            isActive ? (
              <div className="flex items-center justify-center rounded-md bg-primaryLight p-2">
                <img
                  className="w-7"
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

const navItems = [
    {
      name: "Tasks",
      to: "/",
      imgSrc: "/Tasks.png",
      imgSrcSelected: "/TasksSelected.png",
    },
    {
      name: "Forms",
      to: "/forms",
      imgSrc: "/Form.png",
      imgSrcSelected: "/FormSelected.png",
    },
    {
      name: "Billing",
      to: "/billing",
      imgSrc: "/Money.png",
      imgSrcSelected: "/MoneySelected.png",
    },
    {
      name: "Statistics",
      to: "/statistics",
      imgSrc: "/Statistics.png",
      imgSrcSelected: "/StatisticsSelected.png",
    },
  ];
