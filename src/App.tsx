import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v4 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from "@mui/icons-material";

export type FilterValuesType = "All" | "Active" | "Complete";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  const todolistId1 = v4();
  const todolistId2 = v4();

  const [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ]);

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  const [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v4(), title: "Dog", isDone: false },
      { id: v4(), title: "Cat", isDone: true },
      { id: v4(), title: "Mouse", isDone: false }
    ],
    [todolistId2]: [
      { id: v4(), title: "TV", isDone: false },
      { id: v4(), title: "Iphone", isDone: true },
      { id: v4(), title: "Keyboard", isDone: true }
    ]
  });

  function removeTask(id: string, todolistId: string) {
    if (tasksObj[todolistId]) {
      const filteredTasks = tasksObj[todolistId].filter(e => e.id !== id);
      setTasks({ ...tasksObj, [todolistId]: filteredTasks });
    }
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
    }
    setTodolists([...todolists])

  }

  function addTask(title: string, todolistId: string) {
    const task = { id: v4(), title: title, isDone: false };
    const tasks = tasksObj[todolistId] || [];
    const newTasks = [task, ...tasks];
    setTasks({ ...tasksObj, [todolistId]: newTasks });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const tasks = tasksObj[todolistId];
    if (tasks) {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, isDone } : task
      );
      setTasks({ ...tasksObj, [todolistId]: updatedTasks });
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    if (tasks) {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, title: newTitle } : task
      );
      setTasks({ ...tasksObj, [todolistId]: updatedTasks });
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const updatedTodolists = todolists.map(tl =>
      tl.id === todolistId ? { ...tl, filter: value } : tl
    );
    setTodolists(updatedTodolists);
  }

  function addTodolist(title: string) {
    let todolist: TodoListType = {
      id: v4(),
      filter: "All",
      title: title
    }
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge="start" color='inherit' aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6'>
            News
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={10}>
          {
            todolists.map((tl) => {
              let tasksForTodoList = tasksObj[tl.id] || [];

              if (tl.filter === "Complete") {
                tasksForTodoList = tasksForTodoList.filter(e => e.isDone === true);
              }
              if (tl.filter === "Active") {
                tasksForTodoList = tasksForTodoList.filter(e => e.isDone === false);
              }
              return <Grid item>
                <Paper style={{
                  padding: "10px"
                }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  )
}

export default App;
