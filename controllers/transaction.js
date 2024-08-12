const transactionController = {};
const Transaction = require('../models/transaction');
const userController = require('./user');


transactionController.createTransaction = async (transactionData) => {
    try {
        let { id, status, action, date, amount, userId } = transactionData;
        let user = await userController.getUserData(userId);
        if (user.status === 200) {
            let query = { "id": id, "status": status, "action": action, "date": date, "amount": amount, user: user.userData };
            let transaction = await Transaction.addTransactionData(query);
            console.log(transaction)
            if (transaction) {
                return { status: 200, msg: "Data Inserted", data: transaction };
            }
        } else {
            return { status: 500, msg: "Error Occured", data: [] };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: "Error Occured", data: [] };
    }
}

transactionController.getTransaction = async (query) => {
    try {
        query = { "id": query.userId };
        let data = await Transaction.getTransactionData();
        if (data && data.length) {
            return { status: 200, data: data };
        } else {
            return { status: 500, msg: "Error Occured", data: [] };
        }

    } catch (error) {
        console.log(error);
        return { status: 500, error, data: [] };
    }
}

module.exports = transactionController;