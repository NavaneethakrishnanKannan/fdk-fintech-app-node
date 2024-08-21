const router = require('express').Router();
const userController = require('../controllers/user');
const { celebrate, errors, Joi } = require('celebrate');

/** Get User Details. Params are Validated Using JOI */

router.get('/getUser', celebrate({
    query: Joi.object().keys({
        userId: Joi.number().required(),
    })
}), errors(), (request, response) => {
    userController.getUserData(request.query.userId).then(result => {
        response.status(result.status).json(result);
    }, err => {
        console.log(err);
        response.status(err.status).json(err);
    });
});

module.exports = router;