import './myStyles.css';
import React from "react";
import logo from "../Images/hoghunter.png"
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';

function Groups() {
    const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div className="list-container">
    <div className={"ug-header" + (lightTheme ? "" : " dark")}>
        <img src={logo} style={{height:"2rem", width:"2rem"}} alt="logo"/>
        <p className="ug-title">Groups</p>
    </div>
    <div className="sidebar-search">
        <IconButton>
            <SearchIcon/>
        </IconButton>
        <input className="search-box" placeholder="search"/>
    </div>
    <div className ="ug-list">
        <div className="list-item">
            <p className="convo-icon">T</p>
            <p className="convo-title">Test Groups</p>
        </div>
        <div className="list-item">
            <p className="convo-icon">T</p>
            <p className="convo-title">Test Groups</p>
        </div>
        <div className="list-item">
            <p className="convo-icon">T</p>
            <p className="convo-title">Test Groups</p>
        </div>
        <div className="list-item">
            <p className="convo-icon">T</p>
            <p className="convo-title">Test Groups</p>
        </div>
    </div>
</div>
  );
}

export default Groups;
