import express from 'express';
import HttpError from 'http-errors';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {

    constructor() {
        router.get('/planets', this.getAll);
        router.get('/planets/:idPlanet', this.getOne);
        router.delete('/planets/:idPlanet', this.deleteOne);
        router.post('/planets', this.post);
    }
 
    getAll(req, res, next) {
        //TODO: Route qui retrouve l'ensemble des planètes
        //console.log('GET ALL Planets');

        res.status(200);
        // res.set('Content-Type', 'application/json');
        // res.send(PLANETS);
        //.json() Défini le Content-Type et envoie la réponse en format json
        res.json(PLANETS);

    }

    getOne(req, res, next) {
        const idPlanet = parseInt(req.params.idPlanet, 10);

        const result = PLANETS.filter(p => p.id === idPlanet);
        console.log(result);

        //Cas une planète trouvée
        //res.status(200);
        //res.json(result[0]);
        if(result.length === 0) {
            //Envoie une erreur 404
            return next(HttpError.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas`));
        }
        
        res.status(200).json(result[0]);

    }

    deleteOne(req, res, next) {
        return next(HttpError.MethodNotAllowed());
    }

    post(req, res, next) {
        console.log(req.body);
        //TODO:
    }


}

//Appel le constructeur et ajoute l'ensemble des routes dans le routeur pour l'exportation
new PlanetsRoutes();
export default router;