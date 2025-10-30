import { useImmer } from "use-immer";
import { Column } from "./components/Column";

const STATUS_KEY = {
  todo: "todo",
  "in-progress": "inProgress",
  completed: "completed",
};

const TITLE_TO_STATUS = {
  Todo: "todo",
  "In Progress": "in-progress",
  Completed: "completed",
};

export default function App() {
  const [state, setState] = useImmer({
    todo: [{ id: "1", title: "Todo", status: "todo", isEditing: false }],
    inProgress: [
      { id: "2", title: "In Progress", status: "in-progress", isEditing: false },
    ],
    completed: [
      { id: "3", title: "Completed", status: "completed", isEditing: false },
    ],
    addState: { title: "", value: "" },
    search: { Todo: "", "In Progress": "", Completed: "" },
  });

  const normalize = (s = "") => s.trim().toLowerCase();
  const nextId = () => Date.now().toString();

  const getStatusKey = (status) => STATUS_KEY[status] || status;

  const onchangeSearch = (ev, title) => {
    const val = ev.target.value;
    setState((draft) => {
      draft.search[title] = val;
    });
  };

  const onchangeadd = (ev, title) => {
    const val = ev.target.value;
    setState((draft) => {
      draft.addState.title = title;
      draft.addState.value = val;
    });
  };

  const onAdd = () => {
    setState((draft) => {
      const titleValue = draft.addState.value.trim();
      if (!titleValue) return;

      const norm = normalize(titleValue);
      const isDuplicate =
        draft.todo.some((i) => normalize(i.title) === norm) ||
        draft.inProgress.some((i) => normalize(i.title) === norm) ||
        draft.completed.some((i) => normalize(i.title) === norm);

      if (isDuplicate) {
        draft.addState.value = "";
        return;
      }

      const status = TITLE_TO_STATUS[draft.addState.title] || "todo";
      const key = getStatusKey(status);

      draft[key].push({
        id: nextId(),
        title: titleValue,
        status,
        isEditing: false,
      });

      draft.addState.title = "";
      draft.addState.value = "";
    });
  };

  const onDelete = (id, status) => {
    setState((draft) => {
      const list = draft[getStatusKey(status)];
      const idx = list.findIndex((i) => i.id === id);
      if (idx !== -1) list.splice(idx, 1);
    });
  };

  const onSelectChange = (arg1, arg2) => {
    setState((draft) => {
      let id;
      let newStatus;

      const isIdCall = Object.values(draft).flat().some((i) => i && i.id === arg1);
      if (isIdCall) {
        id = arg1;
        newStatus = arg2;
      } else {
        const oldStatus = arg1;
        newStatus = arg2;
        const oldKey = getStatusKey(oldStatus);
        const idx = draft[oldKey].findIndex((i) => i.status === oldStatus);
        if (idx === -1) return;
        id = draft[oldKey][idx].id;
      }
      const allKeys = ["todo", "inProgress", "completed"];
      let fromKey, itemIndex;
      for (const k of allKeys) {
        const list = draft[k];
        const i = list.findIndex((it) => it.id === id);
        if (i !== -1) {
          fromKey = k;
          itemIndex = i;
          break;
        }
      }
      if (!fromKey) return;

      const [item] = draft[fromKey].splice(itemIndex, 1);
      item.status = newStatus;
      const toKey = getStatusKey(newStatus);
      draft[toKey].push(item);
    });
  };

  const getItemsFor = (title) => {
    const status = TITLE_TO_STATUS[title] || "todo";
    const key = getStatusKey(status);
    const q = normalize(state.search[title]);
    if (!q) return state[key];
    return state[key].filter((i) => normalize(i.title).includes(q));
  };

  const columns = ["Todo", "In Progress", "Completed"];

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-6">Task Board</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {columns.map((title) => (
          <Column
            key={title}
            title={title}
            items={getItemsFor(title)}
            onchange={onchangeSearch}
            onchangeadd={onchangeadd}
            onAdd={onAdd}
            addState={state.addState}
            onDelete={onDelete}
            onSelectChange={onSelectChange}
          />
        ))}
      </div>
    </div>
  );
}