import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TaskItem } from "./TaskItem";

export function Column({ title, items, onAddTask, onDeleteTask, onStatusChange, onEditTask }) {
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddClick = () => {
    onAddTask(newTask);
    setNewTask("");
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add item"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddClick()}
          />
          <Button onClick={handleAddClick}>Add</Button>
        </div>

        <ul className="space-y-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <TaskItem
                key={item.id}
                id={item.id}
                title={item.title}
                value={item.status}
                onDelete={() => onDeleteTask(item.id)}
                onStatusChange={(newStatus) => onStatusChange(item.id, newStatus)}
                onEdit={(newTitle) => onEditTask(item.id, newTitle)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400">No tasks found</p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
