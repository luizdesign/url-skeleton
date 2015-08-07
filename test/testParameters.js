var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getParameters",
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
                throw UrlSkeleton.getParameters();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getParameters(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getParameters(["www.url-skeleton.com"]);
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
                throw UrlSkeleton.getParameters("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getParameters("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getParameters("https//www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
    }
);

test(
    "Testing with full url",
    function(assert) {
        deepEqual(
            UrlSkeleton.getParameters("http://www.skeleton.com#test"),
            [],
            "Passing http://www.skeleton.com#test like parameter, return a empty array"
        );
        deepEqual(
            UrlSkeleton.getParameters("https://www.skeleton.com:8080/test/#test"),
            [],
            "Passing https://www.skeleton.com:8080/test/#test like parameter, return a empty array"
        );
        deepEqual(
            UrlSkeleton.getParameters("//www.skeleton.com:80/ok/?v=1&b=2#test"),
            [{"v": "1"}, {"b": "2"}],
            "Passing http://www.skeleton.com:80/ok/?v=1&b=2#test like parameter, return the array [{\"v\": \"1\"}, {\"b\": \"2\"}]"
        );
        deepEqual(
            UrlSkeleton.getParameters("https://safe.url-skeleton.com/?p[teste]=1"),
            [{"p[teste]": "1"}],
            "Passing https://safe.url-skeleton.com/?p[teste]=1 like parameter, return the array [{\"p[teste]\": \"1\"}]"
        );
        deepEqual(
            UrlSkeleton.getParameters("https%3A%2F%2Fstatic.url-skeleton.com%2Ftest%2F%3Ftest%5B42%5D%3Dtrue%23test"),
            [{"test[42]": "true"}],
            "Passing https%3A%2F%2Fstatic.url-skeleton.com%2Ftest%2F%3Ftest%5B42%5D%3Dtrue%23test like parameter, return the array [{\"test[42]\": \"true\"}]"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        deepEqual(
            UrlSkeleton.getParameters("?t=1&b=4#test"),
            [{"t": "1"}, {"b": "4"}],
            "Passing ?t-1&b=4#test like parameter, return the array [{\"t\": \"1\"}, {\"b\": \"4\"}]"
        );
        deepEqual(
            UrlSkeleton.getParameters("#test"),
            [],
            "Passing #test like parameter, return a empty array"
        );
        deepEqual(
            UrlSkeleton.getParameters("/skeleton/?v=1&b=2#test"),
            [{"v": "1"}, {"b": "2"}],
            "Passing /skeleton/?v=1&b=2#test like parameter, return the array [{\"v\": \"1\"}, {\"b\": \"2\"}]"
        );
        deepEqual(
            UrlSkeleton.getParameters("www.url-skeleton.com/ok/"),
            [],
            "Passing www.url-skeleton.com/ok like parameter, return a empty array"
        );
        deepEqual(
            UrlSkeleton.getParameters("/ok/?test=1"),
            [{"test": "1"}],
            "Passing /ok?test=1 like parameter, return the array [{\"test\": \"1\"}]"
        );
        deepEqual(
            UrlSkeleton.getParameters("/ok/?"),
            [],
            "Passing /ok? like parameter, return a empty array"
        );
        deepEqual(
            UrlSkeleton.getParameters("/ok/?#test"),
            [],
            "Passing /ok/?#test like parameter, return a empty array"
        );
        deepEqual(
            UrlSkeleton.getParameters("/"),
            [],
            "Passing / like parameter, return a empty array"
        );
    }
);
