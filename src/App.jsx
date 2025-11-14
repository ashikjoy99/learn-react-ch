import { Route, Routes } from "react-router";
import { Home } from "./components/Home";
import Todomain from "./Todomain";
import { Users } from "./components/Users";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="todo" element={<Todomain />} />
      <Route path="users" element={<Users />} />
    </Routes>
  );
};
