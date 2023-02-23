import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import { updateTask, updateTaskStatus, deleteTask, deleteAllTasks } from "../store/slices/todoList";

export const HomePage = () => {

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("incompleted");
  const [changeFilterValue, setChangedFilterValue] = useState("all");

  const dispatch = useDispatch();

  const getState = useSelector((state) => {
    return state.todoList
  });

  const filteredTodoList = getState.list.filter((item) => {
    if (changeFilterValue === 'all') {
      return true;
    }
    return item.status === changeFilterValue;
  });

  // console.log(time)


  const updateHandler = () => {
    dispatch(updateTask({ id, title, time, status }))
  }

  const updateStatusHandler = (elem) => {
    const newStatus = elem.status === "completed" ? "incompleted" : "completed"
    dispatch(updateTaskStatus({ id: elem.id, status: newStatus }))
  }

  const deleteTaskHandler = () => {
    dispatch(deleteTask(id))
  }

  const deleteAllTasksHandler = () => {
    dispatch(deleteAllTasks())
  }
  

  return (
    <div style={getState.mode === "light"? {backgroundColor: "#fafafa", width: "100%", height: "100vh", paddingTop: "15px"} :{backgroundColor: "#1F1D1B", width: "100%", height: "100vh", paddingTop: "15px"}}>
    <div className="card" style={getState.mode === "light" ? {width: "400px", left: "0", right: "0", margin: "auto", padding: "20px", height: "86vh" }: { backgroundColor: "#303335", color: "#d2d3db", width: "400px", left: "0", right: "0", margin: "auto", padding: "20px", height: "86vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="dropdown">
          <span
            className="dropdown-toggle d-flex align-items-center hidden-arrow"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <i style={{ fontSize: "25px" }} className="fas fa-align-left"></i>
          </span>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
            style={getState.mode === "light"? {backgroundColor: "#fafafa"} :{backgroundColor: "#C1C1BD "}}
          >
            <li>
              <span role="button" onClick={() => setChangedFilterValue("all")} className="dropdown-item">All</span>
            </li>
            <li>
              <span role="button" onClick={() => setChangedFilterValue("completed")} className="dropdown-item">Completed</span>
            </li>
            <li>
              <span role="button" onClick={() => setChangedFilterValue("incompleted")} className="dropdown-item">Incompleted</span>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <span
            className="dropdown-toggle d-flex align-items-center hidden-arrow"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <i style={{ fontSize: "25px", padding: "0 10px" }} className="fas fa-ellipsis-v"></i>
          </span>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
            style={getState.mode === "light"? {backgroundColor: "#fafafa"} :{backgroundColor: "#C1C1BD "}}
          >
            <li>
              <span className="dropdown-item" data-mdb-toggle="modal" href="#exampleModalToggle3" role="button">Delete All Tasks</span>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <h1 style={{ textAlign: "center" }}>Tasks</h1>
      <br />
      {

        getState.list.length === 0
          ?
          <div style={{ textAlign: "center", paddingTop: "25vh" }}>Empty</div>
          :
          <div id="homepage-task-list" style={{ height: "65vh", overflowY: "auto" }}>
            {
              filteredTodoList.map((elem) => (
                <div key={elem.id} style={elem.status === "completed" ? { textDecoration: "line-through", display: "flex", justifyContent: "space-between" } : { display: "flex", justifyContent: "space-between" }} className="d-flex p-2">
                  <div>
                    <input className="form-check-input" checked={elem.status === "completed" ? true : false} onChange={() => { updateStatusHandler(elem) }} style={{ borderColor: "#ff7b00" }} type="checkbox" value="" id="flexCheckDefault" />
                    {elem.title}
                  </div>
                  <div style={{ display: "flex" }}>
                    <span>{elem.time}</span>
                    <span className="dropdown" style={{ marginTop: "3px", marginLeft: "10px" }}>
                      <span
                        className="dropdown-toggle d-flex align-items-center hidden-arrow"
                        id="navbarDropdownMenuAvatar"
                        role="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i style={{ fontSize: "18px", padding: "0 8px", borderRadius: "50%" }} className="fas fa-ellipsis-v"></i>
                      </span>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuAvatar"
                        style={getState.mode === "light"? {backgroundColor: "#fafafa"} :{backgroundColor: "#C1C1BD "}}
                      >
                        <li>
                          <span className="dropdown-item" data-mdb-toggle="modal" href="#exampleModalToggle1" role="button" onClick={() => { setTitle(elem.title); setTime(elem.time); setId(elem.id) }}>Edit</span>
                        </li>
                        <li>
                          <span className="dropdown-item" data-mdb-toggle="modal" href="#exampleModalToggle2" role="button" onClick={() => { setTitle(elem.title); setTime(elem.time); setId(elem.id) }}>Delete</span>
                        </li>
                      </ul>

                    </span>
                  </div>


                  <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel1" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered" style={{ zIndex: "1" }}>
                      <div className="modal-content"  style={getState.mode === "light" ? {}:{backgroundColor: "#4E4B51"}}>
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalToggleLabel1">Edit Pop Up</h5>
                          <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div>
                            <label style={{ fontSize: "22px" }}>Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title here..." style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px"} : { width: "100%", padding: "5px 10px", fontSize: "20px", backgroundColor: "#787384", color: "white", borderRadius: "5px" }} />
                            <br />
                            <br />
                            <label style={{ fontSize: "22px" }}>Time</label>
                            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px"} : { width: "100%", padding: "5px 10px", fontSize: "20px", backgroundColor: "#787384", color: "white", borderRadius: "5px" }} />
                            <br />
                            <br />
                            <label style={{ fontSize: "22px" }}>Time</label>
                            <select onChange={(e) => setStatus(e.target.value)} value={status} style={getState.mode === "light"? { width: "100%", padding: "5px 10px", fontSize: "20px", borderRadius: "5px"} : { width: "100%", padding: "5px 10px", fontSize: "20px", backgroundColor: "#787384", color: "white", borderRadius: "5px" }}  >
                              <option value="incompleted">Incompleted</option>
                              <option value="completed">Completed</option>
                            </select>
                            <br />
                            <br />
                            <br />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button onClick={() => { updateHandler(elem) }} style={{ backgroundColor: "#ff7b00", color: "white" }} className="btn" data-mdb-target="#exampleModalToggle1" data-mdb-toggle="modal" data-mdb-dismiss="modal">
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>



                  <div
                    className="modal fade"
                    id="exampleModalToggle2"
                    data-mdb-backdrop="static"
                    data-mdb-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content" 
                       style={getState.mode === "light" ? {}:{backgroundColor: "#4E4B51"}}>
                        <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">Do you want to delete it?</h5>
                          <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Title: <b>{title}</b><br />Time: <b>{time}</b><br />Status: <b>{status}</b>
                        </div>
                        <div className="modal-footer">
                          <button type="button" style={{ backgroundColor: "#ff7b00", color: "white" }} className="btn btn-secondary" data-mdb-dismiss="modal" onClick={() => { deleteTaskHandler(elem) }}>Yes</button>
                          <button type="button" style={{ backgroundColor: "#ff7b00", color: "white" }} className="btn btn-primary" data-mdb-dismiss="modal">No</button>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>))
            }
          </div>
      }



      <div
        className="modal fade"
        id="exampleModalToggle3"
        data-mdb-backdrop="static"
        data-mdb-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" >
          <div className="modal-content" 
        style={getState.mode === "light" ? {}:{backgroundColor: "#4E4B51"}}>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Do you want to delete all tasks?</h5>
              <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Your all tasks will cleared forever!
            </div>
            <div className="modal-footer">
              <button type="button" style={{ backgroundColor: "#ff7b00", color: "white" }} className="btn btn-secondary" data-mdb-dismiss="modal" onClick={() => { deleteAllTasksHandler() }}>Yes</button>
              <button type="button" style={{ backgroundColor: "#ff7b00", color: "white" }} className="btn btn-primary" data-mdb-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}