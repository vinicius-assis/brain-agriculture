import { LayoutDashboard, Tractor, User } from "lucide-react";
import React from "react";

const Menu = () => {
  return (
    <div className="flex justify-center mt-20" data-testid="menu">
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
