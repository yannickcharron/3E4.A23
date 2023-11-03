import Exploration from '../models/exploration-model.js';

class ExplorationsRepository {
    

    retrieveAll() {
        return Exploration.find();
    }

    retrieveByCriteria(retrieveOptions) {

        const explorationsQuery = Exploration.find()
                                .limit(retrieveOptions.limit)
                                .skip(retrieveOptions.offset)
                                .sort('-explorationDate');

        return Promise.all([explorationsQuery, Exploration.countDocuments()]);

    }

}

export default new ExplorationsRepository();