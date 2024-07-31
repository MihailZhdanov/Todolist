import { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
};

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter("All", props.id);
    const onActiveClickHandler = () => props.changeFilter("Active", props.id);
    const onCompleteClickHandler = () => props.changeFilter("Complete", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) =>{
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
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
                            <li key={e.id} className={e.isDone ? "is-done" : ""}>
                                <input type="checkbox" onChange={onChangeHandler} checked={e.isDone} />
                                <EditableSpan title={e.title} onChange={onChangeTitleHandler}/>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        );
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "All" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "Active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "Complete" ? "active-filter" : ""}
                    onClick={onCompleteClickHandler}>Complete</button>
            </div>
        </div>
    );
}
