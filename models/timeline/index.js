const Timeline = require('./timelineModal');
const User = require('../user/userModal');
exports.createTimeline = async (ticketData) => Timeline.create(ticketData);
exports.searchTimeline = async (query) => Timeline.find(query);
exports.updateTimeline = async (find, update) => Timeline.findOneAndUpdate(find, update);
exports.getTimelineData = async () => await User.aggregate(
    [
        {
            $lookup: {
                from: 'tickets',
                localField: 'id',
                foreignField: 'user.id',
                as: 'matchedTickets'
            }
        },
        {
            $lookup: {
                from: 'timeline',
                localField: 'matchedTickets.ticketId',
                foreignField: 'ticketId',
                as: 'matchedTimeline'
            }
        },
        {
            $match: {
                matchedTickets: { $ne: [] },
                matchedTimeline: { $ne: [] }
            }
        }
    ]
);
