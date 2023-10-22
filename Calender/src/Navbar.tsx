import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-gray-700 text-white flex justify-between text-[30px] items-center gap-[2rem] px-16 ">
      <Link to="/" className="font-bold text-[50px] p-[0.25rem]">
        Calender
      </Link>
      <ul className="p-0 m-0 list-none flex gap-[2rem]">
        <li className="hover:bg-gray-600 active:bg-slate-800">
          <Link to="/Weekly" className="p-[0.25rem]">
            Weekly View
          </Link>
        </li>
        <li className="hover:bg-gray-600 active:bg-slate-800">
          <Link to="/Contact" className="p-[0.25rem]">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
