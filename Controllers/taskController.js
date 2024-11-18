const db = require('../utils/db');
const test = (req, res) => {
    res.send('Hi this is Tushar');
};

const addNewTask = (req, res) => {
    const { title, description, status, prioroty, user_id } = req.data;
    

}


module.exports = {
    test,
};
