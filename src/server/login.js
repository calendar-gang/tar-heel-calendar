const {isStringValidLength, generateAuthToken, getHashedPassword} = require("./util");
const {db} = require("../server");

exports.login = (req, res) => {
    const { username, password } = req.body;

    if(!isStringValidLength(username, 1, 100)
            || !isStringValidLength(password, 5, 255)){
        res.status(400);
        res.json({
            message: "Invalid length of parameter."
        });

        return;
    }

    db.query(`SELECT username, password
            FROM users
            WHERE username=?`, [username], (error, results, fields) => {

        if(error) throw error;

        if(results.length=== 0){
            res.status(400);
            res.json({
                message: "Username missing."
            });

            return;
        }

        if(getHashedPassword(password) !== results[0].password){
            res.status(400);
            res.json({
                message: "Password incorrect."
            });

            return;
        }

        const token = generateAuthToken();

        db.query(`INSERT INTO tokens(token, username)
                VALUES (?, ?)`, [token, username],
                (error, results, fields) => {
            if(error) throw error;

            res.json({
                message: "Logged in.",
                token: token
            });
        });
    });
};