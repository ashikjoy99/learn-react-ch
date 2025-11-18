import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TaskItem } from "./TaskItem";
import { useState } from "react";

export function Column({ title, items, onAddItem, onDeleteItem, onEditItem, onStatusChange }) {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;

    onAddItem({
      id: Date.now().toString(),
      title: inputValue,
      status: title.toLowerCase().replace(" ", "-"),
      isEditing: false,
    });

    setInputValue("");
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        
        <div className="flex gap-2 mb-3">
          <Input 
            placeholder="Search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="Add item" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
          />
          <Button onClick={addTodo}>Add</Button>
        </div>

        <ul className="space-y-2">
          {filteredItems.map(item => (
            <TaskItem
              key={item.id}
              item={item}
              onDelete={() => onDeleteItem(item.id)}
              onEdit={(newTitle) => onEditItem(item.id, newTitle)}
              onStatusChange={(status) => onStatusChange(item.id, status)}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}