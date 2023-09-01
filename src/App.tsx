import React, { useState, useEffect } from "react";
import AsyncAwait from "./components/asyncAwait";
import apiClient , { CanceledError } from "./services/api-client"

const App = () => {
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of users when the component is first rendered
    const Controller = new AbortController();
    setIsLoading(true);
    apiClient
      .get("/users")
      .then(({ data }) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });
      // .finally(() => {
      //   setIsLoading(false)
      // })
  }, []);
  const AddUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Ahita" };
    setUsers([newUser, ...users]);
    apiClient
      .post("/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const deleteUser = (id) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== id));
    apiClient
      .delete(`/users/${id}`)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
    console.log("Deleted! haha", users);
  };

  const updateUser = (user: { id: number; name: string }) => {
    const originalUser = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    apiClient
      .patch(
        "/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="text-danger">Loading...</div>}
      <button className="btn btn-primary mb-3" onClick={AddUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}

            <div className="">
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
