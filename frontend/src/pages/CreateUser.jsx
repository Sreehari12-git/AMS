import { useState } from "react";
import { createUser } from "../api/userApi";
import "./CreateUser.css"

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!role) {
      setMessage("Please select a role.");
      setIsError(true);
      return;
    }

    try {
      const data = await createUser({
        name,
        email,
        password,
        role
      });

      setMessage(data.message || "User created successfully.");
      setIsError(false);

      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating user");
      setIsError(true);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <div className="create-user-container">
      <div className="create-user-card">
        <h1 className="create-user-title">
          Create User
        </h1>

        {message && (
          <div className={`create-user-message ${isError ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <form
          className="create-user-form"
          onSubmit={handleSubmit}
        >
          <input
            className="create-user-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />

          <input
            className="create-user-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />

          <input
            className="create-user-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />

          <select
            className="create-user-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled hidden>Select a role</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
            <option value="HR">HR</option>
          </select>

          <br />

          <button
            className="create-user-btn"
            type="submit"
          >
            Create User
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateUser;

