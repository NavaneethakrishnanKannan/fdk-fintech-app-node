const userController = {};
const User = require('../models/user');

/** Get the user info */
/** Params validated in the routed using JOI */
/**
 * 
 * @param {*} id 
 * @returns 
 */
userController.getUserData = async (id) => {
    try {
        let userData = await User.getUser(id);
        console.log({userData})
        if(userData) {
            return { status: 200, userData };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, error };
    }
}
module.exports = userController;