import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get the book ID
import './Add.css';

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/books/${id}`, book); 
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form">
      <h1>Update New Book</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cover URL"
        name="cover"
        onChange={handleChange}
      />

      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
