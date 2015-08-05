var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getFragment",
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
                throw UrlSkeleton.getFragment();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getFragment(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getFragment(["www.url-skeleton.com"]);
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
                throw UrlSkeleton.getFragment("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getFragment("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getFragment("https//www.url-skeleton");
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
            UrlSkeleton.getFragment("http://www.skeleton.com#test"),
            "test",
            "Passing http://www.skeleton.com#test like parameter, return  the string test"
        );
        strictEqual(
            UrlSkeleton.getFragment("https://www.skeleton.com:8080/#test"),
            "test",
            "Passing https://www.skeleton.com:8080/#test like parameter, return  the string test"
        );
        strictEqual(
            UrlSkeleton.getFragment("http://www.skeleton.com:80?v=1&b=2#test"),
            "test",
            "Passing http://www.skeleton.com:80?v=1&b=2#test like parameter, return  the string test"
        );
        strictEqual(
            UrlSkeleton.getFragment("http://www.url-skeleton.com"),
            null,
            "Passing http://www.url-skeleton.com like parameter, return null"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        strictEqual(
            UrlSkeleton.getFragment("?t=1&b=4#test"),
            "test",
            "Passing www.skeleton.com#test like parameter, return  the string test"
        );
        strictEqual(
            UrlSkeleton.getFragment("#test"),
            "test",
            "Passing #test like parameter, return  the string test"
        );
        strictEqual(
            UrlSkeleton.getFragment("/skeleton/?v=1&b=2#test"),
            "test",
            "Passing /skeleton/?v=1&b=2#test like parameter, return the string test"
        );
        strictEqual(
            UrlSkeleton.getFragment("/skeleton/?v=1&b=2#"),
            "",
            "Passing /skeleton/?v=1&b=2# like parameter, return the a empty string"
        );
        strictEqual(
            UrlSkeleton.getFragment("/skeleton/"),
            null,
            "Passing /skeleton/ like parameter, return null"
        );
        strictEqual(
            UrlSkeleton.getFragment("/"),
            null,
            "Passing / like parameter, return null"
        );
    }
);
