import React, {ChangeEvent, useState} from "react";
<<<<<<< HEAD
import { Button, IconButton, TextField } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";
=======
>>>>>>> 4a711ee562ce5d073d0bc61ea0589edaf8249e1a

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        if (value.trim() !== "") {
            setError(null);
        }
    };

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
            setError(null);
        } else {
<<<<<<< HEAD
            setError("Field is required");
=======
            setError("Поле обязательно");
>>>>>>> 4a711ee562ce5d073d0bc61ea0589edaf8249e1a
        }
    };


    return (
        <div>
<<<<<<< HEAD
            <TextField label="Type text" variant="standard"
                value={title}
                onChange={onChangeHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask} color="secondary">
                <ControlPoint/>
            </IconButton>
=======
            <input
                value={title}
                onChange={onChangeHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
>>>>>>> 4a711ee562ce5d073d0bc61ea0589edaf8249e1a
        </div>
    ) 
}