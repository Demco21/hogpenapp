import React, { createContext, useState } from "react";
import "./myStyles.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const myContext = createContext();
function MainContainer() {
  const [refresh, setRefresh] = useState(true);
  return (
    <div className="MainContainer">
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Sidebar />
        <Outlet />
      </myContext.Provider>
    </div>
  );
}

export default MainContainer;
