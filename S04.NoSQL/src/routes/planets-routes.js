import express from 'express';
import HttpError from 'http-errors';

import planetRepository from '../repositories/planet-repository.js';

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
      const planets = await planetRepository.retrieveAll();
      res.status(200).json(planets);
    } catch (err) {
      return next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const transformOptions = {};
      const idPlanet = req.params.idPlanet;

      //Vérification pour l'unité de la température en Celsius
      if (req.query.unit) {
        const unit = req.query.unit;
        if (unit === 'c') {
            transformOptions.unit = unit;
        } else {
          return next(HttpError.BadRequest(`Le paramètre unit doit avoir la valeur c, valeur entrée ${unit}`));
        }
      }

      let planet = await planetRepository.retrieveOne(idPlanet);

      if (!planet) {
        //Envoie une erreur 404
        return next(HttpError.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas`));
      }

      planet = planetRepository.transform(planet, transformOptions);

      res.status(200).json(planet);
    } catch (err) {
      return next(err);
    }
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
