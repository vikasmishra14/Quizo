import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Pool } from 'pg';  

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json()); 

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'quizo',
  password: 'your_password',
  port: 5432,  
});

// Hardcoded user credentials
const STATIC_USER = { username: 'teacher', password: 'password' };

// Authentication Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === STATIC_USER.username && password === STATIC_USER.password) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Create Quiz
app.post('/quizzes', async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO quizzes (title, description, teacher_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, 1] // Assuming a static teacher_id for now
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Quizzes
app.get('/quizzes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quizzes WHERE teacher_id = $1', [1]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Quiz by ID
app.get('/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM quizzes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Quiz not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Quiz
app.put('/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE quizzes SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Quiz
app.delete('/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM quizzes WHERE id = $1', [id]);
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
