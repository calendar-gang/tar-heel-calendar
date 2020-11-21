const {isStringValidLength, getHashedPassword} = require("./util");
const {db} = require("../server");

module.exports.register = (req, res) => {
    console.log(req);

    const { username, email, firstname, lastname, password } = req.body;
    if(!isStringValidLength(username, 1, 100)
            || !isStringValidLength(email, 5, 255)
            || !isStringValidLength(firstname, 1, 100)
            || !isStringValidLength(lastname, 1, 100)
            || !isStringValidLength(password, 5, 255)){
        // It would be better to specify which field is wrong but this is considered an internal error
        res.status(400);
        res.json({
            message: "Invalid length of parameter.",
            body: req.body,
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        });

        return;
    }

    db.query(`SELECT username, email
            FROM users
            WHERE username = ? OR email = ?`, [username, email], (error, results, fields) => {
        if(error) throw error;

        if(results.length !== 0){
            res.status(400);
            res.json({
                message: results[0].username === username ?
                    "Username already used." : "Email already used."
            });

            return;
        }

        let encryptedPassword = getHashedPassword(password);

        db.query(`INSERT INTO users(username, email, firstname, lastname, password)
                VALUES (?, ?, ?, ?, ?)`, [username, email, firstname, lastname, encryptedPassword],
                (error, results, fields) => {
            if(error) throw error;

            res.json({
                message: "Registration complete."
            });
        });
    });
};
