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
        mode: JSON.parse(getTodoList).mode,
        resetDateForTask: JSON.parse(getTodoList).validDate,
        resetTime: JSON.parse(getTodoList).resetTime,
    },
    reducers: {
        addTask: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if(action.payload.title === ""){
              state.error = "Please atleast title!"
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
              state.message = "Hurray! Completed."
              state.error = ""
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
              state.message = "Cleared Tasks Successfully!"
              state.error = ""
            }
          },
          updateMode : (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
            state.mode = action.payload
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
            localStorage.setItem("todoList", JSON.stringify({
              mode: state.mode,
              resetTime: action.payload,
              validDate: new Date().getDate(),
              list: state.list,
            }))
            }
          },
          // resetTimeOfTodo: (state, action) => {
          //   const todoList = window.localStorage.getItem('todoList');
          //   if (todoList) {           
          //   state.resetDateForTask = action.payload;
          //   localStorage.setItem("todoList", JSON.stringify({
          //     mode: state.mode,
          //     resetTime: state.resetTime,
          //     validDate: action.payload,
          //     list: state.list,
          //   }))
          //   }
          // },
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
    // resetTimeOfTodo,
    resetTodoStatus
} = todoListSlice.actions;