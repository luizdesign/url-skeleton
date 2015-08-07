var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getPort",
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
                throw UrlSkeleton.getPort();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getPort(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getPort(["www.url-skeleton.com"]);
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
                throw UrlSkeleton.getPort("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getPort("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getPort("https//www.url-skeleton");
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
            UrlSkeleton.getPort("http://www.skeleton.com#test"),
            null,
            "Passing http://www.skeleton.com#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getPort("https://www.skeleton.com:8080/#test"),
            "8080",
            "Passing https://www.skeleton.com:8080/#test like parameter, return the string 8080"
        );
        strictEqual(
            UrlSkeleton.getPort("//static.skeleton.com:80?v=1&b=2#test"),
            "80",
            "Passing //static.skeleton.com:80?v=1&b=2#test like parameter, return the string 80"
        );
        strictEqual(
            UrlSkeleton.getPort("https://safe.url-skeleton.com/?p[teste]=1"),
            null,
            "Passing https://safe.url-skeleton.com/?p[teste]=1 like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getPort("https%3A%2F%2Fstatic.url-skeleton.com%3A80%2Ftest%2F%3Ftest%5B42%5D%3Dtrue%23test"),
            "80",
            "Passing https%3A%2F%2Fstatic.url-skeleton.com%3A80%2Ftest%2F%3Ftest%5B42%5D%3Dtrue%23test like parameter, return the string 80"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        strictEqual(
            UrlSkeleton.getPort("?t=1&b=4#test"),
            null,
            "Passing ?t-1&b=4#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getPort("#test"),
            null,
            "Passing #test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getPort("/skeleton:8180/?v=1&b=2#test"),
            "8180",
            "Passing /skeleton:8180/?v=1&b=2#test like parameter, return 8180"
        );
        strictEqual(
            UrlSkeleton.getPort("www.url-skeleton.com"),
            null,
            "Passing www.url-skeleton.com like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getPort("static.url-skeleton.com"),
            null,
            "Passing static.url-skeleton.com like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getPort("/"),
            null,
            "Passing / like parameter, return null"
        );
    }
);
