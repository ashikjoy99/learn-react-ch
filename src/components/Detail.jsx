import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";


export function Detail() {
  const {id} = useParams();
  const [user, setUser] = useState([]);
      useEffect(() => {
      const getUserDetail = async () => {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

          setUser(response.data);
      };
      getUserDetail();
      }, [id]);
  return (
    <div className="container py-10">
        <div className="flex gap-4 mb-6">
        <Link to="/" className="inline-block mb-6 text-blue-600 hover:underline">Home</Link>
        <Link to="/users" className="inline-block mb-6 text-blue-600 hover:underline">Back to Users</Link>
        </div>
        <h1 className="text-2xl font-semibold mb-6">{user.name}</h1>
        <div>
            <div key={user.id} className="mb-4 p-4 border rounded-md">
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
            </div>
        </div>
    </div>
    );     
}