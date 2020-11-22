const {isStringValidLength, isBooleanValid} = require("./util");
const {db} = require("../server");

exports.makeTask = (req, res) => {
    let { token, description, iscomplete, isshown } = req.body;

    if(!isStringValidLength(token, 60, 60)
            || !isStringValidLength(description, 0, 65535)){
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
        });

        return;
    }

    if(!isBooleanValid(iscomplete, true)
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

        db.query(`INSERT INTO tasks(
                  username,
                  description,
                  iscompleted,
                  isshown)
                  VALUES(?, ?, ?, ?)`,
                [username,
                description,
                (iscomplete === 'true') || false,
                (isshown === 'true') || true],
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
