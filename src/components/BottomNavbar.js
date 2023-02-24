import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation  } from "react-router-dom";
import { resetTodoStatus, resetDate } from "../store/slices/todoList";

export const BottomNavbar = () => {
    const [currentValue, setCurrentValue] = useState("/");
    const location = useLocation();

    const dispatch = useDispatch();

    const getState = useSelector((state) => {
        return state.todoList
    })

    useEffect(() => {
        setCurrentValue(location.pathname)
        dispatch(resetDate())
    }, [location.pathname])

    useEffect(() => {
        if(getState.resetDateForTask <= new Date().getDate() && getState.resetTime !== "" && getState.resetDateForTask !== "" && parseInt(getState.resetTime.charAt(0)+getState.resetTime.charAt(1)) <= new Date().getHours() && parseInt(getState.resetTime.charAt(3)+getState.resetTime.charAt(4)) <= new Date().getMinutes() && parseInt("00") <= new Date().getSeconds() ){
            if(getState.resetDateForTask === new Date().getDate() ){
                dispatch(resetTodoStatus(getState))
            }
            }
    })

 

    return (
        <nav style={{ textAlign: "center", position: "fixed", width: "100%", bottom: "0", backgroundColor: "#ff7b00" }}>
        <ul style={{ left: "0", right: "0", padding: "5px 0 20px 0", margin: "auto", justifyContent: "center", }} className="nav nav-pills mb-0" id="ex-with-icons" role="tablist">
            <li style={{margin: "0 30px"}}>
                <span style={currentValue === "/"?{background: "none", color: "white", fontSize: "30px", borderBottom: "5px solid white", paddingBottom: "13px", paddingLeft: "7px" }:{ background: "none", color: "white", fontSize: "30px", paddingLeft: "7px"  }} >
                    <Link style={{ color: "white" }} to="/">
                        <i className="fas fa-tasks fa-fw me-2"></i>
                        {/* List */}
                    </Link>
                </span>
            </li>
            <li style={{margin: "0 30px"}}>
                <span style={currentValue === "/add-task"?{background: "none", color: "white", fontSize: "30px", borderBottom: "5px solid white", paddingBottom: "13px", paddingLeft: "7px"  }:{ background: "none", color: "white", fontSize: "30px", paddingLeft: "7px"  }} >
                <Link style={{ color: "white" }} to="/add-task">
                    <i className="fas fa-plus-square fa-fw me-2"></i>
                    {/* Add */}
                    </Link>
                </span>
            </li>
            <li style={{margin: "0 30px"}}>
                <span style={currentValue === "/settings"?{background: "none", color: "white", fontSize: "30px", borderBottom: "5px solid white", paddingBottom: "13px", paddingLeft: "7px"  }:{ background: "none", color: "white", fontSize: "30px", paddingLeft: "7px"  }}>
                <Link style={{ color: "white" }} to="/settings">
                    <i className="fas fa-cog fa-fw me-2"></i>
                {/* Settings */}
                </Link>
            </span></li>
        </ul>
    </nav>
    )
}