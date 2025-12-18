import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import usersRouter from './api/users/index.js';
import './db/index.js';
import moviesRouter from './api/movies';   




dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter); 



app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
