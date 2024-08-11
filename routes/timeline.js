const router = require('express').Router();
const timelineController = require('../controllers/timeline');
const { celebrate, errors, Joi } = require('celebrate');


/** Create the New Timelin. Params are Validated Using JOI */

router.post('/createticket', celebrate({
    body: Joi.object().keys({
        id: Joi.number().required(),
        ticketId: Joi.string().required(),
        action: Joi.string().required(),
        date: Joi.date().required(),
        group: Joi.string().required(),
    })
}), errors(), (request, response) => {
    timelineController.insertTimeline(request.body).then(result => {
        response.status(result.status).json(result);
    }, err => {
        console.log(err);
        response.status(err.status).json(err);
    });
});

/** Get all ticket actions Data from the Collection. Params are Validated Using JOI */
/**
 * @param userId
 */
router.get("/gettimeline", errors(), (request, response) => {
    timelineController.getTimelineData(request.query).then(result => {
        response.status(result.status).json(result);
    }, err => {
        console.log(err);
        response.status(err.status).json(err);
    })
});

module.exports = router;