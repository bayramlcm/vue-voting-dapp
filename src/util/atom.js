export const timeConverter = (unixtime) => {

    var u = new Date(unixtime * 1000);

    return ('0' + u.getUTCDate()).slice(-2) +
        '.' + ('0' + (u.getUTCMonth()+1)).slice(-2) +
        '.' + u.getUTCFullYear() +
        ' ' + ('0' + u.getUTCHours()).slice(-2) +
        ':' + ('0' + u.getUTCMinutes()).slice(-2) +
        ':' + ('0' + u.getUTCSeconds()).slice(-2)
};