import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function StatusSelect({ value, onSelectChange }) {
  return (
    <Select
      onValueChange={(newValue) => onSelectChange(value, newValue)}
    >
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todo">Todo</SelectItem>
        <SelectItem value="in-progress">In Progress</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
}
