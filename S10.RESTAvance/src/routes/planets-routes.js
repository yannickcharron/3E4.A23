import express from 'express';
import HttpError from 'http-errors';
import { validationResult } from 'express-validator';

import planetRepository from '../repositories/planet-repository.js';
import planetValidators from '../validators/planet-validator.js';
import validator from '../middlewares/validator.js';

const router = express.Router();

class PlanetsRoutes {
  constructor() {
    router.post('/', this.post);
    router.get('/', this.getAll);
    router.get('/:idPlanet', this.getOne);
    router.patch('/:idPlanet', planetValidators.partial(), validator, this.update);
    router.put('/:idPlanet', planetValidators.complete(), validator, this.update);
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
      const retrieveOptions = { embed: {} };
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

      //Vérification pour l'ajout des explorations
      if(req.query.embed) {
        if(req.query.embed === 'explorations') {
          //Le client veut les explorations de la planète
          retrieveOptions.embed.explorations = true;
        } else {
          return next(HttpError.BadRequest(`Le paramètre embed doit être explorations, valeur fournie ${req.query.embed}`))
        }
      }

      let planet = await planetRepository.retrieveOne(idPlanet, retrieveOptions);

      if (!planet) {
        //Envoie une erreur 404
        return next(HttpError.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas`));
      }

      //Avant d'appeler transform on doit convertir en objet la planet
      planet = planet.toObject({ getters:false, virtuals:true });
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
        res.header('Location', `${process.env.BASE_URL}/planets/${newPlanet._id}`);

        if(req.query._body === 'false') {
          //204 => No Content
          return res.status(204).end();
        }

        newPlanet = newPlanet.toObject({getters:false, virtuals:false});
        newPlanet = planetRepository.transform(newPlanet);

        //201 => Created
        res.status(201).json(newPlanet);
    } catch(err) {
      return next(err);
    }
  }

  //PATCH:Mise à jour partielle
  //PUT:Mise à jour complète
  async update(req, res, next) {

    try {

      const idPlanet = req.params.idPlanet;
      //req.body représente les nouvelles valeurs de la planète
      let updatedPlanet = await planetRepository.update(idPlanet, req.body);
      if(!updatedPlanet) {
        return next(HttpError.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas`));
      }

      if(req.query._body === 'false') {
        //204 => No Content
        return res.status(204).end();
      }

      //Transform
      updatedPlanet = updatedPlanet.toObject({getters:false, virtuals:true});
      updatedPlanet = planetRepository.transform(updatedPlanet);

      res.status(200).json(updatedPlanet);

    } catch(err) {
      return next(err);
    }

  }

}

//Appel le constructeur et ajoute l'ensemble des routes dans le routeur pour l'exportation
new PlanetsRoutes();
export default router;
