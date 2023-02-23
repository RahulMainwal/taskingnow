import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../store/slices/todoList";
import shortid from "shortid";

export const AddPage = () => {

    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("incompleted");


    const getState = useSelector((state) => {
        return state.todoList
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(addTask({ title, time, id: shortid.generate(), status }))
        if (title !== "") {
            navigate("/")
        }
    }


    return (
        <div style={getState.mode === "light" ? { backgroundColor: "#fafafa", width: "100%", paddingTop: "15px" } : { backgroundColor: "#1F1D1B", width: "100%", height: "100vh", paddingTop: "15px" }}>
            <div className="card" style={getState.mode === "light" ? {left: "0", right: "0", margin: "auto", padding: "20px", height: "86vh" }: { backgroundColor: "#303335", color: "#d2d3db", width: "400px", left: "0", right: "0", margin: "auto", padding: "20px", height: "86vh" }}>
                <br />
                <h1 style={{ textAlign: "center" }}>Add Something!</h1>
                <br />
                <br />
                <div>
                    <label style={{ fontSize: "22px" }}>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title here..." style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px"}: { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px", backgroundColor: "#474747",color: "white" }} />
                    <br />
                    <br />
                    <label style={{ fontSize: "22px" }}>Time</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px"}: { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px", backgroundColor: "#474747",color: "white" }} />
                    <br />
                    <br />
                    <br />
                    <select onChange={(e) => setStatus(e.target.value)} value={status} style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px"}: { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px", backgroundColor: "#474747",color: "white" }}  >
                        <option value="incompleted">Incompleted</option>
                        <option value="completed">Completed</option>
                    </select>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                        <button className="btn" onClick={() => { submitHandler() }} style={{ backgroundColor: "#ff7b00", color: "white", fontSize: "20px" }}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}