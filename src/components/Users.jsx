import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";

export function Users() {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
    const getUsers = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        setUserData(data);
    };
    getUsers();
    }, []);
    
  return (
    <div className="container py-10">
        <h1 className="text-2xl font-semibold mb-6">Users</h1>
        <h3><Link to="/">Home</Link></h3>
        <div>
            {userData.map(user => (
                <div key={user.id} className="mb-4 p-4 border rounded-md">
                    <h2 className="text-xl font-semibold">{user.name}</h2>  
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">{user.phone}</p>
                </div>
            ))}
        </div>
    </div>
    );     
}