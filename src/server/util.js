const {isStringValidLength} = require("./util");
exports.isStringValidLength = (str, min, max) => {
    return str !== undefined && typeof(str) === "string" && str.length >= min && str.length <= max;
}

exports.getHashedPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('base64');
}

exports.generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}
