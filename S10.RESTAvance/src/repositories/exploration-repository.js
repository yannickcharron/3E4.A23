import Exploration from '../models/exploration-model.js';

class ExplorationsRepository {
    

    retrieveAll() {
        return Exploration.find();
    }

}

export default new ExplorationsRepository();