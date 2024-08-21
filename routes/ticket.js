const router = require('express').Router();
const ticketController = require('../controllers/tickets');
const { celebrate, errors, Joi } = require('celebrate');

/** Create a New Ticket. Params are Validated Using JOI */

router.post('/createticket', celebrate({
    body: Joi.object().keys({
        ticketId: Joi.string().required(),
        userId: Joi.number().required(),
        subject: Joi.string().required(),
        category: Joi.string().required(),
        createdDate: Joi.date().required(),
        status: Joi.string().required(),
        priority: Joi.string().required(),
        resolvedDate: Joi.date().optional().allow(""),
    })
}), errors(), (request, response) => {
    ticketController.createTicket(request.body).then(result => {
        response.status(result.status).json(result);
    }, err => {
        console.log(err);
        response.status(err.status).json(err);
    });
});

/** Get all or filtered Data from the Collection. Params are Validated Using JOI */
/**
 * @param searchtype
 * @param searchParams
 */
router.get("/search", celebrate({
    query: {
        searchtype: Joi.string().optional().valid('new', 'in progress', 'on hold', 'closed', 'reject', 'all'),
        searchParams: Joi.string().optional().allow(""),
    }
}), errors(), (request, response) => {
    ticketController.searchTicket(request.query).then(result => {
        response.status(result.status).json(result);
    }, err => {
        console.log(err);
        response.status(err.status).json(err);
    })
});

/** Resolving the Ticket. Params are Validated Using JOI */

router.put('/resolve', celebrate({
    query: Joi.object().keys({
        ticketId: Joi.string().required(),
    })
}), errors(), (request, response) => {
    ticketController.resolveTicket(request.query).then(result => {
        response.status(result.status).json(result);
    }, err => {
        console.log(err);
        response.status(err.status).json(err);
    });
});

module.exports = router;