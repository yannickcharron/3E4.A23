// export default (req, res, next) => {
//     console.log('🍹 Bonjour d\'un middleware');
//     next();
// }

export default (err, req, res, next) => {

    res.status(err.statusCode).json(err);
    next();
}