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

app.get('/deuxieme', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('Ma deuxième route avec express');
});

// app.get('/math/somme', (req, res) => {

//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);
    
//     console.log(req.query);
//     const somme = a + b;
//     res.status(200);
//     res.set('Content-Type', 'text/plain');
//     res.send(somme.toString());

// });

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


});

export default app;