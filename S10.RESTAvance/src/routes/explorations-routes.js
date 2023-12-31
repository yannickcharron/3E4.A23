import express from 'express';
import HttpError from 'http-errors';
import paginate from 'express-paginate';


import explorationRepository from '../repositories/exploration-repository.js';

const NB_PAGE = 3;

const router = express.Router(); 

class ExplorationsRoutes {
    
    constructor() {
        router.get('/', paginate.middleware(20, 30), this.getAll);
        router.get('/:idExploration', this.getOne);
    }

    async getAll(req, res, next) {
        try {

            //Gestion de la pagination
            const retrieveOptions = {};
            retrieveOptions.limit = req.query.limit;
            retrieveOptions.offset = req.skip;

            const [explorations, documentsCount] = await explorationRepository.retrieveByCriteria(retrieveOptions);
            
            const totalPages = Math.ceil(documentsCount / req.query.limit);
            const pagesLinksFunction = paginate.getArrayPages(req);
            const pagesLinks = paginate.getArrayPages(req)(NB_PAGE, totalPages, req.query.page);

            const responseBody = {
                _metadata: {
                    page:req.query.page,
                    limit: req.query.limit,
                    skip: req.skip,
                    totalPages: totalPages,
                    totalDocument: documentsCount,
                    hasNextPage: req.query.page < totalPages
                },
                _links: { 
                    prev:pagesLinks[0].url,
                    self:pagesLinks[1].url,
                    next:pagesLinks[2].url
                }
            };

            
            const transformExplorations = explorations.map(e => {
                e = e.toObject({getters: false, virtuals: true});
                e = explorationRepository.transform(e);
                return e;
            })

            responseBody.data = transformExplorations;

            res.status(200).json(responseBody);

        } catch(err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        try {

            const retrieveOptions = { embed: {} };

            if(req.query.embed === 'planet') {
                retrieveOptions.embed.planet = true;
            }

            const idExploration = req.params.idExploration;

            let exploration = await explorationRepository.retrieveById(idExploration, retrieveOptions);

            if(!exploration) {
                return next(HttpError.NotFound(`L'exploration avec le ${idExploration} n'existe pas.`));
            }

            //Transform
            exploration = exploration.toObject({getters:false, virtuals:true});
            exploration = explorationRepository.transform(exploration, retrieveOptions);

            res.status(200).json(exploration);
            
        } catch(err) {
            return next(err);
        }
    }

}

new ExplorationsRoutes();

export default router;