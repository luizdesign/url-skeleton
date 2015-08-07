# Url Skeleton
Parse a string of url in a object with some properties: protocol, domain, subdomain, domainname, port, path, query, parameters and fragment.


## How install
For only install url-skeleton
```
npm i url-skeleton
```

Or for install and add this dependence in the package.json of your project.
```
npm i --save url-skeleton
```


## Methods
This project has 10 methods:

- getUrlSkeleton: return a complete skeleton of the url
- getProtocol: return only the protocol of the url
- getDomain: return only the domain of the url
- getSubDomain: return only the subdomain of the url
- getDomainName: return only the domain name of the url
- getPort: return only the port of the url
- getPath: return only the path of the url
- getQuery: return only the query of the url
- getParameters: return a array of the query parameters of the url
- getFragment: return only the fragment of the url


## Example
The use of url skeleton is very easy.

```
// require the module
var UrlSkeleton = require("url-skeleton");

// use the module
UrlSkeleton.getUrlSkeleton("https://example.url-skeleton.com:80/example-url-skeleton/?type=example&test=true#testing");
/*
 * Returns
 * {
 *   protocol: "https",
 *   domain: "example.url-skeleton.com",
 *   subdomain: "example",
 *   domainname: "url-skeleton",
 *   port: "80",
 *   path: "/example-url-skeleton/",
 *   query: "type=example&test=true",
 *   parameters: [{type: "example"}, {test: "true"}],
 *   fragment: "testing"
 * }
 */
```


## Testing
For execute the tests of this module
```
npm test
```


## Contribute
For contribute with this project, create a fork in github <https://github.com/luizdesign/url-skeleton>


## Changelog
**Version 0.1.3: 2015/08/06**
* Bug Fix: Accepting encoded url like a valid url

**Version 0.1.2: 2015/08/05**
* Bug Fix: Accepting query with array parameter (?test[0]=1) like a valid url. 
* Bug Fix: .getQuery() recognizing query with array parameter (?test[0]=1).

**Version 0.1.1: 2015/08/05**
* Bug Fix: Accepting "/" like a valid url

**Version 0.1.0: 2015/08/05**
* First Release
