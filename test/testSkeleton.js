var UrlSkeleton = null;

QUnit.module(
    "Testing the method: getUrlSkeleton",
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
                throw UrlSkeleton.getUrlSkeleton();
            },
            /^ParameterError/,
            "When no parameter is passed, return a exception"
        );
        // Test with a number like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getUrlSkeleton(123);
            },
            /^TypeError/,
            "When a parameter is passed with type different of string, return a exception"
        );
        // Test with a array like parameter
        assert.throws(
            function() {
                throw UrlSkeleton.getUrlSkeleton(["www.url-skeleton.com"]);
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
                throw UrlSkeleton.getUrlSkeleton("://www.url-skeleton");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getUrlSkeleton("http:www.url-skeleton.com");
            },
            /^ContentError/,
            "When a parameter is passed with a invalid url, return a exception"
        );
        assert.throws(
            function() {
                throw UrlSkeleton.getUrlSkeleton("https//www.url-skeleton");
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
            UrlSkeleton.getUrlSkeleton("http://www.skeleton.com#test"),
            {
                protocol: "http",
                domain: "www.skeleton.com",
                subdomain: "www",
                domainname: "skeleton",
                port: null,
                path: null,
                query: null,
                parameters: [],
                fragment: "test"
            },
            "Passing http://www.skeleton.com#test like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("https://www.skeleton.com:8080/test/#test"),
            {
                protocol: "https",
                domain: "www.skeleton.com",
                subdomain: "www",
                domainname: "skeleton",
                port: "8080",
                path: "/test/",
                query: null,
                parameters: [],
                fragment: "test"
            },
            "Passing https://www.skeleton.com:8080/test/#test like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("//www.skeleton.com:80/ok/?v=1&b=2#test"),
            {
                protocol: null,
                domain: "www.skeleton.com",
                subdomain: "www",
                domainname: "skeleton",
                port: "80",
                path: "/ok/",
                query: "v=1&b=2",
                parameters: [{"v": "1"}, {"b": "2"}],
                fragment: "test"
            },
            "Passing http://www.skeleton.com:80/ok/?v=1&b=2#test like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("http://www.url-skeleton.com:8180/test/second-parameter/?v=1&b=2#url-skeleton"),
            {
                protocol: "http",
                domain: "www.url-skeleton.com",
                subdomain: "www",
                domainname: "url-skeleton",
                port: "8180",
                path: "/test/second-parameter/",
                query: "v=1&b=2",
                parameters: [{"v": "1"}, {"b": "2"}],
                fragment: "url-skeleton"
            },
            "Passing http://www.skeleton.com:80/ok/?v=1&b=2#test like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("https://safe.url-skeleton.com/?p[teste]=1"),
            {
                protocol: "https",
                domain: "safe.url-skeleton.com",
                subdomain: "safe",
                domainname: "url-skeleton",
                port: null,
                path: null,
                query: "p[teste]=1",
                parameters: [{"p[teste]": "1"}],
                fragment: null
            },
            "Passing https://safe.url-skeleton.com/?p[teste]=1 like parameter, return a object"
        );
    }
);

test(
    "Testing with partial url",
    function(assert) {
        deepEqual(
            UrlSkeleton.getUrlSkeleton("?t=1&b=4#test"),
            {
                protocol: null,
                domain: null,
                subdomain: null,
                domainname: null,
                port: null,
                path: null,
                query: "t=1&b=4",
                parameters: [{"t": "1"}, {"b": "4"}],
                fragment: "test"
            },
            "Passing ?t-1&b=4#test like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("#test"),
            {
                protocol: null,
                domain: null,
                subdomain: null,
                domainname: null,
                port: null,
                path: null,
                query: null,
                parameters: [],
                fragment: "test"
            },
            "Passing #test like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("/skeleton/?v=1&b=2#test"),
            {
                protocol: null,
                domain: null,
                subdomain: null,
                domainname: null,
                port: null,
                path: "/skeleton/",
                query: "v=1&b=2",
                parameters: [{"v": "1"}, {"b": "2"}],
                fragment: "test"
            },
            "Passing /skeleton/?v=1&b=2#test like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("www.url-skeleton.com/ok/"),
            {
                protocol: null,
                domain: "www.url-skeleton.com",
                subdomain: "www",
                domainname: "url-skeleton",
                port: null,
                path: "/ok/",
                query: null,
                parameters: [],
                fragment: null
            },
            "Passing www.url-skeleton.com/ok like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("/ok/?test=1"),
            {
                protocol: null,
                domain: null,
                subdomain: null,
                domainname: null,
                port: null,
                path: "/ok/",
                query: "test=1",
                parameters: [{"test": "1"}],
                fragment: null
            },
            "Passing /ok?test=1 like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("/ok/?"),
            {
                protocol: null,
                domain: null,
                subdomain: null,
                domainname: null,
                port: null,
                path: "/ok/",
                query: "",
                parameters: [],
                fragment: null
            },
            "Passing /ok? like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("static.url-skeleton.com.br/unit/test/?#"),
            {
                protocol: null,
                domain: "static.url-skeleton.com.br",
                subdomain: "static",
                domainname: "url-skeleton",
                port: null,
                path: "/unit/test/",
                query: "",
                parameters: [],
                fragment: ""
            },
            "Passing /ok/?#test like parameter, return a object"
        );
        deepEqual(
            UrlSkeleton.getUrlSkeleton("/"),
            {
                protocol: null,
                domain: null,
                subdomain: null,
                domainname: null,
                port: null,
                path: "/",
                query: null,
                parameters: [],
                fragment: null
            },
            "Passing / like parameter, return a object"
        );
    }
);
