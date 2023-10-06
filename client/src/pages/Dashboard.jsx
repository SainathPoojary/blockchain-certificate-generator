import React, { useContext, useState } from "react";
import { Aside, Header } from "../components";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  // If Mobile device then false else true
  const [toggle, setToggle] = useState(() => {
    if (window.innerWidth <= 768) {
      return false;
    } else {
      return true;
    }
  });

  return (
    <div className="flex flex-col h-screen">
      <Header setToggle={setToggle} />
      <div className="flex h-[78vh] md:h-[91vh] overflow-x-scroll">
        {toggle && <Aside setToggle={setToggle} />}
        <Outlet />
      </div>
    </div>
  );
}
