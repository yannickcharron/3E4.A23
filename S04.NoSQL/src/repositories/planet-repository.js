import Planet from '../models/planet-model.js';

const ZERO_KELVIN = -273.15;

class PlanetRepository {

    retrieveAll() {
        return Planet.find();
    }

    retrieveOne(idPlanet) {
        return Planet.findById(idPlanet);
    }

    transform(planet, transformOptions) {

        //2 types de transformations
        //Les optionnels
        if(transformOptions) {
            if(transformOptions.unit === 'c') {
                planet.temperature = (planet.temperature + ZERO_KELVIN);
            }
        }

        //Les non-optionels (obligatoires)

        return planet;

    }

}

export default new PlanetRepository();