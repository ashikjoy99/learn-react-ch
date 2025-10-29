import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { StatusSelect } from "./StatusSelect";
import { cn } from "../lib/utils";

export function TaskItem({ title = "test" , item , onDelete,onSelectChange}) {
  return (
    <li className="flex items-center gap-2">
      {false ? (
        <Input  />
      ) : (
        <button 
          className={cn(
            "flex-1 text-left px-3 py-2 rounded-md border hover:bg-accent hover:text-accent-foreground"
          )}
          
        >
          {title}
        </button>
      )}
      <StatusSelect value={item.status} onSelectChange={onSelectChange} />
      <Button variant="ghost" onClick={() => onDelete(item.id, item.status)}>Delete </Button>
    </li>
  );
}
