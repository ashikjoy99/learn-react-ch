import { useImmer } from "use-immer";
import { Column } from "./components/Column";

function App() {
  const [state, setState] = useImmer({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const addItem = (column, newItem) => {
    setState(draft => {
      draft[column].push(newItem);
    });
  };

  const deleteItem = (column, id) => {
    setState(draft => {
      draft[column] = draft[column].filter(item => item.id !== id);
    });
  };
  
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-6">Task Board</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Column
          title="Todo"
          items={state.todo}
          onAddItem={(item) => addItem("todo", item)}
          onDeleteItem={(id) => deleteItem("todo", id)}
        />
        <Column
          title="In Progress"
          items={state.inProgress}
          onAddItem={(item) => addItem("inProgress", item)}
          onDeleteItem={(id) => deleteItem("inProgress", id)}
        />
         <Column
          title="Completed"
          items={state.completed}
          onAddItem={(item) => addItem("completed", item)}
          onDeleteItem={(id) => deleteItem("completed", id)}
        />
      </div>
    </div>
  );
}

export default App;
