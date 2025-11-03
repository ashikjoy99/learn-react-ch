import { useImmer } from "use-immer";
import { Column } from "./components/Column";

function App() {
  const [state, setState] = useImmer({
    todo: [{ id: "1", title: "Todo", status: "todo", isEditing: false }],
    inProgress: [
      { id: "2", title: "In Progress", status: "in-progress", isEditing: false },
    ],
    completed: [
      { id: "3", title: "Completed", status: "completed", isEditing: false },
    ],
  });

  // Add new task
  const handleAddTask = (column, title) => {
    if (!title.trim()) return;
    setState((draft) => {
      draft[column].push({
        id: Date.now().toString(),
        title,
        status: column === "inProgress" ? "in-progress" : column,
        isEditing: false,
      });
    });
  };

  // Delete task
  const handleDeleteTask = (column, id) => {
    setState((draft) => {
      draft[column] = draft[column].filter((item) => item.id !== id);
    });
  };

  // Change status
  const handleStatusChange = (currentColumn, id, newStatus) => {
    setState((draft) => {
      const taskIndex = draft[currentColumn].findIndex((item) => item.id === id);
      if (taskIndex === -1) return;

      const [task] = draft[currentColumn].splice(taskIndex, 1);
      const statusToColumn = {
        todo: "todo",
        "in-progress": "inProgress",
        completed: "completed",
      };
      const newColumn = statusToColumn[newStatus];
      task.status = newStatus;
      draft[newColumn].push(task);
    });
  };

  // ✅ Edit task title
  const handleEditTask = (column, id, newTitle) => {
    setState((draft) => {
      const task = draft[column].find((t) => t.id === id);
      if (task) {
        task.title = newTitle;
      }
    });
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-6">Task Board</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Column
          title="Todo"
          items={state.todo}
          onAddTask={(title) => handleAddTask("todo", title)}
          onDeleteTask={(id) => handleDeleteTask("todo", id)}
          onStatusChange={(id, newStatus) => handleStatusChange("todo", id, newStatus)}
          onEditTask={(id, newTitle) => handleEditTask("todo", id, newTitle)}
        />
        <Column
          title="In Progress"
          items={state.inProgress}
          onAddTask={(title) => handleAddTask("inProgress", title)}
          onDeleteTask={(id) => handleDeleteTask("inProgress", id)}
          onStatusChange={(id, newStatus) => handleStatusChange("inProgress", id, newStatus)}
          onEditTask={(id, newTitle) => handleEditTask("inProgress", id, newTitle)}
        />
        <Column
          title="Completed"
          items={state.completed}
          onAddTask={(title) => handleAddTask("completed", title)}
          onDeleteTask={(id) => handleDeleteTask("completed", id)}
          onStatusChange={(id, newStatus) => handleStatusChange("completed", id, newStatus)}
          onEditTask={(id, newTitle) => handleEditTask("completed", id, newTitle)}
        />
      </div>
    </div>
  );
}

export default App;
