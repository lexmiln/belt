exports.random = function(low, high) {
    return (Math.random() * (high - low)) + low;
}