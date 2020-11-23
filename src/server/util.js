const crypto = require('crypto');

exports.isStringValidLength = (str, min, max) => {
    return min !== 0 ?
        str !== undefined && typeof(str) === "string" && str.length >= min && str.length <= max :
        str === undefined || (typeof(str) === "string" && str.length <= max);
};

/**
 *
 * @param {string} str the enum
 * @param {string[]} values the possible values
 * @param {boolean} ndAllowed if null or defined is allowed
 * @returns {boolean} if the enum is valid
 */
exports.isEnumValid = (str, values, ndAllowed) => {
    return ((str === undefined || str == null) && ndAllowed) || (values.includes(str));
};

/**
 *
 * @param {string} str the time stamp
 * @param {boolean} ndAllowed if null or defined is allowed
 * @returns {boolean} if the time stamp is valid
 */
exports.isTimeStampValid = (str, ndAllowed) => {
    return ((str === undefined || str == null) && ndAllowed) || str.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) != null;
};

exports.isBooleanValid = (str, ndAllowed) => {
    return ((str === undefined || str == null) && ndAllowed) || str === 'true' || str === 'false';
};

exports.getHashedPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('base64');
};

exports.generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
};
