import { useImmer } from "use-immer";
import { Column } from "./components/Column";

function App() {
  const [state, setState] = useImmer({
    todo: [],
    inProgress: [],
    completed: [],
  });
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-6">Task Board</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Column
          title="Todo"
          items={[
            { id: "1", title: "Sample todo", status: "todo", isEditing: false },
          ]}
        />
        <Column
          title="In Progress"
          items={[
            {
              id: "2",
              title: "Working on UI",
              status: "in-progress",
              isEditing: false,
            },
          ]}
        />
        <Column
          title="Completed"
          items={[
            {
              id: "2",
              title: "Working on UI",
              status: "in-progress",
              isEditing: false,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
