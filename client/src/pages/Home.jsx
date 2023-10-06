import React from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { useUserContext } from "../context/UserContext";
import Generator from "./Generator";
export default function Home() {
  const { user } = useUserContext();

  console.log(user);

  return user ? <Dashboard userData={user} /> : <Login />;
}
