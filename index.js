function validationParameter(url) {
    var code = null,
        message = null,
        urlRegex = /^((http(s)?:\/\/|\/\/)?[\w-]+\.|\/\w|#|\?)[\w-\.\/#&?:=]+$/;

    if (!url) {
        code = 1;
        message = "ParameterError: url is a mandatory parameter";
    } else if (typeof url !== "string") {
        code = 2;
        message = "TypeError: url must be of string type";
    } else if (!urlRegex.test(url)) {
        code = 3;
        message = "ContentError: url must be in a valid url format";
    }

    return {
        "errorCode": code,
        "errorMessage": message
    }
}

module.exports = {
    getUrlSkeleton: function(url) {
        var validation = validationParameter(url);

        if (validation.errorCode) {
            throw validation.errorMessage;
        }

        return {
            "protocol": this.getProtocol(url),
            "domain": this.getDomain(url),
            "subdomain": this.getSubDomain(url),
            "domainname": this.getDomainName(url),
            "port": this.getPort(url),
            "path": this.getPath(url),
            "query": this.getQuery(url),
            "parameters": this.getParameters(url),
            "fragment": this.getFragment(url)
        }
    },
    getProtocol: function(url) {
        var validation = validationParameter(url),
            protocol = null;

        if (validation.errorCode) {
            throw validation.errorMessage;
        } else if (url.indexOf("://") !== -1) {
            protocol = url.split("://")[0];
        }

        return protocol;
    },
    getDomain: function(url) {
        var validation = validationParameter(url),
            urlDomainRegex = /^(\/\/|http:\/\/|https:\/\/)?([\w-\.]+)[\/#\?]?/,
            domain = null;

        if (validation.errorCode) {
            throw validation.errorMessage;
        } else {
            domain = url.match(urlDomainRegex);
            domain = (domain) ? domain[2] : domain;
        }

        return domain;
    },
    getSubDomain: function(url) {
        var validation = validationParameter(url),
            subdomain = null;

        if (validation.errorCode) {
            throw validation.errorMessage;
        } else if (this.getDomain(url)) {
            subdomain = this.getDomain(url).split(".")[0];
        }

        return subdomain;
    },
    getDomainName: function(url) {
        var validation = validationParameter(url),
            domainNameRegex = /^(\/\/|http:\/\/|https:\/\/)?[\w-]+\.([\w-]+)\.[\/#\?]?/,
            domainName = null;

        if (validation.errorCode) {
            throw validation.errorMessage;
        } else {
            domainName = url.match(domainNameRegex);
            domainName = (domainName) ? domainName[2] : null;
        }

        return domainName;
    },
    getPort: function(url) {
        var validation = validationParameter(url),
            portRegex = /[\w\/]:(\d+)/,
            port = null;

        if (validation.errorCode) {
            throw validation.errorMessage;
        } else {
            port = url.match(portRegex);
            port = (port) ? port[1] : null;
        }

        return port;
    },
    getPath: function(url) {
        var validation = validationParameter(url),
            pathRegex = /(\/\w[\w-\/]+[\/\?#])/,
            path = null;

        if (validation.errorCode) {
            throw validation.errorMessage;
        } else {
            path = url.match(pathRegex);
            path = (path) ? path[0].replace(/[\?#]$/, "") : null;
        }

        return path;
    },
    getQuery: function(url) {
        var validation = validationParameter(url),
            queryRegex = /\?([\w&=]*)/,
            query = null;

        if (validation.errorCode) {
            throw validation.errorMessage;
        } else if (url.indexOf("?") !== -1) {
            query = url.match(queryRegex)[1];
        }

        return query;
    },
    getParameters: function(url) {
        var validation = validationParameter(url),
            query,
            parameters = [];

        if (validation.errorCode) {
            throw validation.errorMessage;
        } else {
            query = this.getQuery(url);

            if (query && query !== "") {
                parameters = query.split("&").map(function(value) {
                    var chaveValor = value.split("="),
                        newValue = {};

                    newValue[chaveValor[0]] = chaveValor[1];
                    return newValue;
                });
            }
        }

        return parameters;
    },
    getFragment: function(url) {
        var validation = validationParameter(url),
            fragment = null;

        if (validation.errorCode) {
            throw validation.errorMessage;
        } else if (url.indexOf("#") !== -1) {
            fragment = url.substring(url.indexOf("#") + 1);
        }

        return fragment;
    }
};
