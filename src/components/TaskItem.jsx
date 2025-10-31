import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { StatusSelect } from "./StatusSelect";
import { cn } from "../lib/utils";

export function TaskItem({ item, onRemoveItem, onChangeStatus }) {
  return (
    <li className="flex items-center gap-2">
      {false ? (
        <Input />
      ) : (
        <button
          className={cn(
            "flex-1 text-left px-3 py-2 rounded-md border hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {item.title}
        </button>
      )}

      <StatusSelect
        value={item.status}
        onChange={(newStatus) => onChangeStatus(item.id, newStatus)}
      />
      <Button onClick={() => onRemoveItem(item.id)} variant="ghost">
        Delete
      </Button>
    </li>
  );
}
