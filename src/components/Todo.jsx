import { useImmer } from "use-immer";
import { Link } from "react-router";
import { Column } from "./Column";

export function Todo() {
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
    
    const editItem = (column, id, newTitle) => {
      setState(draft => {
        const task = draft[column].find(t => t.id === id);
        if (task) task.title = newTitle;
      });
    };
  
    const moveItem = (fromColumn, id, newStatus) => {
      setState((draft) => {
        const index = draft[fromColumn].findIndex((t) => t.id === id);
        if (index === -1) return;
  
        const task = draft[fromColumn][index];
  
        draft[fromColumn].splice(index, 1);
  
        task.status = newStatus;
  
        if (newStatus === "todo") draft.todo.push(task);
        if (newStatus === "in-progress") draft.inProgress.push(task);
        if (newStatus === "completed") draft.completed.push(task);
      });
    };
  
  
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-semibold mb-6">Task Board</h1>
        <div className="flex gap-4 mb-6"><Link to="/" className="inline-block mb-6 text-blue-600 hover:underline">Home</Link></div>
        <div className="grid gap-6 md:grid-cols-3">
          <Column
            title="Todo"
            items={state.todo}
            onAddItem={(item) => addItem("todo", item)}
            onDeleteItem={(id) => deleteItem("todo", id)}
            onEditItem={(id, newTitle) => editItem("todo", id, newTitle)}
            onStatusChange={(id, newStatus) => moveItem("todo", id, newStatus)}
          />
          <Column
            title="In Progress"
            items={state.inProgress}
            onAddItem={(item) => addItem("inProgress", item)}
            onDeleteItem={(id) => deleteItem("inProgress", id)}
            onEditItem={(id, newTitle) => editItem("inProgress", id, newTitle)}
            onStatusChange={(id, newStatus) => moveItem("inProgress", id, newStatus)}
          />
           <Column
            title="Completed"
            items={state.completed}
            onAddItem={(item) => addItem("completed", item)}
            onDeleteItem={(id) => deleteItem("completed", id)}
            onEditItem={(id, newTitle) => editItem("completed", id, newTitle)}
            onStatusChange={(id, newStatus) => moveItem("completed", id, newStatus)}
          />
        </div>
      </div>
    );
}
