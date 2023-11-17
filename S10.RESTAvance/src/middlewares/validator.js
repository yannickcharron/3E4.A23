import { validationResult } from 'express-validator';
import HttpError from 'http-errors'

export default (req, res, next) => {

    const errors = validationResult(req);

    if(errors.isEmpty()) {
        return next(); // Nous allons dans le code de notre route
    }

    //Nous avons au moins une erreur à traiter
    //Rendre cute l'erreur 😍
    const errorCute = {
        status: 422,
        developerMessage: HttpError.UnprocessableEntity(),
        userMessage: errors.array(),
        moreInfo: 'http://documentation/errors/422'
    }

    return res.status(422).json(errorCute);

}