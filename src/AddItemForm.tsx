import React, {ChangeEvent, useState} from "react";

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
            setError("Поле обязательно");
        }
    };


    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    ) 
}