import React from "react";
import { useSelector } from "react-redux";
import { LayoutDashboard, Tractor, User } from "lucide-react";
import { getMenuState } from "../../../../store/reducers/selectors";

const Menu = () => {
  const showMenu = useSelector(getMenuState);

  return (
    <div
      className={`w-full absolute h-[calc(100vh-104px)] bg-off-white flex justify-center z-10 left-0 top-[64px] pt-20 overflow-hidden ${
        !showMenu ? "-translate-x-[100%]" : "translate-x-[0]"
      } transition-all ease-out duration-300`}
      data-testid="menu"
    >
      <nav className="flex flex-col gap-4 items-center">
        <a
          className="flex items-center gap-2 text-xl font-semibold w-fit"
          href="/"
        >
          <LayoutDashboard size={24} strokeWidth={2} color="#065F46" />
          Dashboard
        </a>
        <a
          className="flex items-center gap-2 text-xl font-semibold w-fit"
          href="/profile"
        >
          <User size={24} strokeWidth={2} color="#065F46" />
          Profile
        </a>
        <a
          className="flex items-center gap-2 text-xl font-semibold w-fit"
          href="/farm"
        >
          <Tractor size={24} strokeWidth={2} color="#065F46" />
          Farm
        </a>
      </nav>
    </div>
  );
};

export default Menu;
