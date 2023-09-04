import React, { useState, useEffect } from "react";
import AsyncAwait from "./components/asyncAwait";
import apiClient, { CanceledError } from "./services/api-client";
import Product from "./components/productsList";
import UserService , {User} from "./services/userService"



const App = () => {
  const [category, setCategory] = useState("");
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of users when the component is first rendered
    setIsLoading(true);
    const {request , cancel} = UserService.getAllUsers()
      request.then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });
      return () => cancel()
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
  }
  const deleteUser = (user : User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    UserService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
    console.log("Deleted! haha", users);
  };

  const updateUser = (user: { id: number; name: string }) => {
    const originalUser = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
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
      <ul className="list-group mb-10">
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
      <select
        name=""
        className="form-select mb-7"
        id=""
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <Product category={category} />
    </div>
  );
};

export default App;
