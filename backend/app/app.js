import express from 'express';
import shoesRouter from '../routes/shoes';
import usersRouter from '../routes/users';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/shoes', shoesRouter);
app.use('/users', usersRouter);

export default app;