import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("https://randomuser.me/api/?results=10");
      const response = res.data;

      setUserData(
        response.results.map((user, index) => ({
          id: index + 1,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          phone: user.phone,
          picture: user.picture.large,
        }))
      );
    };

    getUsers();
  }, []);

  return (
    <div className="container mx-auto py-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold tracking-wide">Users</h1>

        <Link
          to="/"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Home
        </Link>
      </div>

      {/* Users List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="block bg-white shadow-md border rounded-xl p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.picture}
                alt="user"
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-600 text-sm">{user.phone}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
