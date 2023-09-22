import dayjs from 'dayjs';
import Planet from '../models/planet-model.js';

const ZERO_KELVIN = -273.15;

class PlanetRepository {

    retrieveAll() {
        return Planet.find();
    }

    retrieveOne(idPlanet) {
        return Planet.findById(idPlanet);
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
        
        //Pour le TP ajout d'une propriété
        planet.nouvellePropriete = 0;

        //Pour en supprimer une
        delete planet.nouvellePropriete;
        delete planet.__v;

        return planet;

    }

}

export default new PlanetRepository();