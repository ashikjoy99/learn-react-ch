import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TaskItem } from "./TaskItem";
import { useImmer } from "use-immer";

export function Column({
  title,
  items,
  onAddItem,
  onRemoveItem,
  onChangeStatus,
  onEditItem,
}) {
  const [newItem, setNewItem] = useImmer("");
  const [search, setSearch] = useImmer("");
  const filteredItems = items.filter((item) =>
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
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <Button
            onClick={() => {
              onAddItem(newItem);
              setNewItem("");
            }}
          >
            Add
          </Button>
        </div>

        <ul className="space-y-2">
          {filteredItems?.map((item) => (
            <TaskItem
              key={item.id}
              item={item}
              onRemoveItem={(itemId) => onRemoveItem(itemId)}
              onChangeStatus={onChangeStatus}
              onEditItem={onEditItem}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
