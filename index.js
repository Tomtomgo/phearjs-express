(function () {

    'use strict';

    var http = require('http');
    var url = require('url');

    function is_robot(user_agent) {
        // Check for the simple 'bot' string.
        return user_agent.toLowerCase().indexOf('bot') > -1;
    }

    function is_phear(user_agent, phear_agent_identifier) {
        // Check that the user agent is a PhearJS agent.
        if (phear_agent_identifier === undefined) {
            phear_agent_identifier = 'phear';
        }
        return user_agent.toLowerCase().indexOf(phear_agent_identifier) > -1;
    }

    function construct_url(options, req) {
        var phear_url;
        var requested_url;

        requested_url = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl,
        });

        if (options.phear_url !== undefined) {
            phear_url = url.parse(options.phear_url);
        } else {
            phear_url = url.parse('http://localhost:8100');
        }

        phear_url.query = {
            fetch_url: requested_url,
            raw: 1,
        };

        return url.format(phear_url);
    }

    function prefetch(options, req, res, next) {
        if (!is_robot(req.headers['user-agent']) ||
            is_phear(req.headers['user-agent'], options.phear_agent)) {
            // continue if this is not a robot
            next();
        } else {
            http.get(construct_url(options, req), function (inner_res) {
                var phear_response = '';

                inner_res.on('data', function (data) {
                    phear_response += data;
                });

                inner_res.on('end', function () {
                    res.write(phear_response);
                    res.end();
                });
            }).on('error', function () {
                // In case of an error we fall back to regular no prerendering behaviour
                next();
            });
        }
    }

    module.exports = function (options) {
        return prefetch.bind(null, options);
    };

})();
