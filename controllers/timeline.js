const timelineController = {};
const Timeline = require('../models/timeline');
const Ticket = require('../models/tickets');
const userController = require('./user');
const mongoose = require('../config/db');
const { timeline } = require('../routes');


timelineController.insertTimeline = async (timelineData) => {
    try {
        let { id, ticketId, action, date, group } = timelineData;
        let query = { "id": id, "ticketId": ticketId, "action": action, "date": date, "group": group };
        let timeline = await Timeline.createTimeline(query);
        console.log(timeline)
        if (timeline) {
            return { status: 200, msg: "Data Inserted", data: timeline };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: "Error Occured", data: [] };
    }
}

timelineController.getTimelineData = async (ticketData) => {
    try {
        let data = await Timeline.getTimelineData();
        if (data && data.length) {
            data = { matchedTickets: data[0].matchedTickets, matchedTimeline: data[0].matchedTimeline }
        }
        return { status: 200, data: data };

    } catch (error) {
        console.log(error);
        return { status: 500, error };
    }
}

module.exports = timelineController;