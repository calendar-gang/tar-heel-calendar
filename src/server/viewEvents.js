const {isStringValidLength, isTimeStampValid} = require("./util");
const {db} = require("../server");

exports.viewEvents = (req, res) => {
    let { token, earliest, latest } = req.body;

    if(!isStringValidLength(token, 60, 60)
            || !isStringValidLength(earliest, 0, 19)
            || !isStringValidLength(latest, 0, 19)){
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
        });

        return;
    }

    if(!isTimeStampValid(earliest, true)
            || !isTimeStampValid(latest, true)){
        res.status(400);
        res.json({
            message: "Invalid time stamp."
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
                FROM events
                WHERE username = ? AND start > ? AND end < ?`,
                [username,
                earliest || '1970-01-01 00:00:01',
                latest || '2038-01-09 03:14:07'],
                (error, results, fields) => {
            if(error) throw error;

            res.json({
                message: "Got events.",
                results: results
            });
        });
    });
};
