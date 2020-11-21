const {isStringValidLength, isTimeStampValid} = require("./util");
const {db} = require("../server");

exports.makeEvent = (req, res) => {
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
            WHERE token=?`, [token], (error, results, fields) => {
        if (error) throw error;

        if (results.length === 0) {
            res.status(400);
            res.json({
                message: "Token not found."
            });

            return;
        }

        let username = results[0].username;

        db.query(`SELECT *
                FROM events
                WHERE username=?`,
                [username, earliest, latest],
                (error, results, fields) => {
            if(error) throw error;

            res.json(results);
        });
    });
};
