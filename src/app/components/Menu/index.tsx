import React from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LayoutDashboard, Tractor, User } from "lucide-react";
import { getMenuState } from "../../../../store/reducers/selectors";
import Button from "../Button";
import { openForm, toggleMenu } from "../../../../store/reducers/actions";
import Link from "next/link";
import { AppDispatch } from "../../../../store";

const MenuNavigation = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const handleCloseForm = () => dispatch(toggleMenu());

  return (
    <nav className="flex flex-col gap-4 items-center">
      <Link
        className={`flex items-center gap-2 text-xl font-semibold w-fit ${
          pathname === "/" ? "underline text-medium-green" : ""
        }`}
        href="/"
        onClick={handleCloseForm}
      >
        <LayoutDashboard size={24} strokeWidth={2} color="#065F46" />
        Dashboard
      </Link>
      <Link
        className={`flex items-center gap-2 text-xl font-semibold w-fit ${
          pathname === "/profiles" ? "underline text-medium-green" : ""
        }`}
        href="/profiles"
        onClick={handleCloseForm}
      >
        <User size={24} strokeWidth={2} color="#065F46" />
        Profiles
      </Link>
      <Link
        className={`flex items-center gap-2 text-xl font-semibold w-fit ${
          pathname === "/farms" ? "underline text-medium-green" : ""
        }`}
        href="/farms"
        onClick={handleCloseForm}
      >
        <Tractor size={24} strokeWidth={2} color="#065F46" />
        Farms
      </Link>
    </nav>
  );
};

const Menu = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector(getMenuState);
  const handleOpenForm = () => dispatch(openForm());

  return (
    <>
      <div
        className={`w-full absolute h-[calc(100vh-104px)] bg-off-white flex justify-center z-10 left-0 top-[64px] pt-20 overflow-hidden ${
          !showMenu ? "-translate-x-[100%]" : "translate-x-[0]"
        } transition-all ease-out duration-300 md:hidden`}
        data-testid="menu"
      >
        <MenuNavigation />
      </div>
      <div className="w-1/ flex-col relative md:flex pl-5 pr-10 hidden">
        <Button onClick={handleOpenForm} className="mx-auto mb-8">
          + New Profile
        </Button>
        <MenuNavigation />
      </div>
    </>
  );
};

export default Menu;
