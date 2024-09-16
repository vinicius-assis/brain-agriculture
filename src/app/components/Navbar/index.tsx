"use client";
import React from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../store/hooks";
import { toggleMenu } from "../../../../store/reducers/actions";
import { getMenuState } from "../../../../store/reducers/selectors";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(getMenuState);

  const handleMenu = () => dispatch(toggleMenu());

  return (
    <nav className="flex px-5 justify-between items-center w-full h-16 bg-medium-green">
      <button className="cursor-pointer md:hidden" onClick={handleMenu}>
        {isOpen ? (
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
