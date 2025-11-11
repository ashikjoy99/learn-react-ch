import { Link } from "react-router";

export function Home() {
  return (
    <div className="container py-10">
        <h1 className="text-2xl font-semibold mb-6">Welcome to the Home Page</h1>
        <h3><Link to="todo">ToDO</Link></h3>
        <h3><Link to="users">User</Link></h3>
    </div>
    );     
}