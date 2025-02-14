Quizo - Quiz Management System

Quizo is a Quiz Management System built with React (Frontend) and TypeScript (Backend). It allows users to create, manage, and take quizzes. The system includes user authentication, quiz CRUD operations, and a responsive UI using ShadCN UI.

Features

✅ User Authentication (Static credentials for now)
✅ Quiz Management (Create, Read, Update, Delete quizzes)
✅ Responsive UI with ShadCN UI
✅ API Integration with Axios
✅ Smooth Animations using Framer Motion
✅ React Router for Navigation
✅ Secure Backend using TypeScript & Express.js
✅ Database Support for MySQL/PostgreSQL

Tech Stack

Frontend:

React.js

React Router

Axios

ShadCN UI

Framer Motion (for animations)

Tailwind CSS

Backend:

Node.js

Express.js

TypeScript

PostgreSQL (for data storage)

Sequelize ORM

Installation & Setup

1️⃣ Clone the Repository

git clone  https://github.com/vikasmishra14/Quizo.git
cd Quizo

2️⃣ Install Dependencies

Frontend

cd frontend
npm install

Backend

cd backend
npm install

3️⃣ Configure Environment Variables

Create a .env file in the backend directory:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=quizo
JWT_SECRET=your_secret_key

Running the Application

Start the Backend Server

cd backend
node index.js

Start the Frontend Server

cd frontend
npm start

Your application should now be running at http://localhost:3000 🚀

API Endpoints

Authentication

POST /api/login - User login

Quiz Management

GET /api/quizzes - Fetch all quizzes

POST /api/quizzes - Create a new quiz

PUT /api/quizzes/:id - Update a quiz

DELETE /api/quizzes/:id - Delete a quiz

Folder Structure

quizo/
├── frontend/      # React Frontend
│   ├── src/ 
│   │   ├── App.jsx
│   │   ├── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│
├── backend/       # Node.js Backend
│   ├── src/
│   │   ├── index.ts
│   ├── package.json
│   ├── tsconfig.json
│
└── README.md

Contributing

Feel free to contribute by opening a pull request. 🚀

Contact

📧 vikas mishra - vikasmishra9572@gmail.com
