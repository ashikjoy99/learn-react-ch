import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { StatusSelect } from "./StatusSelect";
import { cn } from "../lib/utils";

export function TaskItem({ item, onDelete }) {
  return (
     <li className="flex items-center gap-2">

      <button
        className="flex-1 text-left px-3 py-2 rounded-md border"
      >
        {item.title}
      </button>

      <StatusSelect />

      <Button variant="ghost" onClick={onDelete}>
        Delete
      </Button>

    </li>
  );
}
