import React, {ChangeEvent, useState} from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";

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
            setError("Field is required");
        }
    };


    return (
        <div>
            <TextField label="Type text" variant="standard"
                value={title}
                onChange={onChangeHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask} color="secondary">
                <ControlPoint/>
            </IconButton>
        </div>
    ) 
}