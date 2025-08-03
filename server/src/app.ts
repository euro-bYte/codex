import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { dbConx } from './Data/dbConx';
import { createAuthRouter } from './Routes/authRoute';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/auth', createAuthRouter(dbConx.dbPool));

app.get('/api/status', (req, res) => {
    res.send({ status: 'ok', message: 'API is running successfully!' });
});

export { app };