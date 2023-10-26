"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/auth-context";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";

const Navigation = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

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
        <span className="font-bold">Pake</span>Mo
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
          {loading ? null : user ? (
            <div className="flex items-center gap-4">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={user?.photoURL}
              />
              <span className="text-slate-600 text-sm">
                Hello, {user?.displayName}!
              </span>
            </div>
          ) : (
            <span className="text-slate-600 text-sm">
              Hello, Guest!
            </span>
          )}
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
          {loading ? null : !user ? (
            <button
              onClick={handleSignIn}
              className="bg-red-500 w-full text-sm px-4 py-2.5 text-white rounded-md"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-500 w-full text-sm px-4 py-2.5 text-white rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
