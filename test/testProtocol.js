var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getProtocol",
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
                throw UrlSkeleton.getProtocol();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getProtocol(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getProtocol(["www.url-skeleton.com"]);
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
                throw UrlSkeleton.getProtocol("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getProtocol("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getProtocol("https//www.url-skeleton");
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
            UrlSkeleton.getProtocol("http://www.skeleton.com#test"),
            "http",
            "Passing http://www.skeleton.com#test like parameter, return the string http"
        );
        strictEqual(
            UrlSkeleton.getProtocol("https://www.skeleton.com:8080/#test"),
            "https",
            "Passing https://www.skeleton.com:8080/#test like parameter, return the string https"
        );
        strictEqual(
            UrlSkeleton.getProtocol("//www.skeleton.com:80?v=1&b=2#test"),
            null,
            "Passing http://www.skeleton.com:80?v=1&b=2#test like parameter, return a empty string"
        );
        strictEqual(
            UrlSkeleton.getProtocol("https://safe.url-skeleton.com/?p[teste]=1"),
            "https",
            "Passing https://safe.url-skeleton.com/?p[teste]=1 like parameter, return the string https"
        );
        strictEqual(
            UrlSkeleton.getProtocol("https%3A%2F%2Fstatic.url-skeleton.com%2Ftest%2F%3Ftest%5B42%5D%3Dtrue%23test"),
            "https",
            "Passing https%3A%2F%2Fstatic.url-skeleton.com%2Ftest%2F%3Ftest%5B42%5D%3Dtrue%23test like parameter, return the string https"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        strictEqual(
            UrlSkeleton.getProtocol("?t=1&b=4#test"),
            null,
            "Passing ?t-1&b=4#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getProtocol("#test"),
            null,
            "Passing #test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getProtocol("/skeleton/?v=1&b=2#test"),
            null,
            "Passing /skeleton/?v=1&b=2#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getProtocol("/"),
            null,
            "Passing / like parameter, return null"
        );
    }
);
