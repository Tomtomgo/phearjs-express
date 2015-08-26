# phearjs-express

PhearJS (http://phear.io) is a prerender for client-side dynamic web pages. To
serve prendered versions of your website to bots like the ones from Yahoo, Bing,
Yandex, Google and so forth you can use this Express middleware. When a bot is
detected the middleware will serve a prerendered version of your page.

## Installation

You should have a PhearJS instance running somewhere. For setup instructions please refer to these [installation instructions](https://github.com/Tomtomgo/phearjs/blob/master/INSTALLATION.md).

If you have that running, install phearjs-express middleware:

```
npm install phearjs-express
```

## Usage

### Default usage

Add the following code to your Express app and every request will automatically
be served prerendered only if necessary.

    var prerender = require('phearjs-express');
    app.use(prerender({}));

#### Custom PhearJS endpoint

    var prerender = require('phearjs-express');
    app.use(prerender({phear_url: http://192.168.1.42:1337}));

#### Custom user agent for PhearJS

    var prerender = require('phearjs-express');
    app.use(prerender({phear_agent: 'MyVerySpecialPhearJSBot/0.1.2'}));

## Bugs / contribute

If something doesn't work as expected or breaks, please create an
[issue](https://github.com/Tomtomgo/phearjs-express/issues). When you feel like
fixing an issue or improving this middleware, feel free to open an issue and
create a pull request!

I've used the [JSCS](http://jscs.info/) linter, so for bonus points, lint :)