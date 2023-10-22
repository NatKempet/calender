import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-700 text-white flex justify-between text-[30px] items-center gap-[2rem] px-16 ">
      <a href="/" className="font-bold text-[50px] p-[0.25rem]">
        Calender
      </a>
      <ul className="p-0 m-0 list-none flex gap-[2rem]">
        <li className="hover:bg-gray-600 active:bg-slate-800">
          <a href="/Weekly" className="p-[0.25rem]">
            Weekly View
          </a>
        </li>
        <li className="hover:bg-gray-600 active:bg-slate-800">
          <a href="/Contact" className="p-[0.25rem]">
            Contact Us
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
