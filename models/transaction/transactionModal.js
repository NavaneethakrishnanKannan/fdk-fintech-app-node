const mongoose = require('../../config/db');
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	id: {
		type: String, 
		set: (val) => val,
	},
	action: {
		type: String, 
		set: (val) => val
	},
	status: {
		type: String,
		set: (val) => val
	},
	amount: {
		type: Number,
		set: (val) => val
	},
	date: {
		type: Date,
		set: (val) => val
	},
	user: {
		type: Object,
		set: (val) => val
	}

}, { toJSON: { getters: true } });

TransactionSchema.index({ id: "text" })
const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;