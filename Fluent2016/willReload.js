exports.command = function(selector) {
    var client = this;

    var reloadClass = client.globals.reloadClass; // defined in config, e.g. "thisTooShallPass"

    client.execute(
        function(selector, reloadClass){
            document.querySelector(selector).className += (' ' + reloadClass);
        },
        [ selector, reloadClass ]
    );

    client.waitForElementPresent( selector + '.' + reloadClass, selector + ' tagged for reload.' );
};
