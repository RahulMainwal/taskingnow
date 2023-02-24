import { createSlice } from "@reduxjs/toolkit";
// import { format } from 'date-fns';

const getTodoList = window.localStorage.getItem("todoList");

const initialValue = () => {
    if (getTodoList === "" || getTodoList === null) {
        window.localStorage.setItem("todoList", JSON.stringify(
            {
                mode: "light",
                resetTime: "",
                validDate: 0,
                list: []
            }
        ))
        return []
    }
    return JSON.parse(getTodoList).list
}





const todoListSlice = createSlice({
    name: "todoList",
    initialState: {
        list: initialValue(),
        message: "",
        error: "",
        mode: JSON.parse(getTodoList)? JSON.parse(getTodoList).mode : "light",
        resetDateForTask: JSON.parse(getTodoList)?JSON.parse(getTodoList).validDate:0,
        resetTime: JSON.parse(getTodoList)?JSON.parse(getTodoList).resetTime:"",
    },
    reducers: {
        addTask: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if(action.payload.title === ""){
              state.error = "Please fill atleast title!"
            }else{
            state.list.push(action.payload);
            if (todoList) {
              const todoListArr = JSON.parse(todoList).list;
              todoListArr.push({
                ...action.payload,
              });
              window.localStorage.setItem('todoList', JSON.stringify({
                mode: state.mode,
                resetTime: state.resetTime,
                validDate: state.validDate,
                list: todoListArr
              }));
              state.message = "Added Successful!"
              state.error = ""
            } else {
              window.localStorage.setItem(
                'todoList',
                JSON.stringify({
                    mode: state.mode,
                    resetTime: state.resetTime,
                    validDate: state.validDate,
                    list: [...action.payload]
            })
              );
              state.message = "Added Successful!"
              state.error = ""
            }
          }
          },
          updateTask: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
              const todoListArr = JSON.parse(todoList).list;
              todoListArr.forEach((todo) => {
                if (todo.id === action.payload.id) {
                  todo.status = action.payload.status;
                  todo.title = action.payload.title;
                  todo.time = action.payload.time;
                }
              });
              window.localStorage.setItem('todoList', JSON.stringify({
                mode: state.mode,
                resetTime: state.resetTime,
                validDate: state.resetDateForTask,
                list: todoListArr
              }));
              state.list = [...todoListArr];
              state.message = "Updated Successful!"
              state.error = ""
            }
           },
          updateTaskStatus: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
              const todoListArr = JSON.parse(todoList).list;
              todoListArr.forEach((todo) => {
                if (todo.id === action.payload.id) {
                  todo.status = action.payload.status;
                }
              });
              window.localStorage.setItem('todoList', JSON.stringify({
                mode: state.mode,
                resetTime: state.resetTime,
                validDate: state.resetDateForTask,
                list: todoListArr}));
              state.list = [...todoListArr];
              action.payload.status === "completed" 
              ?
              state.message = "Hurray! Completed."
              :
              state.error = "List was unticked!"
            }
          },

          deleteTask: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
              const todoListArr = JSON.parse(todoList).list;
              todoListArr.forEach((todo, index) => {
                if (todo.id === action.payload) {
                  todoListArr.splice(index, 1);
                }
              });
              window.localStorage.setItem('todoList', JSON.stringify({
                mode: state.mode,
                resetTime: state.resetTime,
                validDate: state.resetDateForTask,
                list: todoListArr}));
              state.list = todoListArr;
              state.message = "Deleted Successful!"
              state.error = ""
            }
          },
          deleteAllTasks: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
              const todoListArr = [];
              window.localStorage.setItem('todoList', JSON.stringify({
                mode: state.mode,
                resetTime: state.resetTime,
                validDate: state.resetDateForTask,
                list: todoListArr}));
              state.list = todoListArr;
              state.list.length === 0
              ?
              state.error = "It is already cleared!"
              :
              state.message = "Cleared All Tasks Successfully!"
            }
          },
          updateMode : (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
            state.mode = action.payload
            state.message = `${action.payload} mode has been applied!`
            localStorage.setItem("todoList", JSON.stringify({
              mode: state.mode,
                resetTime: state.resetTime,
                validDate: state.resetDateForTask,
                list: state.list
            }))
          }
          },
          setTimeOfTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {           
            state.resetTime = action.payload
            action.payload === "" ? state.error =  "Time has not been settled!" : state.message =  "Time has been changed successfully!"
            localStorage.setItem("todoList", JSON.stringify({
              mode: state.mode,
              resetTime: action.payload,
              validDate: new Date().getDate(),
              list: state.list,
            }))
            }
          },
          resetTodoStatus: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');

                  const todoListArr = JSON.parse(todoList).list;
              todoListArr.forEach((todo) => {
                  todo.status = "incompleted";
              });
            state.list = todoListArr;
            state.resetDateForTask = new Date().getDate() === 31 || new Date().getDate() === 30 || new Date().getDate() === 28 || new Date().getDate() === 29 ? 1 : new Date().getDate()+1;

            localStorage.setItem("todoList", JSON.stringify({
              mode: state.mode,
              resetTime: state.resetTime,
              validDate: new Date().getDate() === 31 || new Date().getDate() === 30 || new Date().getDate() === 28 || new Date().getDate() === 29 ? 1 : new Date().getDate()+1,
              list: todoListArr,
            }))
          },
          clearMessage: (state, action) => {
            state.message = "";
            state.error = ""
          },
          resetDate: (state, action) => {
            state.resetDateForTask = (new Date().getDate() === 31 && new Date().getMonth() === 0 || new Date().getDate() === 31 && new Date().getMonth() === 2 || new Date().getDate() === 31 && new Date().getMonth() === 4 || new Date().getDate() === 31 && new Date().getMonth() === 6 || new Date().getDate() === 31 && new Date().getMonth() === 7 || new Date().getDate() === 31 && new Date().getMonth() === 9 || new Date().getDate() === 31 && new Date().getMonth() === 11 ) || (new Date().getDate() === 30 && new Date().getMonth() === 3 || new Date().getDate() === 30 && new Date().getMonth() === 5 || new Date().getDate() === 30 && new Date().getMonth() === 8 || new Date().getDate() === 30 && new Date().getMonth() === 10 ) || (new Date().getDate() === 28 && new Date().getMonth() === 1) || (new Date().getDate() === 29 && new Date().getMonth() === 1) ? 1 : new Date().getDate()+1;
            localStorage.setItem("todoList", JSON.stringify({
              mode: state.mode,
              resetTime: state.resetTime,
              validDate: (new Date().getDate() === 31 && new Date().getMonth() === 0 || new Date().getDate() === 31 && new Date().getMonth() === 2 || new Date().getDate() === 31 && new Date().getMonth() === 4 || new Date().getDate() === 31 && new Date().getMonth() === 6 || new Date().getDate() === 31 && new Date().getMonth() === 7 || new Date().getDate() === 31 && new Date().getMonth() === 9 || new Date().getDate() === 31 && new Date().getMonth() === 11 ) || (new Date().getDate() === 30 && new Date().getMonth() === 3 || new Date().getDate() === 30 && new Date().getMonth() === 5 || new Date().getDate() === 30 && new Date().getMonth() === 8 || new Date().getDate() === 30 && new Date().getMonth() === 10 ) || (new Date().getDate() === 28 && new Date().getMonth() === 1) || (new Date().getDate() === 29 && new Date().getMonth() === 1) ? 1 : new Date().getDate()+1,
              list: state.list,
            }))
          }
    }
})

export default todoListSlice.reducer;
export const {
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    deleteAllTasks,
    updateMode,
    setTimeOfTodo,
    resetTodoStatus,
    clearMessage,
    resetDate
} = todoListSlice.actions;