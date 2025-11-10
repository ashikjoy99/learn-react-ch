import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { StatusSelect } from "./StatusSelect";
import { cn } from "../lib/utils";

import { useState } from "react";

export function TaskItem({ item, onRemoveItem, onChangeStatus, onEditItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.title);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditValue(item.title);
  };

  const handleSaveClick = () => {
    if (onEditItem) {
      onEditItem(item.id, editValue);
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditValue(item.title);
  };

  return (
    <li className="flex items-center gap-2 w-full">
      {isEditing ? (
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 min-w-[120px] px-3 py-2"
          autoFocus
        />
      ) : (
        <div
          className={cn(
            "flex-1 text-left px-3 py-2 rounded-md border bg-white min-w-[120px]"
          )}
        >
          {item.title}
        </div>
      )}

      <StatusSelect
        value={item.status}
        onChange={(newStatus) => onChangeStatus(item.id, newStatus)}
      />
      {isEditing ? (
        <>
          <Button onClick={handleSaveClick} variant="ghost">
            Save
          </Button>
          <Button onClick={handleCancelClick} variant="ghost">
            Cancel
          </Button>
        </>
      ) : (
        <Button onClick={handleEditClick} variant="ghost">
          Edit
        </Button>
      )}
      <Button onClick={() => onRemoveItem(item.id)} variant="ghost">
        Delete
      </Button>
    </li>
  );
}
