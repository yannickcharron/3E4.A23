import express from 'express';


import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {

    constructor() {
        router.get('/planets', this.getAll);
        router.get('/planets/:idPlanet', this.getOne);
    }
 
    getAll(req, res) {
        //TODO: Route qui retrouve l'ensemble des planètes
        //console.log('GET ALL Planets');

        res.status(200);
        // res.set('Content-Type', 'application/json');
        // res.send(PLANETS);
        //.json() Défini le Content-Type et envoie la réponse en format json
        res.json(PLANETS);

    }

    getOne(req, res) {
        const idPlanet = parseInt(req.params.idPlanet, 10);

        const result = PLANETS.filter(p => p.id === idPlanet);
        console.log(result);

    }


}

//Appel le constructeur et ajoute l'ensemble des routes dans le routeur pour l'exportation
new PlanetsRoutes();
export default router;