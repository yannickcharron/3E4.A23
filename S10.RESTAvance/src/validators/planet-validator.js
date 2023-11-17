//import expressValidator from 'express-validator';
import { body } from 'express-validator';

class PlanetValidators {


    complete() {
        //Dans le complete on valide si la propriété existe.
        return [
            body('name').exists().withMessage('Requis'),
            body('discoveredBy').exists().withMessage('Requis').bail(),
            body('discoveryDate').exists().withMessage('Requis'),
            //Il en manque quelques unes (temperature, position, satellites)

            //On ajoute les validations propres aussi dans le partiel
            ...this.partial()
        ]
    }

    partial() {
        //Dans le partial, on valide les règles propres à la propriété.
        return [
            body(['position.x', 'position.y', 'position.z'])
                .optional()
                .isFloat({min: -1000, max: 1000})
                .withMessage('Les coordonnées de la position doivent être réels et comprises entre -1000 et 1000'),
            body('temperature')
                .optional()
                .isNumeric()
                .withMessage('La température doit être numérique'),
            body('discoveryDate')
                .optional()
                .isISO8601().withMessage('Format de date non valide')
                .isBefore(new Date().toISOString()).withMessage('doit être dans le passé'),
        ]

    }

}

export default new PlanetValidators();