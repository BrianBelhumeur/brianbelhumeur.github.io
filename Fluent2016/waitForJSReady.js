exports.command = function(testFn, timeout) {
    var client = this;

    // both timeout and testFn are optional params
    if ( typeof testFn !== 'function' ) {
        timeout = testFn;
        testFn = undefined;
    }

    timeout = timeout || client.globals.waitForConditionTimeout || 15000;

    var isReady = false;
    var endTime = Date.now() + timeout;

    var checkJSReadiness = function() {
        client.execute(
            testFn || function(){
                // default test to determine if application is ready (JS can run)
                return true;
            },
            [],
            function(result){
                isReady = (result || {}).value;
            }
        );

        if ( ! isReady ) {
            client.pause(1000, function(){
                if ( ! isReady ) {
                    if ( Date.now() < endTime ) {
                        // Application is not ready and we've not timed out, so run this function recursively
                        checkJSReadiness();
                    } else {
                        // application is still not ready and we've timed out
                        client.assert.ok(false, 'JavaScript was not ready after ' + timeout + ' milliseconds.');
                    }
                }
            });
        }
    };

    // kick off the test
    checkJSReadiness();
};
