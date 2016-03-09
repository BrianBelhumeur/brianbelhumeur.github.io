exports.command = function(selector, callback) {
    var client = this;

    callback = callback || function(){};

    client.waitForElementNotPresent( selector + '.' + client.globals.reloadClass, callback, 'Reload complete.' );
};
