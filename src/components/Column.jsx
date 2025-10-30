import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TaskItem } from "./TaskItem";

export function Column({ title, items, onchange, onAdd, onchangeadd,addState, onDelete,onSelectChange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-3">
          <Input placeholder="Search" onChange={(e) => onchange(e, title)} />
        </div>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add item"
            value={addState.title === title ? addState.value : ""}
            onChange={(e) => onchangeadd(e, title)}
          />
          <Button onClick={onAdd}>Add</Button>
        </div>

        <ul className="space-y-2">
          {items?.map((item) => (
            <TaskItem key={item.id} title={item.title} item={item} onDelete={onDelete} onSelectChange={onSelectChange} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
