import express from 'express';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

import planetsRouter from './routes/planets-routes.js';

import errorsMiddleware from './middlewares/errors.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).end();
});

app.use(planetsRouter);
//Si d'autres routers les mettre avant le middleware de gestion d'error

app.use(errorsMiddleware);

export default app;