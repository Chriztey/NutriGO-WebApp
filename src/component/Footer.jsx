import React from "react";
import LogoDummy from "../asset/nutrigo_light.png";

const Footer = () => {
  return (
    <footer className="bg-[#0C4767] text-white py-8">
      <div className="w-full mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={LogoDummy} className="h-8" alt="App Logo" />
          </a>
          {/* <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-[#FF7F2A] sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul> */}
        </div>
        <hr className="my-6 border-[#84A98C] sm:mx-auto lg:my-8" />
        <span className="block text-sm text-[#FF7F2A] sm:text-center">
          © 2024{" "}
          <a href="#" className="hover:underline">
            NutriGo™ by NeuroGo <br />
          </a>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
