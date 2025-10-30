import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TaskItem } from "./TaskItem";
import { useState } from "react";

export function Column({ title, items, onAddItem }) {
  const [inputValue, setInputValue] = useState("");

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-3">
          <Input placeholder="Search" />
        </div>
        <div className="flex gap-2 mb-4">
          <Input  value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} placeholder="Add item" />
          <Button onClick={addTodo}>Add</Button>
        </div>

        <ul className="space-y-2">
          {items?.map((item) => (
            <TaskItem key={item.id} title={item.title} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
