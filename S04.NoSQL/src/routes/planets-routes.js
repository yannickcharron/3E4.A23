import express from 'express';
import HttpError from 'http-errors';

import Planet from '../models/planet-model.js';

const router = express.Router();

class PlanetsRoutes {

    constructor() {
        router.get('/planets', this.getAll);
        router.get('/planets/:idPlanet', this.getOne);
        router.delete('/planets/:idPlanet', this.deleteOne);
        router.post('/planets', this.post);
    }
 
    async getAll(req, res, next) {
        
        try {
            const planets = await Planet.find();
            res.status(200).json(planets);
        } catch(err) {
            return next(err);
        }

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