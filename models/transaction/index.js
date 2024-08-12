const Transaction = require('./transactionModal');
exports.addTransactionData = async (data) => Transaction.create(data);
exports.getTransactionData = async (query) => Transaction.find(query);