let rendomString = (() => {
    let string = ''
    for (let i = 0; i <= 3; i++) {
        string += Math.random().toString(36).slice(2);
    }
    return string;
})()

module.exports = rendomString;