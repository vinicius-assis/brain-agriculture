"use client";
import React from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getModalState } from "../../../../store/reducers/selectors";
import { useAppDispatch } from "../../../../store/hooks";
import { closeModal, openModal } from "../../../../store/reducers/actions";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(getModalState).show;

  const handleMenu = () => {
    if (isOpen) {
      dispatch(closeModal());
    } else {
      dispatch(openModal("menu"));
    }
  };

  return (
    <nav className="flex px-5 justify-between items-center w-full h-16 bg-medium-green">
      <button className="cursor-pointer" onClick={handleMenu}>
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
