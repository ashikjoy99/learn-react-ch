import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { StatusSelect } from "./StatusSelect";
import { cn } from "../lib/utils";
import { useState } from "react";

export function TaskItem({ item, onDelete, onEdit, onStatusChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.title);

  const saveEdit = () => {
    if (value.trim() === "") return;
    onEdit(value);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center gap-2">
      {isEditing ? (
        <input
          className="flex-1 px-3 py-2 rounded-md border"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          autoFocus
        />
      ) : (
        <button
          className="flex-1 text-left px-3 py-2 rounded-md border"
          onClick={() => setIsEditing(true)}
        >
          {item.title}
        </button>
      )}

      <StatusSelect
        value={item.status}
        onChange={(status) => onStatusChange(status)}
      />

      {isEditing ? (
        <Button variant="ghost" onClick={saveEdit}>Save</Button>
      ) : (
        <Button variant="ghost" onClick={onDelete}>Delete</Button>
      )}
    </li>
  );
}
