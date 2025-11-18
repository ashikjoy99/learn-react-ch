import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 min-h-[80vh] flex items-center">
      <div className="container text-white">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg mb-10 opacity-90">
          Choose where you want to go:
        </p>

        <div className="flex gap-6">
          <Link
            to="/todo"
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100"
          >
            Todo List
          </Link>
          <Link
            to="/users"
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100"
          >
            Users
          </Link>
        </div>
      </div>
    </div>
  );
}
