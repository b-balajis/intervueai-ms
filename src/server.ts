import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const evaluationRoute = require('./routes/evaluation')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', evaluationRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
