import dayjs from 'dayjs';
import Planet from '../models/planet-model.js';

const ZERO_KELVIN = -273.15;

class PlanetRepository {

    retrieveAll() {
        return Planet.find();
    }

    retrieveByCriteria(criteria) {
        return Planet.find(criteria);
    }

    retrieveOne(idPlanet, retrieveOptions = {}) {
        const retrieveQuery = Planet.findById(idPlanet)
        //La requête la base de données n'est toujours pas exécutée

        if(retrieveOptions.embed.explorations) {
            //Ajout du INNER JOIN à la requête
            retrieveQuery.populate('explorations');
        }

        return retrieveQuery;
    }

    create(planet) {
        return Planet.create(planet);
    }

    transform(planet, transformOptions = {}) {

        //2 types de transformations
        //Les optionnels
        if(transformOptions) {
            if(transformOptions.unit === 'c') {
                planet.temperature = (planet.temperature + ZERO_KELVIN);
            }
        }

        //Les non-optionels (obligatoires)
        planet.discoveryDate =  dayjs(planet.discoveryDate).format('YYYY-MM-DD HH:mm');
        planet.href = `${process.env.BASE_URL}/planets/${planet._id}`
        
        delete planet._id;
        delete planet.__v;

        return planet;

    }

}

export default new PlanetRepository();