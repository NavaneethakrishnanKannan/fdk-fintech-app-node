const mongoose = require('../../config/db');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
	ticketId: {
		type: String, 
		set: (val) => val
	},
	subject: {
		type: String,
		set: (val) => val
	},
	user: {
		type: Object,
		set: (val) => val
	},
	createdDate: {
		type: Date,
		set: (val) => val
	},
	resolvedDate: {
		type: Date,
		set: (val) => val,
		default: undefined
	},
	status: {
		type: String,
		enum: ['new', 'in progress', 'on hold', 'closed', 'reject'],
		default: 'New',
	},
	category: {
		type: String,
		set: (val) => val
	},
	priority: {
		type: String,
		enum: ['low', 'medium', 'high', 'highest', 'critical'],
		default: 'Medium',
	}

}, { toJSON: { getters: true } });

TicketSchema.index({ ticketId: "text" })
const Ticket = mongoose.model('ticket', TicketSchema);

module.exports = Ticket;