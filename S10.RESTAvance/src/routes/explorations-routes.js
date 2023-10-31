import express from 'express';
import HttpError from 'http-errors';

const router = express.Router(); 

class ExplorationsRoutes {
    
    constructor() {
        router.get('/', this.getAll);
        router.get('/:idExploration', this.getOne);
    }

    getAll(req, res, next) {
        //TODO:
    }

    getOne(req, res, next) {
        //TODO:
    }

}

new ExplorationsRoutes();

export default router;