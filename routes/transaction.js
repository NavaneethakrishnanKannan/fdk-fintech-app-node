const router = require('express').Router();
const transactionController = require('../controllers/transaction');
const { celebrate, errors, Joi } = require('celebrate');


/** Inserting the transaction. Params are Validated Using JOI */

router.post('/addtransaction', celebrate({
    body: Joi.object().keys({
        id: Joi.string().required(),
        status: Joi.string().required(),
        action: Joi.string().required(),
        date: Joi.date().required(),
        amount: Joi.number().required(),
        userId: Joi.number().required(),
    })
}), errors(), (request, response) => {
    transactionController.createTransaction(request.body).then(result => {
        response.status(result.status).json(result);
    }, err => {
        console.log(err);
        response.status(err.status).json(err);
    });
});

/** Get all transaction mady by the user. Params are Validated Using JOI */
/**
 * @param userId
 */
router.get("/gettransaction", errors(), (request, response) => {
    transactionController.getTransaction(request.query).then(result => {
        response.status(result.status).json(result);
    }, err => {
        console.log(err);
        response.status(err.status).json(err);
    })
});

module.exports = router;