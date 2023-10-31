import express from 'express';
import HttpError from 'http-errors';

import explorationRepository from '../repositories/exploration-repository.js';

const router = express.Router(); 

class ExplorationsRoutes {
    
    constructor() {
        router.get('/', this.getAll);
        router.get('/:idExploration', this.getOne);
    }

    async getAll(req, res, next) {
        try {

            const explorations = await explorationRepository.retrieveAll();

            //TODO: Transform

            res.status(200).json(explorations);

        } catch(err) {
            return next(err);
        }
    }

    getOne(req, res, next) {
        //TODO:
    }

}

new ExplorationsRoutes();

export default router;