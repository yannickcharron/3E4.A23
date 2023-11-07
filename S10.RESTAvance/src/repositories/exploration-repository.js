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

    transform(exploration) {


        exploration.href = `${process.env.BASE_URL}/explorations/${exploration._id}`;

        delete exploration._id;
        return exploration;
    }

}

export default new ExplorationsRepository();