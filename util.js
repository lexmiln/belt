exports.random = function(low, high) {
    return (Math.random() * (high - low)) + low;
}

exports.bearing = function(obj) {
    return 90 - (180/Math.PI) * Math.atan2(obj.y, obj.x);
}

exports.distance = function(obj) {
    return Math.sqrt(obj.x * obj.x + obj.y * obj.y + obj.z * obj.z);
}