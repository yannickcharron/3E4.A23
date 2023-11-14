//import expressValidator from 'express-validator';
import body from 'express-validator';

class PlanetValidators {


    complete() {

    }

    partial() {
        return [
            body(['position.x', 'position.y','position.z'])
                .optional()
                .isFloat({min: -1000, max: 1000})
                .withMessage('Les coordonnées de la position doivent être réels et comprises entre -1000 et 1000'),
            body('temperature')
                .optional()
                .isNumeric()
                .withMessage('La température doit être numérique')
        ]
    }

}

export default new PlanetValidators();