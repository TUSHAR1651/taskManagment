const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../utils/db');

const test = (req, res) => {
    res.send('HI this is Tushar');
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = { name, email, password: hashedPassword };
    // console.log(user);

    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM User WHERE email = ?', email, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.length > 0) {
            return res.status(400).send('User already exists');
        }
        else {
            await new Promise((resolve, reject) => {
                db.query('INSERT INTO User (name , email , password) Values (? , ? , ?)',[name , email , hashedPassword], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        

        res.status(200).send('User registered successfully');
    } catch (err) {
        res.status(400).send('Error in signup');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM User WHERE email = ?', email, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (result.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = result[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, 'secretkey');
        res.status(200).send({ token });
    } catch (err) {
        res.status(400).send('Error in login');
    }
}

module.exports = {  
    test,
    signup,
    login
};
