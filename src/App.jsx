import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Users } from './components/Users.jsx';
import { Home } from './components/Home.jsx';
import { Todo } from './components/Todo.jsx';
import { Detail } from './components/Detail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="todo" element={<Todo />} /> 
        <Route path="users/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
