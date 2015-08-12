var testrunner = require("qunit"),
    arguments = require("shell-arguments");

var testModules = require("./service").config;

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

testrunner.run(
    testModules.configModules(arguments),
    function(err, report) {

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

    }
);
