const {isStringValidLength} = require("./util");
const {db} = require("../server");

exports.getInfo = (req, res) => {
    const { token } = req.body;

    if(!isStringValidLength(token, 60, 60)){
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
        });

        console.log(req.body);

        return;
    }

    db.query(`SELECT username
            FROM tokens
            WHERE token=?`, [token], (error, results, fields) => {
        if(error) throw error;

        if(results.length === 0){
            res.status(400);
            res.json({
                message: "Token not found."
            });

            return;
        }

        let username = results[0].username;

        db.query(`SELECT email, firstname, lastname
                FROM users
                WHERE username=?`, [username], (error, results, fields) => {
            if(error) throw error;

            res.json({
                message: "Information found.",
                username: username,
                email: results[0].email,
                firstname: results[0].firstname,
                lastname: results[0].lastname
            });
        });
    });
};
