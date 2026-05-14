import React, { useState } from "react";
import { deleteUser } from "../api/userApi";
import "./DeleteUser.css";

const DeleteUser = () => {

  const [email, setEmail] = useState("");

  const handleDelete = async (e) => {

    e.preventDefault();

    try {

      const data = await deleteUser(email);

      alert(data.message);

      setEmail("");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Error deleting user"
      );

    }
  };


   return (

  <div className="delete-user-container">

    <div className="delete-user-card">

      <h1 className="delete-user-title">
        Delete User
      </h1>

      <form
        className="delete-user-form"
        onSubmit={handleDelete}
      >

        <input
          className="delete-user-input"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
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