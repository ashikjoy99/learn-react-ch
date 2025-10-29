import { useImmer } from "use-immer";
import { Column } from "./components/Column";

function App() {
  const [state, setState] = useImmer({
    todo: [{ id: "1", title: "Todo", status: "todo", isEditing: false }],
    inProgress: [
      {
        id: "2",
        title: "In Progress",
        status: "in-progress",
        isEditing: false,
      },
    ],
    completed: [
      {
        id: "3",
        title: "Completed",
        status: "completed",
        isEditing: false,
      },
    ],
    addState: { title: "", value: "" },
  });
  function onchangeSearch(val, title) {
    if (title === "Todo") {
      setState((draft) => {
        draft.todo = draft.todo.filter((item) =>
          item.title.toLowerCase().includes(val.target.value.toLowerCase())
        );
      });
    } else if (title === "In Progress") {
      setState((draft) => {
        draft.inProgress = draft.inProgress.filter((item) =>
          item.title.toLowerCase().includes(val.target.value.toLowerCase())
        );
      });
    } else if (title === "Completed") {
      setState((draft) => {
        draft.completed = draft.completed.filter((item) =>
          item.title.toLowerCase().includes(val.target.value.toLowerCase())
        );
      });
    }
  }
  function onchangeadd(val, title) {
    setState((draft) => {
      draft.addState["title"] = title;
      draft.addState["value"] = val.target.value;
    });
  }
  function getNextID(draft) {
    const allItems = [...draft.todo, ...draft.inProgress, ...draft.completed];
    const ids = allItems.map((item) => parseInt(item.id, 10));
    return Math.max(...ids) + 1;
  }

  function onAdd() {
    setState((draft) => {
      const value = draft.addState.value.trim().toLowerCase();
      const isDuplicate =
        draft.todo.some((item) => item.title.toLowerCase() === value) ||
        draft.inProgress.some((item) => item.title.toLowerCase() === value) ||
        draft.completed.some((item) => item.title.toLowerCase() === value);
      const nextId = getNextID(draft);
      if (!isDuplicate) {
        if (draft.addState.title === "Todo") {
          draft.todo.push({
            id: nextId,
            title: state.addState.value,
            status: "todo",
            isEditing: false,
          });
        } else if (draft.addState.title === "In Progress") {
          draft.inProgress.push({
            id: nextId,
            title: state.addState.value,
            status: "in-progress",
            isEditing: false,
          });
        } else if (draft.addState.title === "Completed") {
          draft.completed.push({
            id: nextId,
            title: state.addState.value,
            status: "completed",
            isEditing: false,
          });
        }
      }
      draft.addState.title = "";
      draft.addState.value = "";
    });
  }
  function getStatusKey(status) {
    if (status === "todo") {
      status = "todo";
    } else if (status === "in-progress") {
      status = "inProgress";
    } else if (status === "completed") {
      status = "completed";
    }
    return status;
  }
  function onDelete(id, status) {
    console.log(id, status);
    setState((draft) => {
      const list = draft[getStatusKey(status)];
      const index = list.findIndex((item) => item.id === id);
      if (index !== -1) {
        list.splice(index, 1);
      }
    });
  }
  function onSelectChange(oldStatus, newStatus) {
    setState((draft) => {
      const oldStatusKey = getStatusKey(oldStatus);
      const newStatusKey = getStatusKey(newStatus);
      const itemIndex = draft[oldStatusKey].findIndex(
        (item) => item.status === oldStatus
      );
      const newItemIndex = draft[newStatusKey].findIndex(
        (item) => item.status === newStatus
      );
      const [removedItem] = draft[oldStatusKey].splice(itemIndex, 1);
      removedItem.status = newStatus;
      draft[newStatusKey].push(removedItem);
    });
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-6">Task Board</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Column
          title="Todo"
          items={state.todo}
          onchange={onchangeSearch}
          onchangeadd={onchangeadd}
          onAdd={onAdd}
          addState={state.addState}
          onDelete={onDelete}
          onSelectChange={onSelectChange}
        />
        <Column
          title="In Progress"
          items={state.inProgress}
          onchange={onchangeSearch}
          onchangeadd={onchangeadd}
          onAdd={onAdd}
          addState={state.addState}
          onDelete={onDelete}
          onSelectChange={onSelectChange}
        />
        <Column
          title="Completed"
          items={state.completed}
          onchange={onchangeSearch}
          onchangeadd={onchangeadd}
          onAdd={onAdd}
          addState={state.addState}
          onDelete={onDelete}
          onSelectChange={onSelectChange}
        />
      </div>
    </div>
  );
}

export default App;
