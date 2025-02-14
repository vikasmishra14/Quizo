import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Input, Card, CardContent, Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui";
import axios from 'axios';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Quizo</h1>
      {isAuthenticated && (
        <Button className="bg-red-500 hover:bg-red-700" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center mt-4">
      <p>&copy; {new Date().getFullYear()} Quizo. All Rights Reserved.</p>
    </footer>
  );
}

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-2" />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
          <Button className="w-full bg-blue-500 hover:bg-blue-700" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/quizzes")
      .then((res) => setQuizzes(res.data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Your Quizzes</h2>
      <Button className="mb-4 bg-green-500 hover:bg-green-700" onClick={() => navigate('/quiz-form')}>
        Create New Quiz
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-bold">Title</TableCell>
            <TableCell className="font-bold">Description</TableCell>
            <TableCell className="font-bold">Date Created</TableCell>
            <TableCell className="font-bold">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell>{quiz.title}</TableCell>
              <TableCell>{quiz.description}</TableCell>
              <TableCell>{quiz.date}</TableCell>
              <TableCell>
                <Button className="mr-2 bg-blue-500 hover:bg-blue-700" onClick={() => navigate(`/quiz-form/${quiz.id}`)}>
                  Edit
                </Button>
                <Button className="bg-red-500 hover:bg-red-700" onClick={() => alert("Deleted")}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function QuizForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/quizzes/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch((error) => console.error("Error fetching quiz:", error));
    }
  }, [id]);

  const handleSubmit = () => {
    const payload = { title, description };
    const request = id
      ? axios.put(`http://localhost:5000/quizzes/${id}`, payload)
      : axios.post("http://localhost:5000/quizzes", payload);
    
    request
      .then(() => navigate("/dashboard"))
      .catch((error) => console.error("Error saving quiz:", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{id ? "Edit Quiz" : "Create New Quiz"}</h2>
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-2" />
      <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4" />
      <Button className="bg-blue-500 hover:bg-blue-700" onClick={handleSubmit}>
        {id ? "Update Quiz" : "Create Quiz"}
      </Button>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <motion.div className="flex-grow container mx-auto p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/quiz-form/:id?" element={isAuthenticated ? <QuizForm /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </motion.div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
