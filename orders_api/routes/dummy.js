exports.dummy100ms = function (req, res) {
    setTimeout(function() {
        res.send('and 100 millis later...');
    }, 100);
};