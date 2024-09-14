"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="flex px-5 justify-between items-center w-full h-16 bg-medium-green">
      <button className="cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? (
          <X data-testid="close-icon" color="#fff" size={38} />
        ) : (
          <Menu data-testid="menu-icon" color="#fff" size={38} />
        )}
      </button>
      <div className="">
        <Image
          width={100}
          height={38}
          src="/assets/logo.png"
          alt="Brain Agriculture icon"
        />
      </div>
    </nav>
  );
};

export default Navbar;
