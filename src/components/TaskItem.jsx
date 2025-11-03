import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { StatusSelect } from "./StatusSelect";
import { cn } from "../lib/utils";

export function TaskItem({ id, title, value, onDelete, onStatusChange, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(editValue);
    }
    setIsEditing(false);
  };

  return (
    <li className="flex items-center gap-2">
      {isEditing ? (
        <Input
          value={editValue}
          autoFocus
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="flex-1"
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className={cn(
            "flex-1 text-left px-3 py-2 rounded-md border hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {title}
        </button>
      )}

      <StatusSelect value={value} onChange={onStatusChange} />
      <Button variant="ghost" onClick={onDelete}>
        Delete
      </Button>
    </li>
  );
}
