import './myStyles.css';
import React, {useEffect, useState} from "react";
import logo from "../Images/hoghunter.png"
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Users() {
    const [refresh, setRefresh] = useState(true);
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.data.token : null;
    const navigate = useNavigate();

    useEffect(() => {
        if(token === null){
            navigate("/");
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get("http://localhost:5000/user/fetchUsers", config).then((data) => {
            console.log("User data from API");
            setUsers(data.data);
        });
    }, [refresh, navigate, token]);

    return (
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
                        <div className="list-item">
                            <p className="convo-icon">{user.name[0].toUpperCase()}</p>
                            <p className="convo-title">
                            {user.name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Users;