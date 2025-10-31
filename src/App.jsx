import { useImmer } from "use-immer";
import { Column } from "./components/Column";

function App() {
  const [state, setState] = useImmer({
    todo: [],
    inProgress: [],
    completed: [],
  });

  function addItem(item, arrayTitle, status) {
    setState((draft) => {
      draft[arrayTitle].push({
        id: `${Date.now()}_${Math.random()}`,
        title: item,
        status: status,
        isEditing: false,
      });
    });
  }

  function removeItem(itemId, arrayTitle) {
    setState((draft) => {
      draft[arrayTitle] = draft[arrayTitle].filter(
        (item) => item.id !== itemId
      );
    });
  }

  function changeItemStatus(itemId, fromArray, toStatus) {
    setState((draft) => {
      const itemIndex = draft[fromArray].findIndex(
        (item) => item.id === itemId
      );
      if (itemIndex === -1) return;

      const [item] = draft[fromArray].splice(itemIndex, 1);
      item.status = toStatus;
      let toArray = "";
      if (toStatus === "todo") toArray = "todo";
      else if (toStatus === "in-progress") toArray = "inProgress";
      else if (toStatus === "completed") toArray = "completed";
      draft[toArray].push(item);
    });
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-6">Task Board</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Column
          title="Todo"
          items={state.todo}
          onAddItem={(newItem) => addItem(newItem, "todo", "todo")}
          onRemoveItem={(itemId) => removeItem(itemId, "todo")}
          onChangeStatus={(itemId, newStatus) =>
            changeItemStatus(itemId, "todo", newStatus)
          }
        />

        <Column
          title="In Progress"
          items={state.inProgress}
          onAddItem={(newItem) => addItem(newItem, "inProgress", "in-progress")}
          onRemoveItem={(itemId) => removeItem(itemId, "inProgress")}
          onChangeStatus={(itemId, newStatus) =>
            changeItemStatus(itemId, "inProgress", newStatus)
          }
        />
        <Column
          title="Completed"
          items={state.completed}
          onAddItem={(newItem) => addItem(newItem, "completed", "completed")}
          onRemoveItem={(itemId) => removeItem(itemId, "completed")}
          onChangeStatus={(itemId, newStatus) =>
            changeItemStatus(itemId, "completed", newStatus)
          }
        />
      </div>
    </div>
  );
}

export default App;
