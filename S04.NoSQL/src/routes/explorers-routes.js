import express from 'express';
import HttpError  from 'http-errors';

import planetRepository from '../repositories/planet-repository.js';

const router = express.Router();


class ExplorersRoutes {
    constructor() {
        router.get('/:explorerName', this.getPlanetsDiscoveredBy);
    }

    async getPlanetsDiscoveredBy(req, res, next) {
        try {
            const criteria = { discoveredBy: req.params.explorerName };
            let planets = await planetRepository.retrieveByCriteria(criteria);

            planets = planets.map(p => {
                p = p.toObject({getters: false, virtuals:false});
                p = planetRepository.transform(p);
                return p;
            });

            res.status(200).json(planets);
        } catch(err) {
            return next(err);
        }

    }
}

new ExplorersRoutes();
export default router;