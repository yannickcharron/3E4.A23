import express from 'express';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

import planetsRouter from './routes/planets-routes.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).end();
});

app.get('/date', (req, res) => {

    const timezone = req.query.timezone;

    res.status(200);
    res.set('Content-Type', 'text/plain');
    //dayjs() => La date actuelle
    //tz provient du plugin timezone
    const dateInATimeZone = dayjs.tz(dayjs(), timezone).format()
    res.send(dateInATimeZone);

});

app.get('/premiere', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('Notre première route avec express');
});

app.get('/deuxieme', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('Ma deuxième route avec express');
});

app.get('/math/:operation', (req, res) => {

    const operation = req.params.operation;

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    let resultat;

    switch(operation) {
        case 'somme':
            resultat = a + b;
            break;
        case 'difference':
            resultat = a - b;
            break;
        case 'produit':
            resultat = a * b;
            break;
        case 'quotient':
            resultat = a / b;
            break;
        case 'reste':
            resultat = a % b;
            break;
        default:
            res.status(400).end();
            return;

    }

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(resultat.toString());

    //Yannick
    //hfghfg


});

app.use(planetsRouter);

export default app;