const {isStringValidLength, isEnumValid, isTimeStampValid} = require("./util");
const {db} = require("../server");

exports.editEvent = (req, res) => {
    let {token, id, title, location, description, start, end, recurring, recurringuntil, category} = req.body;

    if(!isStringValidLength(token, 60, 60)
            || !isStringValidLength(title, 0, 255)
            || !isStringValidLength(location, 0, 500)
            || !isStringValidLength(description, 0, 65535)
            || !isStringValidLength(start, 0, 19)
            || !isStringValidLength(end, 0, 19)
            || !isStringValidLength(recurring, 0, 7)
            || !isStringValidLength(recurringuntil, 0, 19)
            || !isStringValidLength(category, 0, 7)){
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
        });

        return;
    }

    if(!isEnumValid(recurring, ['not', 'weekly', 'monthly', 'yearly'], true)
            || !isEnumValid(category, ['default', 'school'], true)){
        res.status(400);
        res.json({
            message: "Invalid enum."
        });

        return;
    }

    if(!isTimeStampValid(start, true)
        || !isTimeStampValid(end, true)
        || !isTimeStampValid(recurringuntil, true)){
        res.status(400);
        res.json({
            message: "Invalid time stamp."
        });

        return;
    }

    if(isNaN(Number(id))){
        res.status(400);
        res.json({
            message: "id is NaN."
        });

        return;
    }

    db.query(`SELECT username
            FROM tokens
            WHERE token = ?`, [token], (error, results, fields) => {
        if(error) throw error;

        if(results.length === 0) {
            res.status(400);
            res.json({
                message: "Token not found."
            });

            return;
        }

        let username = results[0].username;

        db.query(`SELECT *
                FROM events
                WHERE username = ? AND id = ?`,
                [username, id], (error, results, fields) => {
            if(error) throw error;

            if(results.length === 0) {
                res.status(400);
                res.json({
                    message: "Event not found."
                });

                return;
            }

            db.query(`UPDATE events
                    SET
                        title = ?,
                        location = ?,
                        description = ?,
                        start = ?,
                        end = ?,
                        recurring = ?,
                        recurringuntil = ?,
                        category = ?
                    WHERE username = ? AND id = ?`,

                    [title || results[0].title,
                    location || results[0].location,
                    description || results[0].description,
                    start || results[0].start,
                    end || results[0].end,
                    recurring || results[0].recurring,
                    recurringuntil || results[0].recurringuntil,
                    category || results[0].category,
                    username,
                    id],
                    (error, results, fields) => {
                if (error) throw error;

                res.json({
                    message: "Event edited."
                });
            });
        });
    });
};
