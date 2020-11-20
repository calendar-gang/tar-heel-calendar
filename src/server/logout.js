const {isStringValidLength} = require("./util");
const {db} = require("../server");

exports.logout = (req, res) => {
    const { token } = req.body;

    if(!isStringValidLength(token, 60, 60)){
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
        });

        return;
    }

    db.query(`SELECT token
            FROM tokens
            WHERE token=?`, [token], (error, results, fields) => {
        if(error) throw error;

        if(results.length=== 0){
            res.status(400);
            res.json({
                message: "Token not found."
            });

            return;
        }

        db.query(`DELETE
                FROM tokens
                WHERE token=?`, [token], (error, results, fields) => {
            if(error) throw error;

            res.json({
                message: "Deleted token."
            });
        });
    });
};