const {isStringValidLength} = require("./util");
const {db} = require("../server");

exports.viewTasks = (req, res) => {
    let { token } = req.body;

    if(!isStringValidLength(token, 60, 60)){
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
        });

        return;
    }

    db.query(`SELECT username
            FROM tokens
            WHERE token = ?`, [token], (error, results, fields) => {
        if(error) throw error;

        if(results.length === 0){
            res.status(400);
            res.json({
                message: "Token not found."
            });

            return;
        }

        let username = results[0].username;

        db.query(`SELECT *
                FROM tasks
                WHERE username = ?`, [username], (error, results, fields) => {
            if(error) throw error;

            res.json({
                message: "Got tasks.",
                results: results
            });
        });
    });
};
