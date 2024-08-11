const mongoose = require('../../config/db');
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const TimelineSchema = new Schema({
	id: {
		type: Number, 
		set: (val) => val,
		unique: true,
	},
	ticketId: {
		type: String, 
		set: (val) => val
	},
	action: {
		type: String,
		set: (val) => val
	},
	group: {
		type: String,
		set: (val) => val
	},
	date: {
		type: Date,
		set: (val) => val
	}

}, { toJSON: { getters: true } });

TimelineSchema.index({ ticketId: "text" })
const Timeline = mongoose.model('timeline', TimelineSchema);

module.exports = Timeline;