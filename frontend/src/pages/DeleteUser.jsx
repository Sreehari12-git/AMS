import React, { useState } from "react";
import { deleteUser } from "../api/userApi";
import "./DeleteUser.css";

const DeleteUser = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!email) {
      setMessage("Please enter an email address.");
      setIsError(true);
      return;
    }

    try {
      const data = await deleteUser(email);
      setMessage(data.message || "User deleted successfully.");
      setIsError(false);
      setEmail("");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Error deleting user"
      );
      setIsError(true);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="delete-user-container">
      <div className="delete-user-card">
        <h1 className="delete-user-title">
          Delete User
        </h1>

        {message && (
          <div className={`delete-user-message ${isError ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <form
          className="delete-user-form"
          onSubmit={handleDelete}
        >
          <input
            className="delete-user-input"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="delete-user-btn"
            type="submit"
          >
            Delete User
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;
