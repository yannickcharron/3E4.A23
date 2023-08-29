import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).end();
});

app.get('/premiere', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('Notre première route avec express');
});

export default app;