import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
const PORT = 3001;

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0531',
  database: 'sagar'
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello, this is the Sagar backend.");
});

app.get("/books", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM books");
    res.json(rows);
  } catch (err) {
    console.error("Error executing the query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/books", async (req, res) => {
  const sql = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?, ?, ?, ?)";
  const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

  try {
    await db.query(sql, values);
    res.json("Book has been created successfully.");
  } catch (err) {
    console.error("Error executing the query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, [bookId])
    .then(() => {
      res.json("Book has been deleted successfully");
    })
    .catch((err) => {
      console.error("Error executing the query:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sql = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  const values = [req.body.title, req.body.desc, req.body.price, req.body.cover, bookId];

  db.query(sql, values)
    .then(() => {
      res.json("Book has been updated successfully");
    })
    .catch((err) => {
      console.error("Error executing the query:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
