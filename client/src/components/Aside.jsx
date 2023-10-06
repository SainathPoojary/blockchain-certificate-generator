import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";

export default function Aside({ setToggle }) {
  const { logout } = useUserContext();

  return (
    <div className="hidden w-full flex-[1] h-full bg-black p-5 md:flex flex-col justify-between items-start">
      <div className="flex flex-col space-y-2 justify-between w-full">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `flex space-x-5 ${
              isActive ? "bg-secondary hover:bg-[#2b3697]" : "bg-primary"
            } hover:bg-[#28292e] px-4 py-2 rounded-lg w-full justify-center`
          }
        >
          {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-5 h-5 mr-2 fill-white"
            >
              <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>{" "} */}
          Certificates
        </NavLink>

        <NavLink
          to={"/generator"}
          className={({ isActive, isPending }) =>
            `flex space-x-5 ${
              isActive ? "bg-secondary hover:bg-[#2b3697]" : "bg-primary"
            } hover:bg-[#28292e] px-4 py-2 rounded-lg w-full justify-center`
          }
        >
          Generate
        </NavLink>

        <button onClick={() => setToggle((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="sm:hidden fill-white h-8 w-8"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
      </div>
      <div className="w-full flex flex-col space-y-3">
        <button
          onClick={logout}
          className="flex justify-center items-center space-x-5 bg-secondary hover:bg-[#28292e] px-4 py-1 rounded-full w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="w-5 h-5 mr-2 fill-white"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>{" "}
          Logout
        </button>
      </div>
    </div>
  );
}
