<<<<<<< HEAD
import { TextField } from "@mui/material";
=======
>>>>>>> 4a711ee562ce5d073d0bc61ea0589edaf8249e1a
import React, {ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
   
   let [editMode, setEditMode] = useState(false);
   let [title, setTitle] = useState("")

   const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
   }
   const activateViewMode = () => {
    setEditMode(false);
<<<<<<< HEAD
    if (title.trim()) { 
        props.onChange(title);
    }
=======
    props.onChange(title);
>>>>>>> 4a711ee562ce5d073d0bc61ea0589edaf8249e1a
   }
   const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement> ) => setTitle(e.target.value)

    return editMode
<<<<<<< HEAD
        ? <TextField variant="standard" value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
=======
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
>>>>>>> 4a711ee562ce5d073d0bc61ea0589edaf8249e1a
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

