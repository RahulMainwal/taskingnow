import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMode, setTimeOfTodo, clearMessage} from "../store/slices/todoList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SettingPage = () => {
    
  const [time, setTime] = useState("");

    const getState = useSelector((state) => {
        return state.todoList
    })

    const dispatch = useDispatch();

    const changeModeHandler = () => {
        dispatch(updateMode(getState.mode === "light" ? "dark" : "light"))
        setTimeout(() => {
          if(getState.message){
            toast.success(getState.message)
          }
        }, 100);
    }

    const resetTimeOfTodoHandler = () => {
        dispatch(setTimeOfTodo(time))
        setTimeout(() => {
          if(getState.message){
            toast.success(getState.message)
          }
          if(getState.error){
            toast.error(getState.error)
          }
        }, 100);
    }

    const twentyFourHoursConvertionIntoTwelveHours = (twentyFourHours) => {
        if(twentyFourHours === ""){
          return ""
        }
        else{
          const hoursTwentyFourIntoTwelve = twentyFourHours.charAt(0)+twentyFourHours.charAt(1) === "00" ? 12 : parseInt(twentyFourHours.charAt(0)+twentyFourHours.charAt(1)) > 12 ? parseInt(twentyFourHours.charAt(0)+twentyFourHours.charAt(1)) - 12 : parseInt(twentyFourHours.charAt(0)+twentyFourHours.charAt(1));
        const minutes = twentyFourHours.charAt(3)+twentyFourHours.charAt(4);
        const amOrPm = twentyFourHours.charAt(0)+twentyFourHours.charAt(1) === "00"? "AM" : parseInt(twentyFourHours.charAt(0)+twentyFourHours.charAt(1)) < 12 ? "AM" : "PM";
        const time = hoursTwentyFourIntoTwelve+":"+minutes+" "+amOrPm
        return time
        }
      }

      setTimeout(() => {
        if(getState.message){
          toast.success(getState.message)
        }
        if(getState.error){
          toast.error(getState.error)
        }
        setTimeout(() => {
          dispatch(clearMessage())
        }, 100);
      }, 100);

      useEffect(() => {
        localStorage.setItem("resfeshPage", JSON.stringify(true))
      }, [])
      
    return (
      <div style={getState.mode === "light"? {backgroundColor: "#fafafa", width: "100%", height: "100vh", paddingTop: "15px"} :{backgroundColor: "#1F1D1B", width: "100%", height: "100vh", paddingTop: "15px"}}>
    <div className="card" style={getState.mode === "light" ? { left: "0", right: "0", margin: "auto", padding: "20px", height: "80vh" }: { backgroundColor: "#303335", color: "#d2d3db", left: "0", right: "0", margin: "auto", padding: "20px", height: "80vh" }}>
                <br />
                <h1 style={{ textAlign: "center" }}>Settings</h1>
                <br />
                <br />
                <div>
                    <div style={{ fontSize: "22px", display: "flex", margin: "0 10px", justifyContent: "space-between" }}>
                        <div>Dark Mode</div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" checked={getState.mode === "light" ? false : true} onChange={() => changeModeHandler()} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        </div>
                    </div>
                    <hr />
                    <div style={{ fontSize: "22px", display: "flex", margin: "0 10px", justifyContent: "space-between" }}>
                        <div>Current Time</div>
                        <div>{getState.resetTime === "" ? "Not set": twentyFourHoursConvertionIntoTwelveHours(getState.resetTime)}</div>
                    </div>
                    <br/>
                    <div style={{ fontSize: "22px", display: "flex", margin: "0 10px", justifyContent: "space-between" }}>
                        <div>Set Time</div>
                        <div>
                            <span  className="dropdown-item" data-mdb-toggle="modal" href="#exampleModalToggle1" role="button"  style={{ color: "white", backgroundColor: "#ff7b00", fontSize: "15px", padding: "5px 15px", borderRadius: "10px" }}>Repeat Tasks at</span>
                        </div>
                    </div>
                    <hr />
                    <div style={{ fontSize: "22px", margin: "0 10px" }}>About</div>
                </div>
            </div>


            <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel1" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered" style={{ zIndex: "1" }}>
                      <div className="modal-content" style={getState.mode === "light" ? {}:{backgroundColor: "#4E4B51", color: "white"}}>
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalToggleLabel1">Update Pop Up</h5>
                          <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            It will reset time of every task daily.
                          <div>
                            <br />
                            <label style={{ fontSize: "22px" }}>Time</label>
                            <input type="time" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" required value={time} onChange={(e) => setTime(e.target.value)} style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px"} : { width: "100%", padding: "5px 10px", fontSize: "20px", backgroundColor: "#787384", color: "white", borderRadius: "5px" }} />
                            <br />
                            <br />
                            <br />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button onClick={() => { resetTimeOfTodoHandler() }} style={{ backgroundColor: "#ff7b00", color: "white" }} className="btn" data-mdb-target="#exampleModalToggle1" data-mdb-toggle="modal" data-mdb-dismiss="modal">
                            Set
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{textAlign: "center", margin: "15px 0 0 0", color: "grey"}}>Developed by RAHUL MAINWAL</div>
                  <ToastContainer />
        </div>
    )
}
