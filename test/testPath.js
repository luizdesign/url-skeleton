var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getPath",
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
                throw UrlSkeleton.getPath();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getPath(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getPath(["www.url-skeleton.com"]);
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
                throw UrlSkeleton.getPath("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getPath("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getPath("https//www.url-skeleton");
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
            UrlSkeleton.getPath("http://www.skeleton.com#test"),
            null,
            "Passing http://www.skeleton.com#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getPath("https://www.skeleton.com:8080/test/#test"),
            "/test/",
            "Passing https://www.skeleton.com:8080/test/#test like parameter, return the string /test/"
        );
        strictEqual(
            UrlSkeleton.getPath("//www.skeleton.com:80/ok/?v=1&b=2#test"),
            "/ok/",
            "Passing http://www.skeleton.com:80/ok/?v=1&b=2#test like parameter, return the string /ok/"
        );
        strictEqual(
            UrlSkeleton.getPath("https://safe.url-skeleton.com/?p[teste]=1"),
            null,
            "Passing https://safe.url-skeleton.com/?p[teste]=1 like parameter, return null"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        strictEqual(
            UrlSkeleton.getPath("?t=1&b=4#test"),
            null,
            "Passing ?t-1&b=4#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getPath("#test"),
            null,
            "Passing #test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getPath("/skeleton/?v=1&b=2#test"),
            "/skeleton/",
            "Passing /skeleton/?v=1&b=2#test like parameter, return the string /skeleton/"
        );
        strictEqual(
            UrlSkeleton.getPath("www.url-skeleton.com/ok/"),
            "/ok/",
            "Passing www.url-skeleton.com/ok like parameter, return /ok"
        );
        strictEqual(
            UrlSkeleton.getPath("/ok/?test=1"),
            "/ok/",
            "Passing /ok?test=1 like parameter, return /ok"
        );
        strictEqual(
            UrlSkeleton.getPath("/"),
            "/",
            "Passing / like parameter, return /"
        );
    }
);
