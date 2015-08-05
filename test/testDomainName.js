var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getDomainName",
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
                throw UrlSkeleton.getDomainName();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getDomainName(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getDomainName(["www.url-skeleton.com"]);
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
                throw UrlSkeleton.getDomainName("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getDomainName("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getDomainName("https//www.url-skeleton");
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
            UrlSkeleton.getDomainName("http://www.skeleton.com#test"),
            "skeleton",
            "Passing http://www.skeleton.com#test like parameter, return the string www"
        );
        strictEqual(
            UrlSkeleton.getDomainName("https://www.skeleton.com:8080/#test"),
            "skeleton",
            "Passing https://www.skeleton.com:8080/#test like parameter, return the string www"
        );
        strictEqual(
            UrlSkeleton.getDomainName("//static.skeleton.com:80?v=1&b=2#test"),
            "skeleton",
            "Passing //static.skeleton.com:80?v=1&b=2#test like parameter, return the string static"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        strictEqual(
            UrlSkeleton.getDomainName("?t=1&b=4#test"),
            null,
            "Passing ?t-1&b=4#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getDomainName("#test"),
            null,
            "Passing #test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getDomainName("/skeleton/?v=1&b=2#test"),
            null,
            "Passing /skeleton/?v=1&b=2#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getDomainName("/"),
            null,
            "Passing / like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getDomainName("www.url-skeleton.com"),
            "url-skeleton",
            "Passing www.url-skeleton.com like parameter, return the string www"
        );
        strictEqual(
            UrlSkeleton.getDomainName("static.url-skeleton.com"),
            "url-skeleton",
            "Passing static.url-skeleton.com like parameter, return the string static"
        );
    }
);
