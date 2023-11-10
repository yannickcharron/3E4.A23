import Exploration from '../models/exploration-model.js';

import planetRepository from './planet-repository.js'

class ExplorationsRepository {
    

    retrieveAll() {
        return Exploration.find();
    }

    retrieveById(idExploration, retrieveOptions = {}) {
        const retrieveQuery = Exploration.findById(idExploration);
        
        if(retrieveOptions.embed.planet) {
            retrieveQuery.populate('planet');
        }

        return retrieveQuery;
    }

    retrieveByCriteria(retrieveOptions) {

        const explorationsQuery = Exploration.find()
                                .limit(retrieveOptions.limit)
                                .skip(retrieveOptions.offset)
                                .sort('-explorationDate');

        return Promise.all([explorationsQuery, Exploration.countDocuments()]);

    }

    transform(exploration, retrieveOptions = {}) {

        if(retrieveOptions.embed && !retrieveOptions.embed.planet) {
            //Le client ne veut pas l'ensemble des informations d'une planète donc
            //exploration.planet contient seulement l'id de la planète

            const idPlanet = exploration.planet; //Le id de la planète
    
            exploration.planet = {};
            exploration.planet.href = `${process.env.BASE_URL}/planets/${idPlanet}`;
        } else {
            //Le client veut l'ensemble des informations d'une planète donc
            //exploration.planet contient la planète complète donc nous devons aussi la transformer
            exploration.planet = planetRepository.transform(exploration.planet, retrieveOptions);
        }

        exploration.href = `${process.env.BASE_URL}/explorations/${exploration._id}`;

        delete exploration._id;
        return exploration;
    }

}

export default new ExplorationsRepository();