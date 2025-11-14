import { Link } from "react-router";

export function Home() {
  return (
    <div className="container py-10">
        <h1 className="text-2xl font-semibold mb-6">Welcome to the Home Page</h1>
        <div className="flex gap-4 mb-6">
        <Link to="users" className="inline-block mb-6 text-blue-600 hover:underline">User</Link>
        <Link to="todo" className="inline-block mb-6 text-blue-600 hover:underline">Todo</Link>
        </div>
    </div>
    );     
}