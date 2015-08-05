var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getQuery",
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
                throw UrlSkeleton.getQuery();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getQuery(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getQuery(["www.url-skeleton.com"]);
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
                throw UrlSkeleton.getQuery("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getQuery("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getQuery("https//www.url-skeleton");
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
            UrlSkeleton.getQuery("http://www.skeleton.com#test"),
            null,
            "Passing http://www.skeleton.com#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getQuery("https://www.skeleton.com:8080/test/#test"),
            null,
            "Passing https://www.skeleton.com:8080/test/#test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getQuery("//www.skeleton.com:80/ok/?v=1&b=2#test"),
            "v=1&b=2",
            "Passing http://www.skeleton.com:80/ok/?v=1&b=2#test like parameter, return the string v=1&b=2"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        strictEqual(
            UrlSkeleton.getQuery("?t=1&b=4#test"),
            "t=1&b=4",
            "Passing ?t-1&b=4#test like parameter, return the string t=1&b=4"
        );
        strictEqual(
            UrlSkeleton.getQuery("#test"),
            null,
            "Passing #test like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getQuery("/skeleton/?v=1&b=2#test"),
            "v=1&b=2",
            "Passing /skeleton/?v=1&b=2#test like parameter, return the string v=1&b=2"
        );
        strictEqual(
            UrlSkeleton.getQuery("www.url-skeleton.com/ok/"),
            null,
            "Passing www.url-skeleton.com/ok like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getQuery("/ok/?test=1"),
            "test=1",
            "Passing /ok?test=1 like parameter, return the string test=1"
        );
        strictEqual(
            UrlSkeleton.getQuery("/ok/?"),
            "",
            "Passing /ok? like parameter, return a empty string"
        );
        strictEqual(
            UrlSkeleton.getQuery("/ok/?#test"),
            "",
            "Passing /ok/?#test like parameter, return a empty string"
        );
    }
);
