import React from "react";

const Footer = () => {
  return (
    <footer
      data-testid="footer"
      className="flex justify-center items-center w-full h-10 bg-medium-green fixed bottom-0"
    >
      <p className="text-white text-base-normal">
        Designed and developed by{" "}
        <a
          className="underline"
          href="https://www.linkedin.com/in/vinicius-assis"
          target="_blank"
        >
          Vinicius Assis
        </a>
      </p>
    </footer>
  );
};

export default Footer;
