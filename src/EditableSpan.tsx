import { TextField } from "@mui/material";
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
    if (title.trim()) { 
        props.onChange(title);
    }
   }
   const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement> ) => setTitle(e.target.value)

    return editMode
        ? <TextField variant="standard" value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

