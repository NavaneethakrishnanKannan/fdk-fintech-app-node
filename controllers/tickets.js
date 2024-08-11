const ticketController = {};
const Ticket = require('../models/tickets');
const { formatDate, getDateDiff, addMinutes } = require('../utils/formatDate');
const { getRandomInt, getTicketAction } = require('../utils/helper/helper');
const { sentMessage } = require('../utils/otp');
const timelineController = require('./timeline');
const userController = require('./user');



/** To create a new Ticket. This is Created only for a Internal use. I haven't Implemented UI for this. I did Using the Postman. Because I have taken User the data from fake-store API Here I'm Creating the ticket */
/** Param Ticket Data is an Object. Have validated in routes */
/**
 * 
 * @param {*} ticketData 
 * @returns 
 */
ticketController.createTicket = async (ticketData) => {
    try {
        let { userId, ticketId, subject, category, status, priority, createdDate, resolvedDate } = ticketData;
        let user = await userController.getUserData(userId);
        console.log({ userId, ticketId, subject, category, status, priority, createdDate, resolvedDate }, user)
        if (user.status === 200) {
            let query = { "ticketId": ticketId, "subject": subject, "user": user.userData, "category": category, "status": status, "priority": priority, "createdDate": createdDate, "resolvedDate": resolvedDate };
            if (status === "closed") {
                query.resolvedDate = formatDate(createdDate, 3);
            }
            let ticket = await Ticket.createTicket(query);
            console.log(ticket)
            if (ticket) {
                let action = getTicketAction(status);
                let timelineData = { id: getRandomInt(0, 1000), ticketId, action, date: createdDate, group: "Support Team Fepse" };
                let timeline = await timelineController.insertTimeline(timelineData);
                return { status: 200, msg: "Ticket Created", data: ticket, timeline };
            }
        } else {
            return { status: 500, error: user.error };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, error };
    }
};

/** Get the products from the collection */
/** Dynamic Params Based on Search Value for Example: searchtype=all&searchParams=<string/num> */
/**
 * 
 * @param {*} ticketData 
 * @returns 
 */

ticketController.searchTicket = async (ticketData) => {
    try {
        let searchType = ticketData.searchtype;
        let searchParams = ticketData.searchParams;
        let query = {};
        if (searchParams) {
            query = {
                $or: [
                    { "user.email": { $regex: searchParams, $options: 'i' } },
                    { "user.username": { $regex: searchParams, $options: 'i' } },
                    { "ticketId": { $regex: searchParams, $options: 'i' } },
                    { "subject": { $regex: searchParams, $options: 'i' } },
                ]
            }
        } else if (searchType) {
            query = { "status": searchType };
            if (searchType === "all") {
                query = {};
            }
        }
        let ticket = await Ticket.searchTicket(query);
        return { status: 200, data: ticket };
    } catch (error) {
        console.log(error);
        return { status: 500, error };
    }
}

/** Once the ticket is resolved we will notifying the user via SMA - For SMS - Using Twillio API */
/**
 * 
 * @param {*} ticketId 
 * @returns 
 */

ticketController.resolveTicket = async (query) => {
    try {
        let ticketId = `#${query.ticketId}`;
        let ticketQuery = { "ticketId": ticketId };
        let ticketData = await Ticket.searchTicket(ticketQuery);
        console.log(ticketData, ticketQuery)
        if (!ticketData.length) {
            return { status: 500, msg: `Ticket Unavilable` };
        }
        let phone = ticketData[0].user.phone;
        phone = "+919095068478";
        sentMessage(phone, ticketId);
        let date = new Date();
        let ticket = await Ticket.updateTicket({ ticketId }, { $set: { "status": "closed", resolvedDate: date } });
        if (ticket) {
            let action = getTicketAction('closed');
            let timelineData = { id: getRandomInt(0, 1000), ticketId, action, date: date, group: "Support Team Fepse" };
            await timelineController.insertTimeline(timelineData);
            return { status: 200, message: "Status Updated" };
        } else {
            return { status: 500, message: "Error Occured" };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: `Error Occured` };
    }
}

module.exports = ticketController;