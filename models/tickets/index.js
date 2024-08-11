const Ticket = require('./ticketModal');
exports.createTicket = async (ticketData) => Ticket.create(ticketData);
exports.searchTicket = async (query) => Ticket.find(query);
exports.updateTicket = async (find, update) => Ticket.findOneAndUpdate(find, update);
