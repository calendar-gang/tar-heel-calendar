const {isStringValidLength, isBooleanValid, isBooleanTrue} = require("./util");
const {db} = require("../server");

exports.makeTask = (req, res) => {
    let { token, description, iscompleted, isshown } = req.body;

    if(!isStringValidLength(token, 60, 60)
            || !isStringValidLength(description, 0, 65535)){
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
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

        // TODO: this is the most hacky bullshit I've written in 6 months
        let isCompletedBool = isBooleanTrue(iscompleted);
        let isShownBool = isBooleanTrue(isshown);

        db.query(`INSERT INTO tasks(
                  username,
                  description,
                  iscompleted,
                  isshown)
                  VALUES(?, ?, ?, ?)`,
                [username,
                description,
                typeof(isCompletedBool) === 'boolean' ? isCompletedBool: false,
                typeof(isShownBool) === 'boolean' ? isShownBool: true],
                (error, results, fields) => {
            if(error) throw error;

            db.query(`SELECT MAX(id) AS id
                    FROM tasks
                    WHERE username = ?`, [username], (error, results, fields) => {
                if(error) throw error;

                res.json({
                    message: "Task made.",
                    id: results[0].id
                });
            });
        });
    });
};
