"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState(false);
  let nav = [
    {
      url: "/",
      label: "Home",
    },
    {
      url: "/record",
      label: "Add Record",
    },
    {
      url: "/reports",
      label: "Reports",
    },
  ];

  return (
    <div className="bg-slate-900 p-4 flex items-center z-20 h-20 sticky top-0">
      <span className="flex w-full select-none justify-start font-playfair text-2xl text-slate-50">
        <span className="font-bold">Coffee</span>Roy
      </span>

      <button onClick={() => setOpenMenu(true)}>
        <GiHamburgerMenu className="text-white text-2xl" />
      </button>

      <div
        className={`shadow-lg fixed inset-20 right-0 top-0 bottom-0 z-30 flex flex-col overflow-auto bg-white text-lg text-slate-900 transition-all duration-300 ease-in-out sm:text-xl ${
          openMenu ? "translate-x-0" : "translate-x-[100vw]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-solid border-slate-200 p-4">
          <div className="flex items-center gap-4">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://thispersondoesnotexist.com/"
            />
            <span className="text-slate-600 text-sm">Hello, User!</span>
          </div>
          <button onClick={() => setOpenMenu(false)}>
            <AiFillCloseCircle className="text-3xl text-red-500" />
          </button>
        </div>

        <ul className="flex flex-col text-sm">
          {nav.map(function (nav, index) {
            return (
              <li key={index} className="border-b">
                <Link className="p-4 w-full block" href={nav.url}>
                  {nav.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto w-full flex justify-center p-4 bg-slate-100">
          <button className="bg-red-500 w-full text-sm px-4 py-2.5 text-white rounded-md">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
