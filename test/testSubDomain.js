var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getSubDomain",
    {
        setup: function() {
            UrlSkeleton = require("./../index.js");
        },
        teardown: function() {
            UrlSkeleton = null;
        }
    }
);

test(
    "Testing entry data",
    function(assert) {
        // Test without parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getSubDomain();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getSubDomain(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getSubDomain(["www.url-skeleton.com"]);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
    }
);

test(
    "Testing with invalid url",
    function(assert) {
        // Test with a invalid url like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getSubDomain("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getSubDomain("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getSubDomain("https//www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
    }
);

test(
    "Testing with full url",
    function(assert) {
        strictEqual(
            UrlSkeleton.getSubDomain("http://www.skeleton.com#test"),
            "www",
            "Passing http://www.skeleton.com#test like parameter, return the string www"
        );
        strictEqual(
            UrlSkeleton.getSubDomain("https://www.skeleton.com:8080/#test"),
            "www",
            "Passing https://www.skeleton.com:8080/#test like parameter, return the string www"
        );
        strictEqual(
            UrlSkeleton.getSubDomain("//static.skeleton.com:80?v=1&b=2#test"),
            "static",
            "Passing //static.skeleton.com:80?v=1&b=2#test like parameter, return the string static"
        );
        strictEqual(
            UrlSkeleton.getSubDomain("https://safe.url-skeleton.com/?p[teste]=1"),
            "safe",
            "Passing https://safe.url-skeleton.com/?p[teste]=1 like parameter, return the string safe"
        );
        strictEqual(
            UrlSkeleton.getSubDomain("https%3A%2F%2Fstatic.url-skeleton.com%2Ftest%2F%3Ftest%5B42%5D%3Dtrue%23test"),
            "static",
            "Passing https%3A%2F%2Fstatic.url-skeleton.com%2Ftest%2F%3Ftest%5B42%5D%3Dtrue%23test like parameter, return the string static"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        strictEqual(
            UrlSkeleton.getSubDomain("?t=1&b=4#test"),
            null,
            "Passing ?t-1&b=4#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getSubDomain("#test"),
            null,
            "Passing #test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getSubDomain("/skeleton/?v=1&b=2#test"),
            null,
            "Passing /skeleton/?v=1&b=2#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getSubDomain("/"),
            null,
            "Passing / like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getSubDomain("www.url-skeleton.com"),
            "www",
            "Passing www.url-skeleton.com like parameter, return the string www"
        );
        strictEqual(
            UrlSkeleton.getSubDomain("static.url-skeleton.com"),
            "static",
            "Passing static.url-skeleton.com like parameter, return the string static"
        );
    }
);
