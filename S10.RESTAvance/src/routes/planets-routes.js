import express from 'express';
import HttpError from 'http-errors';

import planetRepository from '../repositories/planet-repository.js';

const router = express.Router();

class PlanetsRoutes {
  constructor() {
    router.post('/', this.post);
    router.get('/', this.getAll);
    router.get('/:idPlanet', this.getOne);
    router.patch('/:idPlanet', this.patch);
    router.put('/:idPlanet', this.patch);
    router.delete('/:idPlanet', this.deleteOne);
  }

  async getAll(req, res, next) {
    try {
      let planets = await planetRepository.retrieveAll();

      planets = planets.map(p => {
        p = p.toObject({getters: false, virtuals:false});
        p = planetRepository.transform(p);
        return p;
      });

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

      //Avant d'appeler transform on doit convertir en objet la planet
      planet = planet.toObject({ getters:false, virtuals:false });
      planet = planetRepository.transform(planet, transformOptions);

      res.status(200).json(planet);
    } catch (err) {
      return next(err);
    }
  }

  deleteOne(req, res, next) {
    return next(HttpError.MethodNotAllowed());
  }

  async post(req, res, next) {
    try {

        //Code 400 dans un POST
        if(Object.keys(req.body).length === 0) {
          return next(HttpError.BadRequest('Impossible de créer une planète sans propriété'));
        }

        let newPlanet = await planetRepository.create(req.body);
        newPlanet = newPlanet.toObject({getters:false, virtuals:false});
        newPlanet = planetRepository.transform(newPlanet);
        res.status(201).json(newPlanet);
    } catch(err) {
      return next(err);
    }
  }

  async patch(req, res, next) {
    //TODO:
  }

  async put(req, res, next) {
    //TODO:
  }

}

//Appel le constructeur et ajoute l'ensemble des routes dans le routeur pour l'exportation
new PlanetsRoutes();
export default router;
