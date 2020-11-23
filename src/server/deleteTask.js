const {isStringValidLength} = require("./util");
const {db} = require("../server");

exports.deleteTask = (req, res) => {
    let {token, id} = req.body;

    if(!isStringValidLength(token, 60, 60)){
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

        db.query(`DELETE FROM tasks
                WHERE username = ? AND id = ?`,
                [username, Number(id)], (error, results, fields) => {
            if(error) throw error;

            if(results.affectedRows !== 0)
                res.json({
                    message: "Deleted task."
                });
            else{
                res.status(400);
                res.json({
                    message: "No task found."
                });
            }
        });
    });
};
