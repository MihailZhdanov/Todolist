import { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { IconButton, Button, Checkbox } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    filter: FilterValuesType;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    id: string;
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter("All", props.id);
    const onActiveClickHandler = () => props.changeFilter("Active", props.id);
    const onCompleteClickHandler = () => props.changeFilter("Complete", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) =>{
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(e => {
                        const onRemoveHandler = () => {
                            props.removeTask(e.id, props.id);
                        };
                        const onChangeStatusHandler = (t: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(e.id, t.target.checked, props.id);
                        };
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(e.id, newValue, props.id);
                        };
                        return (
                            <div key={e.id} className={e.isDone ? "is-done" : ""}>
                                <Checkbox color="secondary" onChange={onChangeStatusHandler} checked={e.isDone} />
                                <EditableSpan title={e.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        );
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "All" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "Active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "Complete" ? "contained" : "text"}
                    onClick={onCompleteClickHandler}>Complete</Button>
            </div>
        </div>
    );
}
