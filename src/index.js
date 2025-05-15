import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { NODE_ENV, PORT } from './config/secrets.js';

const app = express();

app.use(morgan(NODE_ENV === 'dev' ? 'dev' : 'combined'));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Ready, ${PORT}`);
});
