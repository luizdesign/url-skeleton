var testrunner = require("qunit");

testrunner.setup({
    log: {
        errors: true,
        globalSummary: true,
        testing: true
    },
    coverage: {
        dir: "test/coverage/"
    },
    namespace: null
});

testrunner.run([
    {
        code: "index.js",
        tests: "test/testSkeleton.js"
    },
    {
        code: "index.js",
        tests: "test/testProtocol.js"
    },
    {
        code: "index.js",
        tests: "test/testDomain.js"
    },
    {
        code: "index.js",
        tests: "test/testSubDomain.js"
    },
    {
        code: "index.js",
        tests: "test/testDomainName.js"
    },
    {
        code: "index.js",
        tests: "test/testPort.js"
    },
    {
        code: "index.js",
        tests: "test/testPath.js"
    },
    {
        code: "index.js",
        tests: "test/testQuery.js"
    },
    {
        code: "index.js",
        tests: "test/testParameters.js"
    },
    {
        code: "index.js",
        tests: "test/testFragment.js"
    }
], function(err, report) {

    var message = "All Right! All tests passed.";
    if (report.failed > 0) {
        message = "Well, something is wrong!\n" + report.failed + " tests failed.";
    } else if (err) {
        console.log(err);
        message = "Houston we have problems!";
    }

    var figlet = require('figlet');
    figlet(
        message,
        function(err, data) {
            console.log(data);
        }
    );
});
