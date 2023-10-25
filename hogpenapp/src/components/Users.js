import './myStyles.css';
import React, {useEffect, useState} from "react";
import logo from "../Images/hoghunter.png"
import { Icon, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDispatch,useSelector } from 'react-redux';
import {AnimatePresence, motion} from "framer-motion";
import { refreshSidebarFun } from "../features/refreshSidebar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Users() {
    const [refresh, setRefresh] = useState(true);
    const lightTheme = useSelector((state) => state.themeKey);
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const nav = useNavigate();
    const dispatch = useDispatch();
    if(!userData){
        console.log("User not authenticated");
        nav("/");
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`
            }
        };
        axios.get("http://localhost:8080/user/fetchUsers", config).then((data) => {
            console.log("User data from API");
            setUsers(data.data);
        });
    }, [refresh]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0}}
                transition={{
                    duration: "0.3"
                }}
                className="list-container"
            >
                <div className="list-container">
                    <div className="ug-header">
                        <img src={logo} style={{height:"2rem", width:"2rem"}} alt="logo"/>
                        <p className="ug-title">Friends</p>
                        <IconButton
                            onClick={() => {
                                setRefresh(!refresh);
                            }}
                        >
                            <RefreshIcon/>
                        </IconButton>
                    </div>
                    <div className="sidebar-search">
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                        <input className="search-box" placeholder="search"/>
                    </div>
                    <div className ="ug-list">
                        {users.map((user, index) => {
                            return (
                                <motion.div
                                    whileHover={{scale: 1.01}}
                                    whileTap={{scale: 0.98}}
                                    className="list-item"
                                    key={index}
                                    onClick={() => {
                                        console.log("Creating chat with ", user.name);
                                        const config = {
                                          headers: {
                                            Authorization: `Bearer ${userData.data.token}`
                                          }
                                        };
                                        axios.post(
                                          "http://localhost:8080/chat/",
                                          {
                                            userId: user._id,
                                          },
                                          config
                                        );
                                        dispatch(refreshSidebarFun());
                                    }}
                                >
                                    <p className="convo-icon">{user.name[0].toUpperCase()}</p>
                                    <p className="convo-title">
                                    {user.name}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default Users;