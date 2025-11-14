// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useImmer } from "use-immer";

export function Users() {
  const [userData, setSample] = useState({
    title: "User List",
    users: [],
  });
  const [data, setData] = useImmer({
    title: "User Immer List",
    users: [],
  });

  const [apiData, setApiData] = useState([]);

  //   useEffect(() => {
  //     const getUsers = async () => {
  //       try {
  //         const response = await fetch("http://pos/api/users");
  //         const data = await response.json();
  //         setUserData(data);
  //       } catch (error) {
  //         console.error("Error fetching users:", error);
  //       }
  //     };
  //     getUsers();
  //   }, []);
  const defaultUser = {
    id: Date.now().toString(),
    name: "New User",
    email: "new.user@example.com",
    phone: "000-000-0000",
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setApiData(json));
  }, []);

  console.log(apiData);
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-6">Users</h1>
      <h3>
        <Link to="/">User Details</Link>
      </h3>
      <button
        onClick={() => {
          setData((smija) => {
            smija.users.push(defaultUser);
          });

          setSample((prev) => {
            return {
              ...prev,
              users: prev.users.concat(defaultUser),
            };
          });
          console.log(userData);
        }}
      >
        Add
      </button>

       {
        apiData.map((user) => (
          <div key={user.id} className="mb-4 p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{user.title}</h2>
            <p className="text-gray-600">Completed: {user.completed.toString()}</p>
          </div>
        ))
      }
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <UserCard data={data} boldTitle={true} />
        <UserCard data={userData} />
      </div>
    </div>
  );
}

function UserCard({ data, boldTitle = false }) {
  return (
    <div>
      <h1
        style={{
          fontWeight: boldTitle ? "700" : "400",
          fontSize: 24,
          color: boldTitle ? "red" : "black",
        }}
      >
        {data.title}
      </h1>
      {data.users.map((user) => (
        <div key={user.id} className="mb-4 p-4 border rounded-md">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>
      ))}
    </div>
  );
}
