const {isStringValidLength, isBooleanValid, isBooleanTrue} = require("./util");
const {db} = require("../server");

exports.editTask = (req, res) => {
    let {token, id, description, iscompleted, isshown} = req.body;

    if(!isStringValidLength(token, 60, 60)
            || !isStringValidLength(description, 0, 65535)){
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
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

    if(!isBooleanValid(iscompleted, true)
        || !isBooleanValid(isshown, true)){
        res.status(400);
        res.json({
            message: "Invalid boolean."
        });

        return;
    }

    db.query(`SELECT username
            FROM tokens
            WHERE token = ?`, [token], (error, results, fields) => {
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
                FROM tasks
                WHERE username = ? AND id = ?`,
                [username, id], (error, results, fields) => {
            if(error) throw error;

            if(results.length === 0){
                res.status(400);
                res.json({
                    message: "Event not found."
                });

                return;
            }

            // TODO: this is the most hacky bullshit I've written in 6 months
            let isCompletedBool = isBooleanTrue(iscompleted);
            let isShownBool = isBooleanTrue(isshown);

            db.query(`UPDATE tasks
                    SET
                        description = ?,
                        iscompleted = ?,
                        isshown = ?
                    WHERE username = ? AND id = ?`,

                    [description || results[0].description,
                    typeof(isCompletedBool) === 'boolean' ? isCompletedBool: results[0].iscompleted,
                    typeof(isShownBool) === 'boolean' ? isShownBool: results[0].isshown,
                    username,
                    id],
                    (error, results, fields) => {
                if(error) throw error;

                res.json({
                    message: "Event edited."
                });
            });
        });
    });
};
