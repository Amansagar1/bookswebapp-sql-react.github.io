import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import './Books.css'

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/Books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []); 

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/Books/" + id);
      window.location.reload('');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>sagar sharma</h1>
      <div className="books">
        {books.map(book => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt={book.cover} />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
            <Link to={`/update/${book.id}`} className="update-btn">Update</Link>
          </div>
        ))}
      </div>

      <button><Link to='/add'>Add new book</Link></button>
    </div>
  );
};

export default Books;
