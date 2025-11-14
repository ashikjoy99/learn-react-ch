import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";

export function Users() {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
    const getUsers = async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");

        setUserData(response.data);
    };
    getUsers();
    }, []);
    
  return (
    <div className="container py-10">
        <h1 className="text-2xl font-semibold mb-6">Users</h1>
        <div className="flex gap-4 mb-6"><Link to="/" className="inline-block mb-6 text-blue-600 hover:underline">Home</Link></div>
        <div>
            {userData.map(user => (
                <div key={user.id} className="mb-4 p-4 border rounded-md">
                    <Link to={`/users/${user.id}`} key={user.id}>
                    <h2 className="text-xl font-semibold text-blue-600 hover:underline">{user.name}</h2>
                    </Link>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">{user.phone}</p>
                </div>
            ))}
        </div>
    </div>
    );     
}