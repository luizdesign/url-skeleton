var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getDomain",
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
                throw UrlSkeleton.getDomain();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getDomain(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getDomain(["www.url-skeleton.com"]);
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
                throw UrlSkeleton.getDomain("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getDomain("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getDomain("https//www.url-skeleton");
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
            UrlSkeleton.getDomain("http://www.skeleton.com#test"),
            "www.skeleton.com",
            "Passing http://www.skeleton.com#test like parameter, return the string www.skeleton.com"
        );
        strictEqual(
            UrlSkeleton.getDomain("https://www.skeleton.com:8080/#test"),
            "www.skeleton.com",
            "Passing https://www.skeleton.com:8080/#test like parameter, return the string www.skeleton.com"
        );
        strictEqual(
            UrlSkeleton.getDomain("//www.skeleton.com:80?v=1&b=2#test"),
            "www.skeleton.com",
            "Passing http://www.skeleton.com:80?v=1&b=2#test like parameter, return the string www.skeleton.com"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        strictEqual(
            UrlSkeleton.getDomain("?t=1&b=4#test"),
            null,
            "Passing ?t-1&b=4#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getDomain("#test"),
            null,
            "Passing #test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getDomain("/skeleton/?v=1&b=2#test"),
            null,
            "Passing /skeleton/?v=1&b=2#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getDomain("www.url-skeleton.com"),
            "www.url-skeleton.com",
            "Passing null like parameter, return www.url-skeleton.com"
        );
    }
);
