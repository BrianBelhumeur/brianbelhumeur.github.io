exports.command = function(features, runEnhancedTests, runBasicTests) {
    var client = this;

    // can be string or array of strings
    features = Array.isArray( features ) ? features : [ features ];

    client.execute(
        function(features){
            var unsupportedFeatures = [];

            features.forEach(function(feature){
                if ( /* do feature test here, evaluate to true if NOT supported */ ) {
                    unsupportedFeatures.push(feature);
                }
            });

            return unsupportedFeatures;
        },
        [ features ],
        function(result){
            var unsupportedFeatures = (result || {}).value;

            if ( ! Array.isArray( unsupportedFeatures ) || unsupportedFeatures.length ) {
                console.log("Going unsupported route because browser can't handle: ", unsupportedFeatures.join(', '));
                runBasicTests(unsupportedFeatures);
            } else {
                runEnhancedTests();
            }
        }
    );
};
