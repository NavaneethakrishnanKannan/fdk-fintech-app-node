exports.getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getTicketAction = (action) => {
    try {
        switch(action) {
            case "new": {
                return "Ticket Created";
            }
            case "in progress": {
                return "Ticket In Progress";
            }
            case "closed": {
                return "Ticket Closed";
            }
            case "reject": {
                return "rejected";
            }
            default: {
                return "Ticket Created";
            }
        }
    } catch (error) {
        console.log(error);
        return "Ticket Created";
    }
}