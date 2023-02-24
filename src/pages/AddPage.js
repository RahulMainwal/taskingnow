import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask, clearMessage } from "../store/slices/todoList";
import shortid from "shortid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  
      
        setTimeout(() => {
            if(getState.error){
                toast.warning(getState.error)
            }
        }, 100);
     
 setTimeout(() => {
    if(getState.message){
      toast.success(getState.message)
    }
   }, 500);
    }

          
    setTimeout(() => {
        if(getState.error){
            toast.warning(getState.error)
        }
        setTimeout(() => {
            dispatch(clearMessage())
        }, 100);
    }, 100);
         
//  setTimeout(() => {
//     if(getState.error){
//         toast.warning(getState.error)
//     }
//    }, 500);

useEffect(() => {
    localStorage.setItem("resfeshPage", JSON.stringify(true))
  }, [])

    return (
        <div style={getState.mode === "light"? {backgroundColor: "#fafafa", width: "100%", height: "100vh", paddingTop: "15px"} :{backgroundColor: "#1F1D1B", width: "100%", height: "100vh", paddingTop: "15px"}}>
        <div className="card" style={getState.mode === "light" ? { left: "0", right: "0", margin: "auto", padding: "20px", height: "80vh" }: { backgroundColor: "#303335", color: "#d2d3db", left: "0", right: "0", margin: "auto", padding: "20px", height: "80vh" }}>
                <br />
                <h1 style={{ textAlign: "center" }}>Add Something!</h1>
                <br />
                <br />
                <div>
                    <label style={{ fontSize: "22px" }}>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title here..." style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px", border: "2px solid black"}: { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px", backgroundColor: "#474747",color: "white", border: "2px solid black" }} />
                    <br />
                    <br />
                    <label style={{ fontSize: "22px" }}>Time</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px", border: "2px solid black"}: { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px", backgroundColor: "#474747",color: "white",  border: "2px solid black" }} />
                    <br />
                    <br />
                    <label style={{ fontSize: "22px" }}>Status</label>
                    <select onChange={(e) => setStatus(e.target.value)} value={status} style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "23px", borderRadius: "5px", border: "2px solid black"}: { width: "100%", padding: "5px 10px", fontSize: "23px", borderRadius: "5px", backgroundColor: "#474747",color: "white", border: "2px solid black" }}  >
                        <option value="incompleted">Incompleted</option>
                        <option value="completed">Completed</option>
                    </select>
                    <br />
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                        <button className="btn" onClick={() => { submitHandler() }} style={{ backgroundColor: "#ff7b00", color: "white", fontSize: "20px" }}>Add</button>
                    </div>
                </div>
            </div>
            <div style={{textAlign: "center", margin: "15px 0 0 0", color: "grey"}}>Developed by RAHUL MAINWAL</div>
            <ToastContainer />
        </div>
    )
}